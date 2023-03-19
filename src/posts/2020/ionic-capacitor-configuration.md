---
tags: post
title: Ionic Capacitor Electron Window Configuration
categories: [Ionic Framework]
date: 2020-09-24
---

I'm working on a new app for desktop PCs; since I want to deploy to Windows and macOS, I decided not to go the native route, but instead look for an alternative approach. Since I've done so much Ionic development lately, and the app I want to deploy to desktops already exists in Ionic, I decided to use [Ionic](https://ionicframework.com/){target="_blank"}, [Capacitor](https://capacitorjs.com/){target="_blank"} and [Capacitor-Community Electron](https://capacitor-community-electron-docs-site.vercel.app/){target="_blank"} for my app.

In my previous attempts to build Electron apps using Ionic, I was able to tweak the electron container app configuration directly by modifying the source code. With the recent version of Ionic, the Ionic team switched to using the Electron Community version (whatever that is).

For my app, I wanted to be able to set the window size for the window, but I couldn't find the instructions for how to do that. So, the purpose of this post is to document how to do it for others encountering the same problem.

```text
You may be asking "Why not just contribute to the public docs for Capacitor Electron?" Well, I can't figure out a way to do that, so I'm writing it up here and will contribute to the docs as soon as I figure out how.
```

When you add the [Capacitor-community Electron](https://capacitor-community-electron-docs-site.vercel.app/){target="_blank"} client to an Ionic app, you can tweak the Electron window configuration by opening the project's `electron/src/index.ts` file then look for the following:

```typescript
// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();
```

This is the code that creates the Electron app window. The docs tell you that you can add Splash Screen settings using the following:

```typescript
// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp({
  splashScreen: {
    useSplashScreen: false,
  }
});
```

But I wanted to be able to set the window size, and you can do that through the `windowOptions` object shown in the code below:

```typescript
// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp({
  splashScreen: {
    useSplashScreen: false,
  },
  mainWindow: {
    windowOptions: {
      autoHideMenuBar: true,
      width: 600,
      height: 620,
    }
  }
});
```
