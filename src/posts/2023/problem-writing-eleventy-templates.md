---
title: Problem writing Eleventy templates
date: 2023-07-07
categories:
  - Eleventy
tags: post
---

There is an error I see in Eleventy periodically when I'm either working in a new site or working (coding) a plugin. The problem occurs when I execute the `eleventy` command to generate the site. Here's the full error block:

```text
D:\dev\11ty\eleventy-plugin-post-stats>eleventy  
[11ty] Problem writing Eleventy templates: (more in DEBUG output)
[11ty] Cannot read properties of undefined (reading 'data') (via TypeError)
[11ty]
[11ty] Original error stack trace: TypeError: Cannot read properties of undefined (reading 'data')
[11ty]     at Object.postStats (D:\dev\11ty\eleventy-plugin-post-stats\eleventy-plugin-post-stats.js:20:31)
[11ty]     at TemplateMap.getUserConfigCollection (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateMap.js:674:47)
[11ty]     at TemplateMap.setCollectionByTagName (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateMap.js:386:50)
[11ty]     at TemplateMap.initDependencyMap (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateMap.js:410:20)
[11ty]     at async TemplateMap.cache (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateMap.js:459:5)
[11ty]     at async TemplateWriter._createTemplateMap (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateWriter.js:330:5)
[11ty]     at async TemplateWriter.generateTemplates (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateWriter.js:360:5)
[11ty]     at async TemplateWriter.write (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateWriter.js:407:23)
[11ty]     at async Eleventy.executeBuild (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\Eleventy.js:1191:13)
[11ty] Wrote 0 files in 0.03 seconds (v2.0.1)
```

It happens when you have an empty folder in your project's `input` folder. Simply add a post file to the folder, re-run the `eleventy` command, and the problem goes away.

The `input` folder is defined in the project's `.eleventy.js` or `eleventy.config.js` file like this:

```js
return {
	dir: {
		input: 'src',
		output: "_site",
		includes: "_includes",
		layouts: "_layouts",
		data: "_data"
	}
}
```

In my case, the project had a `src/posts` folder with no posts in it.