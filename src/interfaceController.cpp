#include "AsyncJson.h"
#include "ArduinoJson.h"

#include "interfaceController.h"
#include "macroController.h"
#include "utils.h"
#include "html.h"

bool InterfaceController::setup()
{
  if (!PRODUCTION) {
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "*");
  }

  wm.setSaveConfigCallback([](void) {
    swSerial.println(PSTR("saving config & restart"));
    ESP.restart();
  });

  if (wm.autoConnect("Macropad")) {
    swSerial.println(PSTR("Connected! IP address: ") + WiFi.localIP().toString());
    if (MDNS.begin(PSTR("macropad"))) {
      swSerial.println(PSTR("MDNS responder started: http://macropad.local/"));
      MDNS.addService( "http", "tcp", 80 );
      if(LittleFS.begin()) {
        swSerial.println(PSTR("LittleFS mounted"));
        bindAll();
        server.begin();
        return true;
      } else {
        swSerial.println(PSTR("An Error has occurred while mounting LittleFS"));
      }
    } else {
      swSerial.println(PSTR("MDNS responder failed!"));
    }
  } else {
    swSerial.println(PSTR("Failed to connect to WiFi"));
  }
  return false;
}

void InterfaceController::update()
{
  MDNS.update();
  wm.loop();
}

void InterfaceController::bindAll()
{
  server.on(PSTR("/"), HTTP_GET, [](AsyncWebServerRequest *request) {
    AsyncWebServerResponse *response = request->beginResponse_P(200, PSTR("text/html"), html, html_len);
    response->addHeader(PSTR("Content-Encoding"), PSTR("gzip"));
    request->send(response);    
  });

  server.on(PSTR("/api/restart"), HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, PSTR("text/plain"), PSTR("Restart"));
    ESP.restart();
  });

  server.on(PSTR("/api/reset"), HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, PSTR("text/plain"), PSTR("Reset"));
    ESP.reset();
  });

  server.on(PSTR("/api/config"), HTTP_DELETE, [](AsyncWebServerRequest *request) {
    LittleFS.remove("/config.json");
    request->send(200, PSTR("text/plain"), PSTR("Deleted /config.json"));
  });

  server.on(PSTR("/api/config"), HTTP_GET, [](AsyncWebServerRequest *request) {
    File configFIle = LittleFS.open("/config.json", "r");
    if (configFIle) {
      request->send(200, PSTR("application/json"), configFIle.readString());
    } else {
      request->send(500, PSTR("text/plain"), PSTR("Failed to open config file"));
    }
  });

  AsyncCallbackJsonWebHandler* setConfigHandler = new AsyncCallbackJsonWebHandler("/api/config", [](AsyncWebServerRequest *request, JsonVariant &json) {
    if (request->contentLength() > 1024) {
      request->send(400, PSTR("text/plain"), PSTR("Config too large"));
      return;
    }
    File configFile = LittleFS.open("/config.json", "w");
    serializeJson(json, configFile);
    configFile.close();
    json.clear();
    macroController.loadConfig();
    request->send(200, PSTR("text/plain"), PSTR("OK"));
  });

  server.addHandler(setConfigHandler);
}

InterfaceController interfaceController;