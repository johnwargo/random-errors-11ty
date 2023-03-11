---
tags: post
title: Ionic HTTP Failure Unknown Error
categories: [Ionic Framework]
date: 2020-04-27
---

I'm working on a simple Ionic app I built as an example to publish publicly; it's a simple weather app that uses the OpenWeather API to display current conditions and forecast. The app runs great in the browser, but when you execute it on an Android Device, when the app connects to the Weather API, it immediately returns the following error:

```text
Http failure response for http://api.openweathermap.org/data/2.5/weather?lat=35.1607883&lon=-80.8581167&units=imperial&APPID=MYAPPID: 0 Unknown Error
```

I scratched my head for longer than I care to admit, but then recognized the problem. In my app's config file, I had the Weather API endpoint configured using HTTP. As soon as I switched it to HTTPS, the error went away and the app started working fabulously.

Apparently Android no longer likes non-secure endpoints for HTTP calls.

Just in case you're wondering, because I struggled to find concise examples of how to do an HTTP GET in an Ionic 4 app, here's the code that's making the call:

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getCurrent(loc: LocationConfig): Promise<any> {
    console.log('WeatherService: getCurrent()');
    const url: string = this.makeWeatherURL(loc, 'weather');
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, error => {
        console.error(error.message);
        reject(error.message);
      });
    });
  }
```
