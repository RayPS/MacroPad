#ifndef INTERFACECONTROLLER_H
#define INTERFACECONTROLLER_H

#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ESP8266mDNS.h>
#include <ESPAsyncWiFiManager.h> 
#include <LittleFS.h>

class InterfaceController
{

private:    
    AsyncWebServer server = AsyncWebServer(80);
    DNSServer dns = DNSServer();
    AsyncWiFiManager wm = AsyncWiFiManager(&server, &dns);
    void bindAll();

public:
    bool setup();
    void update();
};

extern InterfaceController interfaceController;

#endif
