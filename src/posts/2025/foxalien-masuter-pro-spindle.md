---
title: FoxAlien Masuter Pro Spindle Does Not Work
date: 2025-05-11
categories: 
  - Hardware
tags: post
timestamp: 2025-05-11T20:56:31.214Z
---

Recently, I purchased a [FoxAlien Masuter Pro](https://www.foxalien.com/collections/masuter-series){target="_blank"} CNC Router for my workshop. I assembled all the parts and started testing the unit. Everything seemed to work, except for the spindle. I couldn't get the included software to turn the spindle on. 

I pulled it out of the unit and applied 5V DC to it and the spindle motor worked just fine.

Next, I checked continuity on the two spindle wires on the CNC Router; all good. 

There's a switch on the Controller and the instructions tell you to move the switch to the right as shown in the figure below.

{% image "src/images/2025/foxalien-masuter-pro-manual.jpg", "FoxAlien Masuter Pro Manual", "image-full" %}

Well, it turns out there's an error in the FoxAlien Masuter Manual. The switch must be set to the left. As soon as I made that change, the spindle started turning on and off as expected.

Sadly, the post I found that explained the error was in 2024, so apparently FoxAlien isn't paying attention. They should have fixed the manual or at least published an addendum pointing out the error.
