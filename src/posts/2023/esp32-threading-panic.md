---
title: ESP32 Threading Panic
date: 2023-08-12
categories:
  - IoT
tags: post
---

I built several projects on the ESP32 platform over the last few years; I recently published an update to my [Glowing Pumpkin](https://github.com/johnwargo/glowing-pumpkin-xiao-bff){target="_blank"} project. The project basically randomly flashes some LEDs with the intention that you put it inside a carved pumpkin and it does cool light effects inside the pumpkin. I wanted to build a version that used web application to control which color displays on the device so I set about learning how to run two processes on the processor, one that handles the LED stuff and the other that runs a web server accepting color requests from a remote device like a smartphone or tabled.

It's not supposed to be that hard to run multiple threads on an ESP32 device, but every time I tried to do it using sample projects I found on the Internet, the app crashes with an error similar to the following then reboots:

```text 
ESP-ROM:esp32s3-20210327
Build:Mar 27 2021
rst:0xc (RTC_SW_CPU_RST),boot:0x8 (SPI_FAST_FLASH_BOOT)
Saved PC:0x40376fa8
SPIWP:0xee
mode:DIO, clock div:1
load:0x3fce3808,len:0x44c
load:0x403c9700,len:0xbe4
load:0x403cc700,len:0x2a68
entry 0x403c98d4
Task1 running on core 0
Task2 running on core 1
Guru Meditation Error: Core  0 panic'ed (IllegalInstruction). Exception was unhandled.
Memory dump at 0x420022e0: fff2e507 0000f01d f7522100
Core  0 register dump:
PC      : 0x420022e4  PS      : 0x00060630  A0      : 0x00000000  A1      : 0x3fcf7490  
A2      : 0x000000ff  A3      : 0x00000000  A4      : 0x00000000  A5      : 0x00000000  
A6      : 0x00000000  A7      : 0x00000000  A8      : 0x82002320  A9      : 0x3fcf7460  
A10     : 0x3fc954a7  A11     : 0x00000019  A12     : 0x0000000a  A13     : 0x00000000  
A14     : 0x3fcec788  A15     : 0x80000001  SAR     : 0x00000020  EXCCAUSE: 0x00000000  
EXCVADDR: 0x00000000  LBEG    : 0x40056f08  LEND    : 0x40056f12  LCOUNT  : 0x00000000  


Backtrace: 0x420022e1:0x3fcf7490




ELF file SHA256: d34fd9b1c3edaeca

Rebooting...
```

I looked around and found some references to the error, but no clear information on how to resolve it. I kept trying, picking it up to try again every few weeks and finally figured it out today.

When you define the code that runs on a thread, it looks something like this:

```c
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  // Repeat the following infinitely
  // because that's how this threading thing works.
  for (;;) {
    //generate a random integer between 1 and 10
    if ((int)random(11) > 8) {
      // if it's a 9 or a 10, do that flicker thing
      flicker();
    } else {
      // Otherwise switch to the new color
      fadeColor(colors[(int)random(1, numColors + 1)]);
    }
  }
}
```

When the application registers the task using `xTaskCreatePinnedToCore`, the `Serial.print` lines execute, then the code runs an infinite loop to do whatever it needs to do on that separate thread. 

This isn't how you have to do it, you could fire up a thread as you need it then let it kill itself when its done, but for my purposes, I needed this thread to loop infinitely playing different colors on the NeoPixel array (or at least I needed it to do that until I could completely control the LEDs from the web server).

Anyway, when I wrote my code, I wasn't thinking about the code running infinitely, in my addled brain I assumed the thread would be triggered periodically (yeah, I know, stupid). The code I was trying to run looks like this:

```c
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  //generate a random integer between 1 and 10
  if ((int)random(11) > 8) {
    // if it's a 9 or a 10, do that flicker thing
    flicker();
  } else {
    // Otherwise switch to the new color
    fadeColor(colors[(int)random(1, numColors + 1)]);
  }
}
```

Basically, the code executes once then terminates and, I think, RTOS expects the thread to be cleaned up when its no longer needed. Since I didn't do that, the processor (or RTOS, I don't know) panicked and thrashed about until it rebooted. 

As soon as I added the infinite loop shown below it started working just fine.

```c
for (;;) {
  
}
```

Now that I've resolved this, I can start coding the web server and finish this version of the project.
