---
layout: post
title:  "Installation failed with message Invalid File"
description: Describes an error I encountered when installing an Ionic 4 application on an Android device.
date: 2019-06-29 08:40:00 -0400
tags: 
categories: [Ionic Framework]
comments: true
---

Occasionally, when launching an Ionic 4 Capacitor application on an Android device, Android Studio gives me the following error:

{% highlight text %}
Installation failed with message Invalid File: D:\dev\projects\myapp\android\app\build\intermediates\split-apk\debug\slices\slice_9.apk.
It is possible that this issue is resolved by uninstalling an existing version of the apk if it is present, and then re-installing.

WARNING: Uninstalling will remove the application data!

Do you want to uninstall the existing application?
{% endhighlight %}

When you tap the **OK** button that comes with the message, Android will uninstall the app, but subsequent launches still won't install the app on the device. I don't remember what I did to fix this the first time, but when it happened to me this afternoon, I rebooted the device and **Cleaned** the project in Android Studio (by opening the **Build** menu in Android Studio, and selecting **Clean Project**) then ran the app again targeting the device and it installed correctly.

I don't know what causes this, as the error message doesn't say much, but at least it's easy to get up and running again.
