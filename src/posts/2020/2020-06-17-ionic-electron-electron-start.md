---
  layout: post
  title: Ionic Electron Command Failed npm run electron:start 
  tags: [Electron, Capacitor]
  categories: [Ionic Framework]
  comments: true
---

While testing an Ionic Electron app the other day, I opened a terminal window, navigated to the Ionic project folder, then executed the following command:

```shell
npx cap open electron
```

`npm` whirled and chunked for a little while, then displayed the following error:

```text
[error] Error: Command failed: npm run electron:start
'electron' is not recognized as an internal or external command,
operable program or batch file.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! my-app@1.0.0 electron:start: `electron ./`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the my-app@1.0.0 electron:start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2020-06-17T20_53_46_920Z-debug.log

    at ChildProcess.exithandler (child_process.js:303:12)
    at ChildProcess.emit (events.js:315:20)
    at maybeClose (internal/child_process.js:1021:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:286:5) {
  killed: false,
  code: 1,
  signal: null,
  cmd: 'npm run electron:start'
}
```

This error surprised me, because I assumed the Electron project was configured correctly, but apparently not. I fixed this by executing the following commands In the terminal window:

```shell
cd electron
npm install
cd ..
npx cap open electron
```

The Electron app opened as expected. I'm not sure how the project got into this state, but fortunately it's a quick and easy fix.
