---
title: ESP32 Task Watchdog Got Triggered
date: 2023-08-15
categories:
  - IoT
tags: post
---

After sorting out how to deploy code to an ESP32 device that runs different code on each processor core, I set about building out my application. As soon as I added my project's code to one of the cores, the device started rebooting again when it ran the code and generated the following error message:

```shell
WiFi connected.
IP address: 
192.168.86.220
Task0 running on core 0
Task1 running on core 1
E (23337) task_wdt: Task watchdog got triggered. The following tasks did not reset the watchdog in time:
E (23337) task_wdt:  - IDLE (CPU 0)
E (23337) task_wdt: Tasks currently running:
E (23337) task_wdt: CPU 0: Task0
E (23337) task_wdt: CPU 1: loopTask
E (23337) task_wdt: Aborting.

abort() was called at PC 0x4200b730 on core 0

Backtrace: 0x403774d2:0x3fc95910 0x4037cd09:0x3fc95930 0x40382a5d:0x3fc95950 0x4200b730:0x3fc959d0 0x403789c9:0x3fc959f0 0x400559dd:0x3fca8070 |<-CORRUPTED

ELF file SHA256: cbe304622d553d8e

Rebooting...
```

At least this time it's clearer that a specific error ocurred: `Task watchdog got triggered. The following tasks did not reset the watchdog in time`. I did a quick search and found the core of the problem. Here's my code that's failing:


```c
/*********************************************************
* Core 1
* 
* This is the code that interacts with the LED array, 
* looping infinitely doing the random color thing 
* if enabled.
**********************************************************/
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  // Repeat the following infinitely
  for (;;) {
    if (doRandom) {
      fadeColor(colors[(int)random(1, numColors + 1)]);
    } 
  }
}
```

Its a really tight loop and for some of the time it does absolutely nothing. Apparently there's a housekeeping task in the ESP32 RTOS (realtime operating system) that needs some time to do some housekeeping and my tight loop kept it from doing so. 

What I need is for the code to give housekeeping tasks some time every loop, so what I did was add a short delay (25ms) at the end of the loop and the error went away. Here's the updated code (with a link to the article where I found the error):

```c
/*********************************************************
* Core 1
* 
* This is the code that interacts with the LED array, 
* looping infinitely doing the random color thing 
* if enabled.
**********************************************************/
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  // Repeat the following infinitely
  for (;;) {
    if (doRandom) {
      fadeColor(colors[(int)random(1, numColors + 1)]);
    }
    // Add a small delay to let the watchdog process
    //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
    delay(25);
  }
}
```
