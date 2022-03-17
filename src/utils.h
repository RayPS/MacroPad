#ifndef UTILS_H
#define UTILS_H

#include <SoftwareSerial.h>
#include <ArduinoJson.h>

#define SWS_TX 4

class utilsController
{
  private:
  public:
    void defineTokens();
    StaticJsonDocument<768> tokens;
};

extern utilsController utils;
extern SoftwareSerial swSerial;

#endif

