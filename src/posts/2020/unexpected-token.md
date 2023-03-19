---
tags: post
title: Unexpected token '='
categories: [Ionic Framework]
date: 2020-03-29
---

In a web app I've been working on, when I ran the application on an iOS device or Safari on macOS, A configuration panel built into the application didn't do anything when I tapped on the Gear icon to open it. When I looked at the console, I saw the following error:

```text
Expected an opening '(' before a method's parameter list
```

Looking around the Internet, I found the following article that explained the issue: [https://stackoverflow.com/questions/60026651/safari-unexpected-token-expected-an-opening-before-a-methods-paramet](https://stackoverflow.com/questions/60026651/safari-unexpected-token-expected-an-opening-before-a-methods-paramet){target="_blank"}.

My app had the following object defined:

```javascript
export class Config {

  this.ACCESS_TOKEN_KEY = 'accessToken';
  this.DEVICE_ID_KEY = 'deviceID';

  constructor() {
    // See if we can read the values from storage
    let lAccessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    let lDeviceID = localStorage.getItem(this.DEVICE_ID_KEY);
    this.accessToken = lAccessToken ? lAccessToken.trim() : '';
    this.deviceID = lDeviceID ? lDeviceID.trim() : '';
  }

  // a bunch of other stuff here

}
```

It's a web app that talks to a [Particle Photon](https://particle.io){target="_blank"} project, so I need the Particle Access Token plus the device ID for the Photon device the app talks to. Apparently you can't define constants in a JavaScript class on Safari - who knew.

Anyway, the fix was to update the code as shown below and everything seems to work.

```javascript
export class Config {
  
  constructor() {
    // See if we can read the values from storage
    let lAccessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    let lDeviceID = localStorage.getItem(this.DEVICE_ID_KEY);
    this.accessToken = lAccessToken ? lAccessToken.trim() : '';
    this.deviceID = lDeviceID ? lDeviceID.trim() : '';

    // Define my config keys here
    this.ACCESS_TOKEN_KEY = 'accessToken';
    this.DEVICE_ID_KEY = 'deviceID';

  }

  // a bunch of other stuff here

}
```
