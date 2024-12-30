---
title: Eleventy Cannot Be Invoked Without New
date: 2024-12-30
categories:
  - Eleventy
tags: post
timestamp: 2024-12-30T13:11:58.706Z
---

I recently migrated several Eleventy v2 sites to Eleventy v3 on node.js 22; I wrote about the process in [Eleventy 3 Migration](https://johnwargo.com/posts/2024/eleventy-3-migration/){target="_blank"}. During the migration process, I made a change to the site that generated the following error:

```text
[11ty] Eleventy Error (CLI):
[11ty] 1. Error processing the `Eleventy` plugin (via EleventyPluginError)
[11ty] 2. Class constructor Eleventy cannot be invoked without 'new' (via TypeError)
[11ty]
[11ty] Original error stack trace: TypeError: Class constructor Eleventy cannot be invoked without 'new'
[11ty]     at UserConfig._executePlugin (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/UserConfig.js:740:10)
[11ty]     at TemplateConfig.processPlugins (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/TemplateConfig.js:329:27)
[11ty]     at TemplateConfig.mergeConfig (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/TemplateConfig.js:494:14)
[11ty]     at async TemplateConfig.init (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/TemplateConfig.js:211:17)
[11ty]     at async Eleventy.initializeConfig (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/Eleventy.js:253:3)
[11ty]     at async Eleventy.init (file:///D:/dev/11ty/site/node_modules/@11ty/eleventy/src/Eleventy.js:483:4)
ERROR: "build:eleventy" exited with 1.
```

The cause of this error is something stupid I did during the upgrade process. While converting this code:

```js
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
```

to an import statement, I implemented it this way:

```js
import EleventyHtmlBasePlugin from '@11ty/eleventy';
```

That's what caused the error. Not necessarily understanding what I was doing (Node modules are still somewhat voodoo to me), I removed the {} brackets that forced importing a specific export. What I should have done was leave the brackets in place:

```js
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
```

Once I did that, the problem resolved. Special thanks to the [11ty Discord Community](https://discord.com/channels/741017160297611315/1323035992168337409){target="_blank"} for helping me resolve this issue.
