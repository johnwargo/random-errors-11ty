---
title: Eleventy Not A Supported Mime Type
date: 2023-07-09
categories:
  - Eleventy
tags: post
---

I was working on a Eleventy Plugin starter project yesterday and when I built the sample site and opened it in the browser, Chrome gave me a bunch of errors related to hosting site assets:

```text
Refused to apply style from 'http://localhost:8080/assets/css/mvp.css' because its MIME type 
('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
localhost/:16 Refused to apply style from 'http://localhost:8080/assets/css/index.css' because 
its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
localhost/:61     GET http://localhost:8080/assets/js/index.js net::ERR_ABORTED 404 (Not Found)
localhost/:1 Refused to execute script from 'http://localhost:8080/assets/js/index.js' because
its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

I double (and triple) checked, and the files were definitely there in the project. I also compared this project's configuration to another Eleventy site and couldn't see any differences, especially one that would suddenly enable strict MIME type checking in Chrome.

Of course, I finally figured it out. The assets were there in the project, but I'd not added them to the list of files Eleventy copies during deployment.  I was missing the following line in the project's `eleventy.config.json` file:

```js
eleventyConfig.addPassthroughCopy("src/assets/");
```

The file should have looked something like this:

```js
module.exports = eleventyConfig => {

	eleventyConfig.addPassthroughCopy("src/assets/");
	
	return {
		dir: {
			input: 'src',
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data"
		}
	}

};
```

With that in place, Eleventy copies my project's `assets` folder (and all sub folders) to the site and the error goes away.
