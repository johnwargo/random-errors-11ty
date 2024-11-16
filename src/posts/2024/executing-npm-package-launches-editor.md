---
title: Executing NPM Package Launches JavaScript Editor
date: 2024-11-16
categories: [Node.js]
tags: post
timestamp: 2024-11-16T18:17:21.027Z
---

I created a new node.js-based command-line utility this week ([@johnwargo/link-checker](https://www.npmjs.com/package/@johnwargo/link-checker){target="_blank"}) and when I first tested the utility after publishing it, something weird happened. Rather than launch the utility as I expected, the node.js package's source code file opened in the default JavaScript editor on my Windows system. 

I've published a lot of node.js-based utilities, so I thought I knew what I was doing.

What happened was I forgot to add the [SheBang](https://en.wikipedia.org/wiki/Shebang_(Unix)){target="_blank"} string at the top of the source code file (which in this case was TypeScript code compiled into JavaScript code). 

The SheBang tells the interpreter, in this case the Windows command line, which application to use to execute the code. With npm packages, npm installs shell and command scripts to execute the package. In this case, they launched my `link-checker.js` file. Without the SheBang, Windows launched the default editor for the `.js` extension: Visual Studio Code.

The correct SheBang looks like this: 

```js
#!/usr/bin/env node
```

and it belongs as the first line in the source code file.

Fortunately for us, Windows knows what to do with it because the node.js executable isn't located at `/usr/bin/env/` but it finds it anyways. 

I wonder perhaps if the node.js installation creates a symbolic link for that path?
