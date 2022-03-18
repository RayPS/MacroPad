#include "utils.h"
#include "macroController.h"

void MacroController::setup ()
{
  for (size_t i = 0; i < KEY_COUNT; i++) {
    if (!PRODUCTION && pins[i] == SWS_TX) continue;
    throttles[i].attach(pins[i], INPUT_PULLUP);
  }
  loadConfig();

  Serial.end();
  Keyboard.begin(&Serial, CH9328_RST, 9600);
  Keyboard.releaseAll();

  utils.defineTokens();
}

void MacroController::loadConfig ()
{
  swSerial.println(F("Loading /config.json..."));
  File configFile = LittleFS.open("/config.json", "r");
  config.clear();
  DeserializationError error = deserializeJson(config, configFile);
  configFile.close();
  config.garbageCollect();
  if (error) {
    swSerial.print(F("deserializeJson() failed, reason: "));
    swSerial.println(error.f_str());
    return;
  }
  if (config.overflowed()) {
    swSerial.println(PSTR("Config too large, overflowed"));
    return;
  }
  swSerial.println(PSTR("deserializeJson() Success:"));
  swSerial.println(PSTR("Config has been updated: "));
  swSerial.println("");
  swSerial.println(PSTR("Free block size: "));
  swSerial.println(ESP.getMaxFreeBlockSize());
  swSerial.println("");
  serializeJsonPretty(config, swSerial);
}

void MacroController::update ()
{
  for (size_t i = 0; i < KEY_COUNT; i++) {
    if (!PRODUCTION && pins[i] == SWS_TX) continue;
    throttles[i].update();
    if (throttles[i].fell()) {
      if (config.size() != 0) {
        JsonArrayConst macro = config["macros"].getElement(i);
        if (!macro.isNull()) {
          swSerial.println("Key " + (String) i + " fell with macro:");
          serializeJsonPretty(macro, swSerial);
          swSerial.println("");
          runMacro(macro);
        } else {
          swSerial.println("Key " + (String) i + " fell but config failed to load");
          swSerial.println(F("config: "));
          serializeJsonPretty(config, swSerial);
          swSerial.println("");
          swSerial.println(F("config[macros]: "));
          serializeJsonPretty(config["macros"], swSerial);
          swSerial.println("");
        }
      } else {
        swSerial.println("Key " + (String) i + " fell wihout config");
      }
    }
  }
}

int MacroController::parseShortcut (char shortcut[], int result[MACRO_KEY_COUNT_MAX])
{
  char *token;
  const char *delimiter = " ";
  int count = -1;

  token = strtok(shortcut, delimiter);

  while (token != NULL) {
    String tokenString = token;
    tokenString.trim();
    tokenString.toUpperCase();
    if (count > -1) { // Skip '@'
      if (utils.tokens.containsKey(tokenString)) {
        result[count] = utils.tokens[tokenString].as<int>();
      } else {
        result[count] = tolower(token[0]);
      }
    }
    token = strtok(NULL, delimiter);
    count++;
  }
  
  return count;
}

void MacroController::sendShortcut (int keys[MACRO_KEY_COUNT_MAX], int keyCount, bool press)
{
  for (int i = 0; i < keyCount; i++) {
    if (press) {
      swSerial.print("press key: ");
      swSerial.println(String(keys[i]));
      Keyboard.press(keys[i]);
    } else {
      swSerial.print("release key: ");
      swSerial.println(String(keys[i]));
      Keyboard.release(keys[i]);
    }
  }
}

void MacroController::runMacro (JsonArrayConst macro)
{
  for (String line : macro) {
    line.trim();
    if (line.length() == 0) continue;

    char lineBuf[MACRO_LINE_MAX];
    line.toCharArray(lineBuf, MACRO_LINE_MAX);

    switch (lineBuf[0])
    {
    case '#': // Comment
      swSerial.println(PSTR("\nComment, skipped"));
      break;
    case '@': // Shortcut
      {
        swSerial.println(PSTR("\nShortcut"));
        int keys[MACRO_KEY_COUNT_MAX];
        int keyCount = parseShortcut(lineBuf, keys);
        sendShortcut(keys, keyCount, true);
        sendShortcut(keys, keyCount, false);
      }
      break;
    case '$': // String
      swSerial.println(PSTR("\nString"));
      line.remove(0, 2);
      Keyboard.print(line);
      break;
    case '+': // Press
      {
        swSerial.println(PSTR("\nPress"));
        int keys[MACRO_KEY_COUNT_MAX];
        int keyCount = parseShortcut(lineBuf, keys);
        sendShortcut(keys, keyCount, true);
      }
      break;
    case '-': // Release
      {
        swSerial.println(PSTR("\nRelease"));
        int keys[MACRO_KEY_COUNT_MAX];
        int keyCount = parseShortcut(lineBuf, keys);
        sendShortcut(keys, keyCount, false);
      }
      break;
    case '.': // Release All
      swSerial.println(PSTR("\nRelease All"));
      Keyboard.releaseAll();
      break;
    case '~': // Set interval ms
      swSerial.println(PSTR("\nSet interval ms"));
      break;
    case '!': // Wait ms
      swSerial.println(PSTR("\nWait ms"));
      swSerial.println(atoi(lineBuf + 1));
      delay(atoi(lineBuf + 1));
      break;
    default:
      swSerial.println(PSTR("\nUnknown command"));
      break;
    }
  }
}

MacroController macroController;