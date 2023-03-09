---
tag: post
title: Flutter Connectivity Android Null Results
categories: [Flutter Development]
date: 2020-06-17
---

While building a Flutter application that needed to access information about the system's Wi-Fi network, I encountered the [connectivity](https://pub.dev/packages/connectivity) package. It looked like what I needed, and I quickly added it to my app. In testing with my application, I had connectivity working correctly, but then suddenly it stopped working. I noticed this when I switched from testing on an Android device Emulator; the app would 'run' but returned `null` for Wi-Fi network name and BSSID.

I had no idea what I did to the app, but I knew it was working and that suddenly it wasn't. I looked carefully at the app source and compared it to the example code on the package's landing page, but made no progress. I noticed that when testing it on a device, that a permissions dialog popped up asking me to approve permission for location settings (the ability to tell where an Android device is tied to Wi-Fi settings for security purposes - who knew?), but the dialog would close before I could do anything, then the app crashed. That led me to think I had a permissions issue.

I knew there were permission settings I needed, but the package landing page and documentation made no reference to them. I headed over to Stack Overflow and created an [issue](https://stackoverflow.com/questions/62378654/flutter-connectivity-package-android-permissions). While I waited for a response there, I poked around on the Internet until I found an [issue in the Flutter repo](https://github.com/flutter/flutter/issues/51529) that seemed to describe my issue. Looking deeper, it was a permissions issue and the solution was there in the comments.

Flutter doesn't seem to have a way to query an app user for permissions, so someone created the Flutter [permissions_handler](https://pub.dev/packages/permission_handler) package. Adding that to my app, and a variant of the code shown in the original issue, solved my issue.

I quickly realized that the answer on the Flutter repo was incomplete and anyone trying to implement this solution would need some help. To make it easier for these developers, I created a complete sample application you can use to see the complete solution: [Flutter Connectivity Package Android Permissions](https://github.com/johnwargo/flutter-android-connectivity-permissions). Use [Issues](https://github.com/johnwargo/flutter-android-connectivity-permissions/issues) there if you have any questions, I'll try to answer.
