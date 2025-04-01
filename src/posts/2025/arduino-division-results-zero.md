---
title: Arduino Division Results in Zero
date: 2025-03-06
categories:
  - IoT
tags: post
timestamp: 2025-03-06T11:26:29.938Z
---

I'm doing some Arduino development for a friend, helping him build a throttle gauge for his race car. For this project I have a string of NeoPixels and I'm trying to figure out how many of them to illuminate based on the car's throttle position. Whenever I calculate the value, the result is always zero.  Here's the code:

```c
#define NUM_LEDS 7
const int divisor = 4095;   // for ESP32 devices
int numIlluminatedPixels;
int throttleValue;

numIlluminatedPixels = (throttleValue / divisor) * NUM_LEDS;
```

The result of `throttleValue / divisor` is always a fraction and multiplying that result by an integer results in a float. Assigning the result to an integer truncates the value into an Integer (`int`) which is exactly what I want.

Nope, every time I get a zero, even if I break it out into multiple calculations. 

The solution is that I have to force (cast) my division operands to `float` values, then it works perfectly.

```c
#define NUM_LEDS 7
const int divisor = 4095;   // for ESP32 devices
int throttleValue;
int numIlluminatedPixels;

numIlluminatedPixels = ((float)throttleValue / (float)divisor) * NUM_LEDS;
```
