---
title: NPM Publishing Scoped Public Packages
date: 2024-11-16
categories:
  - Node.js
tags: post
timestamp: 2024-11-16T18:46:18.090Z
---

I created a new node.js-based command-line utility this week ([@johnwargo/link-checker](https://www.npmjs.com/package/@johnwargo/link-checker){target="_blank"}) and since I knew there was already a package there with that name (`link-checker`) I knew I had to publish the package in such a way that a user could publish it and use my npm account name (`@johnwargo`) to install my version of the utility.

At first I assumed I could just publish it with the name `link-checker` but then install it using `@johnwargo/link-checker`. That didn't work, so I started poking around and found [Creating and publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages){target="_blank"} in the npm docs.

This basically told me I had to force my npm user name into the package name (just my way of describing this). 

So, in my package's `package.json` file, I added my npm user name to the `name` property:

```json
{
  "name": "@johnwargo/link-checker",
  "version": "0.0.4",
  "description": "A nodejs-based command line utility to validate links in a web application",
  "author": "John M. Wargo",
  "license": "MIT",
  "type": "module",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/johnwargo/link-checker.git"
  },
  "main": "link-checker.js",
  "bin": {
    "checklinks": "link-checker.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc && node --no-deprecation link-checker.js -d",
    "start": "tsc && node --no-deprecation link-checker.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "boxen": "^8.0.1",
    "chalk": "^5.3.0",
    "execa": "^9.5.1",
    "linkinator": "^6.1.2",
    "prompts": "^2.4.2"
  },
  "devDependencies": {
    "@types/node": "^22.9.0",
    "@types/prompts": "^2.4.9"
  }
}
```

With that in place, when I tried to publish the package, it told me that I had to purchase a subscription to publish private, org-specific packages. 

I'm not trying to publish an org-specific package, I'm trying to publish a public package but use my account name as a unique identifier in the package name. 

After poking around for a while, I finally found the solution. When publishing the package, I had to tell the `publish` command to publish the package publicly:

``` shell
npm publish --access public
```

Once I did that, it worked great.

I have all of my node.js projects in a folder, so I created a simple Windows command file there to publish my packages; it looks like this:

``` shell
dos2unix.exe *.js
git add -A
git commit -m "updated %date% %time%"
call npm version patch
call npm publish --access public
git push
```

With that in place, when I want to publish a particular package I have open in Visual Studio Code, I open up a terminal window and execute the following command:

``` shell
..\pub.cmd
```

The command file:

1. Converts all `.js` file contents to Unix file endings.
2. Commits all local changes to the local git repository.
3. Patches the version number in the project's `package.json` file (automatically incrementing the `patch` version).
4. Publishes the package to npm.
5. Pushes all changes to my GitHub account.

The [call](https://ss64.com/nt/call.html){target="_blank"} command you see there allows me to call one command file from another and wait until the called batch file exits before continuing.

This approach works really well for me and allows me to abstract the process away and publish all my packages the exact same way.

