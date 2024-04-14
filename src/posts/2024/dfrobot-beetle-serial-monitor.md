---
title: DFRobot Beetle Won't Write to Serial Monitor
date: 2024-04-14
categories:
  - IoT
tags: post
timestamp: 2024-04-14T12:57:53.707Z
---

I'm working on a project that uses the [Beetle ESP32 - C3 (RISC-V Core Development Board)](https://www.dfrobot.com/product-2566.html){target="_blank"} and I noticed in my testing that the device wasn't sending any output to the Arduino IDE Serial Monitor. 

I scratched my head for a while and couldn't figure it out. Right before I pulled out a different board I found a DFRobot Forum post [Beetle ESP32-C6 Serial Monitor not working](https://www.dfrobot.com/forum/topic/334036){target="_blank"} with the answer:

> And always set the USB CDC as Enable

I also found this requirement in the [wiki](https://wiki.dfrobot.com/SKU_DFR0868_Beetle_ESP32_C3){target="_blank"}. 

I had no idea what USB CDC was, so I had to [look it up](https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#:~:text=USB%20CDC%20On%20Boot,-The%20USB%20Communications&text=This%20option%20can%20be%20used%20to%20Enable%20or%20Disable%20this,port%20for%20flashing%20the%20device.){target="_blank"} but when I checked in the IDE, that setting was disabled. 

I enabled it, but then my Windows system started acting weird. I rebooted the system, fired up the IDE and everything worked as expected. Problem solved. 
