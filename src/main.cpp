#include <Arduino.h>

#include "utils.h"
#include "interfaceController.h"
#include "macroController.h"

void setup() {
  if (!PRODUCTION) {
    swSerial.begin(115200, SWSERIAL_8N1, -1, SWS_TX, false, 256);
    swSerial.enableIntTx(false);
    delay(50);
    swSerial.print(PSTR("\n-------- SoftwareSerial Initialized --------\n"));    
  }

  if (interfaceController.setup()) {
    macroController.setup();
    swSerial.println(PSTR("\nFinished Setup\n"));
  } else {
    swSerial.println(PSTR("\nFailed to begin\n"));
  }
}

void loop() {
  // ESP.wdtDisable(); // Fix for IO9, try remove this after finish
  interfaceController.update();
  macroController.update();
}