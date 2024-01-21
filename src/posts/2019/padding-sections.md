---
title: Too many padding sections on bottom border
date: 2019-06-04
categories: [Android Development]
tags: post
---

While learning how to create 9-patch files for an Ionic app in Android Studio using [Creating a Dynamic/Adaptable Splash Screen for Capacitor (Android)](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/){target="_blank"}, I finished my work and kicked off a build to run the app in an emulator. During the build process, I encountered the following error:

``` text
Android resource compilation failed
error: too many padding sections on bottom border.
D:\dev\projects\path-to-project\android\app\src\main\res\drawable-xxhdpi\splash.9.png: error: file failed to compile.
```

When I looked at the file in Android Studio, everything looked exactly as expected:

{% image "src/images/9-patch.png", "Android Studio 9-patch editor", "image-full" %}

But when I opened the file in an image viewer, I noticed that during my fumbling around, I created extra 9-patch highlights (the 1-pixel black lines) in other parts of the 9-patch  file (right and bottom) that were causing the compiler issues. I deleted the file and recreated it and everything worked fine.

Apparently Android Studio has issues rendering 9-patch files correctly.
