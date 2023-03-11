---
tags: post
title: ESP32 Electron and CORS errors
categories: [IoT]
date: 2020-09-25
---

I'm working on a project that uses an ESP32 device with an Ionic Capacitor Electron app. The ESP32 device runs a web server the Electron app talks to and with the latest version of Capacitor Electron, when the app makes an API call to the ESP32 device, it completes successfully, but Electron fires the following error:

```text
blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
```

My ESP32 app uses the [ESP32 HTTPS Server](https://github.com/fhessel/esp32_https_server), and the fix for this is pretty simple. In the code that processes the API request, simply add the `Access-Control-Allow-Origin` header to the response and the error goes away.

```cpp
res->setHeader("Access-Control-Allow-Origin", "*");
```

That was easy, right?

For this app, both the ESP32 device and Electron app are expected to be on the same network, and the app uses a TLS (SSL) connection to the ESP32 device, so I'm not worried about any bad actors in my connection chain.
