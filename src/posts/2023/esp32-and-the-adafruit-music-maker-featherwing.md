---
title: ESP32 and the Adafruit Music Maker FeatherWing
date: 2023-10-21
categories:
  - IoT
  - ESP32
tags: post
---

I added the Music Maker FeatherWing to a ESP32 Feather V2 device and I’m following the instructions in the tutorial to run the feather_player sample sketch. I put some music files on the memory card, inserted it in the memory card holder then changed the file names in the sketch so it plays the sound files I have on the memory card. 

When I run the sketch, it displays the memory card file list as expected, loads the first sound file (snore01.mp3 in this case), then immediately panics as shown below:

```text
Adafruit VS1053 Feather Test
VS1053 found
SD OK!
System Volume Information/
	WPSettings.dat		12
	IndexerVolumeGuid		76
snore01.mp3		1507644
snore02.mp3		363420
snore03.mp3		197424
snore04.mp3		711072
roar01.mp3		253800
roar02.mp3		245448
roar03.mp3		244404
Playing Snore Track 1
Guru Meditation Error: Core  1 panic'ed (Unhandled debug exception). 
Debug exception reason: Stack canary watchpoint triggered (loopTask) 
Core  1 register dump:
PC      : 0x40085a1b  PS      : 0x00050036  A0      : 0x3ffb03dc  A1      : 0x3ffb031c  
A2      : 0x00000029  A3      : 0x3ffbe128  A4      : 0x40085a83  A5      : 0xc0000000  
A6      : 0x3ffb03dc  A7      : 0x00000000  A8      : 0x00000001  A9      : 0x40085a37  
A10     : 0x3ffc1de8  A11     : 0x3ffbdc1c  A12     : 0x00000001  A13     : 0x3ffbe08c  
A14     : 0x3ffc20c4  A15     : 0x3ffbdf70  SAR     : 0x00000011  EXCCAUSE: 0x00000001  
EXCVADDR: 0x80081448  LBEG    : 0x40088825  LEND    : 0x40088835  LCOUNT  : 0xffffffff  
```

I searched the Internet and found a lot of forum posts referring to this error message, but nothing really conclusive for my use case. I just spent a lot of time working out how to run tasks on separate processor cores on the ESP32, so I’m pretty familiar with many of the posted issues, but in this case, I’m simply running the sample program from Adafruit specifically designed for this hardware.

Now, with that in mind, I went back to the tutorial and noticed something I missed:

> `Interrupt based playback currently does not work on ESP32 platforms`

So apparently this board doesn’t work with ESP32 using interrupts, but there’s no information in the tutorial that tells me what this means. I took a look at the library source and API docs and I don’t see anything there that tells me how to play sounds through this board on an ESP32 without using interrupts. After perusing the Adafruit Forums, I finally found the solution to my problem in [ESP32 Feather V2 with Music Maker FeatherWing](https://forums.adafruit.com/viewtopic.php?p=949364&sid=f94be453911b5999954fb2cfb572ffd2#p949364){target="_blank"}:

>The VS1053 has an output pin that it sets high when its input buffer starts to run low.
>The VS1053 library has a function named `.feed_buffer()` that checks the pin and sends the VS1053 more data if necessary.
>There are two ways `.feed_buffer()` can be executed: one is to use an interrupt handler that automatically trips when the 'need more data' pin goes high. The other is to call it manually at regular intervals.
>It sounds like your sketch was trying to use an interrupt but having problems. Disabling the interrupt switched over to calling the function directly, which works better for devices like the ESP32.

Since there's no example of this anywhere, here's a [Gist](https://gist.github.com/johnwargo/d1faa619fc0b008837bafaabe8581e84){target="_blank"} that solves it and the full source as well:

```c
// Specifically for use with the Adafruit Feather, the pins are pre-set here!

// include SPI, MP3 and SD libraries
#include <SPI.h>
#include <SD.h>
#include <Adafruit_VS1053.h>

// These are the pins used
#define VS1053_RESET -1  // VS1053 reset pin (not used!)

// Feather ESP8266
#if defined(ESP8266)
#define VS1053_CS 16   // VS1053 chip select pin (output)
#define VS1053_DCS 15  // VS1053 Data/command select pin (output)
#define CARDCS 2       // Card chip select pin
#define VS1053_DREQ 0  // VS1053 Data request, ideally an Interrupt pin

// Feather ESP32
#elif defined(ESP32) && !defined(ARDUINO_ADAFRUIT_FEATHER_ESP32S2)
#define VS1053_CS 32    // VS1053 chip select pin (output)
#define VS1053_DCS 33   // VS1053 Data/command select pin (output)
#define CARDCS 14       // Card chip select pin
#define VS1053_DREQ 15  // VS1053 Data request, ideally an Interrupt pin

// Feather Teensy3
#elif defined(TEENSYDUINO)
#define VS1053_CS 3    // VS1053 chip select pin (output)
#define VS1053_DCS 10  // VS1053 Data/command select pin (output)
#define CARDCS 8       // Card chip select pin
#define VS1053_DREQ 4  // VS1053 Data request, ideally an Interrupt pin

// WICED feather
#elif defined(ARDUINO_STM32_FEATHER)
#define VS1053_CS PC7     // VS1053 chip select pin (output)
#define VS1053_DCS PB4    // VS1053 Data/command select pin (output)
#define CARDCS PC5        // Card chip select pin
#define VS1053_DREQ PA15  // VS1053 Data request, ideally an Interrupt pin

#elif defined(ARDUINO_NRF52832_FEATHER)
#define VS1053_CS 30    // VS1053 chip select pin (output)
#define VS1053_DCS 11   // VS1053 Data/command select pin (output)
#define CARDCS 27       // Card chip select pin
#define VS1053_DREQ 31  // VS1053 Data request, ideally an Interrupt pin

// Feather RP2040
#elif defined(ARDUINO_ADAFRUIT_FEATHER_RP2040)
#define VS1053_CS 8    // VS1053 chip select pin (output)
#define VS1053_DCS 10  // VS1053 Data/command select pin (output)
#define CARDCS 7       // Card chip select pin
#define VS1053_DREQ 9  // VS1053 Data request, ideally an Interrupt pin

// Feather M4, M0, 328, ESP32S2, nRF52840 or 32u4
#else
#define VS1053_CS 6    // VS1053 chip select pin (output)
#define VS1053_DCS 10  // VS1053 Data/command select pin (output)
#define CARDCS 5       // Card chip select pin
// DREQ should be an Int pin *if possible* (not possible on 32u4)
#define VS1053_DREQ 9  // VS1053 Data request, ideally an Interrupt pin
#endif

int counter = 0;

Adafruit_VS1053_FilePlayer musicPlayer =
  Adafruit_VS1053_FilePlayer(VS1053_RESET, VS1053_CS, VS1053_DCS, VS1053_DREQ, CARDCS);

void setup() {
  Serial.begin(115200);

  // if you're using Bluefruit or LoRa/RFM Feather, disable the radio module
  //pinMode(8, INPUT_PULLUP);

  // Wait for serial port to be opened, remove this line for 'standalone' operation
  while (!Serial) { delay(1); }
  delay(500);
  Serial.println("\n\nAdafruit VS1053 Feather Test");

  if (!musicPlayer.begin()) {  // initialise the music player
    Serial.println(F("Couldn't find VS1053, do you have the right pins defined?"));
    while (1)
      ;
  }

  Serial.println(F("VS1053 found"));

  musicPlayer.sineTest(0x44, 500);  // Make a tone to indicate VS1053 is working

  if (!SD.begin(CARDCS)) {
    Serial.println(F("SD failed, or not present"));
    while (1)
      ;  // don't do anything more
  }
  Serial.println("SD OK!");

  // list files
  printDirectory(SD.open("/"), 0);

  // Set volume for left, right channels. lower numbers == louder volume!
  musicPlayer.setVolume(10, 10);

  // REMOVE THIS BECAUSE THIS ENABLES INTERRUPTS
  // #if defined(__AVR_ATmega32U4__)
  //   // Timer interrupts are not suggested, better to use DREQ interrupt!
  //   // but we don't have them on the 32u4 feather...
  //   musicPlayer.useInterrupt(VS1053_FILEPLAYER_TIMER0_INT); // timer int
  // #else
  //   // If DREQ is on an interrupt pin we can do background
  //   // audio playing
  //   musicPlayer.useInterrupt(VS1053_FILEPLAYER_PIN_INT);  // DREQ int
  // #endif

  // Play a file in the background, REQUIRES interrupts!
  // Serial.println(F("Playing full track 001"));
  // musicPlayer.playFullFile("/snore01.mp3");

  // Serial.println(F("Playing track 002"));
  // musicPlayer.startPlayingFile("/roar01.mp3");
}

void loop() {

  // Are we playing a sound file?
  if (musicPlayer.stopped()) {
    // No, then start a sound file
    Serial.println("\nStarting sound file");
    // =========================================
    // we can't play the file this way because it uses interrupts:
    // musicPlayer.playFullFile("/snore01.mp3");
    // =========================================
    // With this approach, it *starts* playing it only,
    // Then you use feedBuffer (below) to feed more sound
    // file data into the player.
    musicPlayer.startPlayingFile("/snore01.mp3");
  }

  // https://forums.adafruit.com/viewtopic.php?p=953823&hilit=music+maker+esp32#p953823
  musicPlayer.feedBuffer();

    // print a dot so we can tell the loop is executing
  Serial.print(".");
  // put a blank line every 25 periods
  counter += 1;
  if (counter > 25) {
    counter = 0;
    Serial.println();
  }

  delay(100);
}

/// File listing helper
void printDirectory(File dir, int numTabs) {
  while (true) {

    File entry = dir.openNextFile();
    if (!entry) {
      break;
    }
    for (uint8_t i = 0; i < numTabs; i++) {
      Serial.print('\t');
    }
    Serial.print(entry.name());
    if (entry.isDirectory()) {
      Serial.println("/");
      printDirectory(entry, numTabs + 1);
    } else {
      // files have sizes, directories do not
      Serial.print("\t\t");
      Serial.println(entry.size(), DEC);
    }
    entry.close();
  }
}
```
