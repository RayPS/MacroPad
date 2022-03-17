#ifndef MACROCONTROLLER_H
#define MACROCONTROLLER_H

#include <Arduino.h>
#include <Throttle.h>
#include <ArduinoJson.h>
#include <LittleFS.h>
#include <CH9328Keyboard.h>
#include <StringSplitter.h>

#define CH9328_RST 15

/*              ┌─────────────┐
               RST            1
               ADC0           3 ◄ rx
               EN             5
    external ► 16 (wake)      4
    pull_up    14             0 ◄ flash
               12             2 ◄ led
               13            15
               VCC           GND
                └─1-7-9-1-8-6─┘
                  1   ▲ 0
                      └having issue with wdt */

#define KEY_COUNT 10
#define MACRO_LINE_MAX 32
#define MACRO_KEY_COUNT_MAX 6

class MacroController
{
  private:
    int pins[KEY_COUNT] = {   /* 9, */
      13,  10,  0,   5,   3,
      16,  14,  12,  2,   4
    };
    Throttle throttles[KEY_COUNT];
    void runMacro(JsonArrayConst macro);
    int parseShortcut(String shortcut, int result[MACRO_KEY_COUNT_MAX]);
    void sendShortcut(int keys[MACRO_KEY_COUNT_MAX], int keyCount, bool press);

  public:
    StaticJsonDocument<1024> config;
    void setup();
    void loadConfig();
    void update();
};

extern MacroController macroController;

#endif
