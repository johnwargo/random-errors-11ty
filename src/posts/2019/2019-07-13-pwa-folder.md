---
layout: post
title:  "Install PWA from Folder"
description: How to build a webmanifest file for a PWA served from a folder
date:   2019-06-29 08:40:00 -0400
tags: 
categories: [Web Development]
comments: true
---

I'm working on a project which includes a web app with a service worker and a webmanifest file (a progressive Web App (PWA)). For this particular app, I wanted the app hosted from a subfolder on a public domain I have running. By tweaking the `scope` and `start_url` properties in the project's `.webmanifest` file, I was in some cases not able to install it and, in other cases, could install it, but the app wouldn't open to the right page when I double-clicked the installed app icon.

Some of the error messages I encountered were:

> property 'scope' ignored. Start url should be within scope of scope URL.

and

> No matching service worker detected. You may need to reload the page, or check that the service worker for the current page also controls...'

It took me a while, but I finally figured it out. In the W3C [Web App Manifest](https://www.w3.org/TR/appmanifest/#navigation-scope) specification, I found the following:

> If the scope member is not present in the manifest, it defaults to the parent path of the start_url member. For example, if `start_url` is `/pages/welcome.html`, and `scope` is missing, the navigation scope will be `/pages/` on the same origin. If `start_url` is `/pages/` (the trailing slash is important!), the navigation scope will be `/pages/`.

> Developers should take care, if they rely on the default behavior, that all of the application's page URLs begin with the parent path of the start URL. To be safe, explicitly specify scope.

So, with that in mind, I made some adjustments. With the app hosted at the root of the domain, I used the following settings in my project's web app manifest file:

{% highlight json %}
 "start_url": "/index.html?utm_source=homescreen",
{% endhighlight %}

I had to specify the `index.html` file in the `start_url` property, the installed app wouldn't launch correctly until I did this.

When hosting the PWA in a folder on my server, I did the following:

{% highlight json %}
  "start_url": "/myapp/index.html?utm_source=homescreen",
  "scope": "/myapp/",
{% endhighlight %}

With that in place, it works great; you can see the final version on the (currently incomplete) [PWA Learn](https://pwalearn.com/tipcalc/) web site.

Google's [Web Manifest documentation](https://developers.google.com/web/fundamentals/web-app-manifest/) has this type of configuration in its sample manifest file.
