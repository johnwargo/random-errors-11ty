---
tags: post
title: Adafruit Feather Huzzah32 with the ePaper FeatherWing
categories: [IoT]
date: 2021-08-07
---

I'm a huge fan of [Adafruit's](https://www.adafruit.com/) projects, especially the Feather series of microcontrollers and associated FeatherWings (add-on boards). The format is so popular that [Particle](https://www.particle.io/) (another one of my favorite hardware companies) even adopted the footprint for their latest hardware.

Lately, I've been working on a refresh of a Word Clock project I found in Make Magazine a long time ago. I've rebuilt the project for the [Feather Huzzah32](https://www.adafruit.com/product/3405) board (the original project used the Adafruit Trinket board) and I'm also making a wall mounted version of the project as well.

One of the things I want to do with the wall-mounted version is mount a little ePaper display on the side of the clock so I check the device's network connection and the last time it retrieved the current date/time from the Internet. To do this, I added the [Adafruit 2.13" Monochrome eInk / ePaper Display FeatherWing - 250x122 Monochrome with SSD1680](https://www.adafruit.com/product/4195) and I poked and prodded through the documentation to try to figure out how to use it.

My first few attempts failed miserably. According to the [ePaper Display FeatherWing Documentation](https://www.adafruit.com/product/4195): “This 'Wing is tested to work with all of our Feathers.”  OK, that is reassuring, but I wanted details.

Next, I dug through all of the relevant documentation for their ePaper displays and according to their [Adafruit eInk Display Breakouts and FeatherWings](https://learn.adafruit.com/adafruit-eink-display-breakouts/arduino-code) documentation: “If you're using a FeatherWing, try File → Examples → Adafruit_EPD → FeatherWingTest” (as shown in the following figure).

![Arduino EPD Examples]({{site.baseurl}}/assets/arduino-ide-examples-adafruit-epd.png)

Unfortunately, the configuration of the sample sketch varies depending on what hardware device you're using (sigh). I poked and prodded at the documentation again trying to figure out how to configure the sketch and failed miserably.

Finally after creating two separate Adafruit Forum tickets ([#1](https://forums.adafruit.com/viewtopic.php?f=57&t=181830&p=884590#p884590) and [#2](https://forums.adafruit.com/viewtopic.php?f=57&t=182024))and sending an email to the support email address, I finally got an answer.

Since the display is a monochrome display, you have to use the `ThinkInk_mono` sketch instead of EPDtest, and the sketch's configuration looks like this:

```text
#define EPD_CS      15
#define EPD_DC      33
#define SRAM_CS     32
#define EPD_RESET   -1 
#define EPD_BUSY    -1 
```
