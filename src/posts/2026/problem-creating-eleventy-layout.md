---
title: Problem creating an Eleventy Layout
date: 2026-04-10
categories:
  - Eleventy
tags: post
timestamp: 2026-04-10T17:02:40.407Z
---

I was working on a new 11ty site this morning and while building the site, I encountered the following error:

```text
[11ty] Problem writing Eleventy templates:
[11ty] 1. Problem creating an Eleventy Layout for the "./11ty-cat-pages.liquid" template file. (via EleventyBaseError)
[11ty] 2. You’re trying to use a layout that does not exist: _includes/base (via `layout: base`)
[11ty] 
[11ty] Original error stack trace: Error: You’re trying to use a layout that does not exist: _includes/base (via `layout: base`)
[11ty]     at TemplateLayoutPathResolver.getFullPath (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayoutPathResolver.js:115:10)
[11ty]     at new TemplateLayout (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayout.js:19:31)
[11ty]     at TemplateLayout.getTemplate (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayout.js:58:17)
[11ty]     at Template.getLayout (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/Template.js:187:26)
[11ty]     at #getData (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/Template.js:388:23)
[11ty]     at async TemplateMap.add (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateMap.js:70:14)
[11ty]     at async Promise.all (index 0)
[11ty]     at async TemplateWriter._addToTemplateMap (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:340:13)
[11ty]     at async TemplateWriter._createTemplateMap (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:351:3)
[11ty]     at async TemplateWriter.generateTemplates (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:382:3)
[11ty] Wrote 0 files in 0.19 seconds (v3.1.2)
[11ty] Eleventy Fatal Error (CLI):
[11ty] 1. Problem creating an Eleventy Layout for the "./11ty-cat-pages.liquid" template file. (via EleventyBaseError)
[11ty] 2. You’re trying to use a layout that does not exist: _includes/base (via `layout: base`)
[11ty] 
[11ty] Original error stack trace: Error: You’re trying to use a layout that does not exist: _includes/base (via `layout: base`)
[11ty]     at TemplateLayoutPathResolver.getFullPath (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayoutPathResolver.js:115:10)
[11ty]     at new TemplateLayout (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayout.js:19:31)
[11ty]     at TemplateLayout.getTemplate (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateLayout.js:58:17)
[11ty]     at Template.getLayout (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/Template.js:187:26)
[11ty]     at #getData (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/Template.js:388:23)
[11ty]     at async TemplateMap.add (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateMap.js:70:14)
[11ty]     at async Promise.all (index 0)
[11ty]     at async TemplateWriter._addToTemplateMap (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:340:13)
[11ty]     at async TemplateWriter._createTemplateMap (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:351:3)
[11ty]     at async TemplateWriter.generateTemplates (file:///Users/johnwargo/dev/johnwargo/the-breakfast-quest-11ty/node_modules/@11ty/eleventy/src/TemplateWriter.js:382:3)
ERROR: "build:eleventy" exited with 1.
```

It took me a while to figure this out, but as I worked on the site, I renamed the site's `eleventy.config.js` file to `.eleventy.js`. Both are supported file names for the JavaScript file that controls the build process, so I didn't expect any problems. 

As it turns out, I didn't do the rename correctly. When I renamed the file, I renamed the file to `eleventy.js` instead of `.eleventy.js`. Without the dot, 11ty couldn't find the configuration file. 

The giveaway was the following line in the error message:

``` text
[11ty] 2. You’re trying to use a layout that does not exist: _includes/base (via `layout: base`)
```

in my site, I use the config file to instruct 11ty to look for layouts in the `_layouts` folder instead of the `_includes` folder (which is the default option). 

```js
	return {
		dir: {
			input: 'src',
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data'
		}
	}
```

The build process wasn't using the `_layouts` folder because it didn't know I wanted it to find the layouts in that folder -> because it wasn't able to find the configuration file that told it that. 

Sigh, more wasted time troubleshooting a stupid developer mistake.
