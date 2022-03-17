#include "utils.h"

void utilsController::defineTokens ()
{
  tokens["CTRL"] =      0x80;
  tokens["SHIFT"] =       0x81;
  tokens["ALT"] =       0x82;
  tokens["WIN"] =       0x83;
  tokens["CMD"] =       0x83; // alias

  tokens["RCTRL"] =       0x84;
  tokens["RSHIFT"] =      0x85;
  tokens["RALT"] =      0x86;
  tokens["RWIN"] =      0x87;
  tokens["RCMD"] =      0x87; // alias

  tokens["UP"] =    0xDA;
  tokens["DOWN"] =  0xD9;
  tokens["LEFT"] =  0xD8;
  tokens["RIGHT"] = 0xD7;

  tokens["BACKSPACE"] = 0xB2;
  tokens["TAB"] =       0xB3;
  tokens["RETURN"] =    0xB0;
  tokens["ENTER"] =     0xB0; // alias
  tokens["ESC"] =       0xB1;
  tokens["INSERT"] =    0xD1;
  tokens["DELETE"] =    0xD4;
  tokens["PAGEUP"] =    0xD3;
  tokens["PAGEDOWN"] =  0xD6;
  tokens["HOME"] =      0xD2;
  tokens["END"] =       0xD5;
  tokens["CAPSLOCK"] =  0xC1;

  tokens["F1"] =  0xC2;
  tokens["F2"] =  0xC3;
  tokens["F3"] =  0xC4;
  tokens["F4"] =  0xC5;
  tokens["F5"] =  0xC6;
  tokens["F6"] =  0xC7;
  tokens["F7"] =  0xC8;
  tokens["F8"] =  0xC9;
  tokens["F9"] =  0xCA;
  tokens["F10"] = 0xCB;
  tokens["F11"] = 0xCC;
  tokens["F12"] = 0xCD;
  tokens["F13"] = 0xF0;
  tokens["F14"] = 0xF1;
  tokens["F15"] = 0xF2;
  tokens["F16"] = 0xF3;
  tokens["F17"] = 0xF4;
  tokens["F18"] = 0xF5;
  tokens["F19"] = 0xF6;
  tokens["F20"] = 0xF7;
  tokens["F21"] = 0xF8;
  tokens["F22"] = 0xF9;
  tokens["F23"] = 0xFA;
  tokens["F24"] = 0xFB; 
}

utilsController utils;
SoftwareSerial swSerial;