---
title: Eleventy grey-matter engine not registered error
date: 2023-05-17
categories:
  - Eleventy
tags: post
---

I use a npm package I created called [Eleventy-New-Post](https://www.npmjs.com/package/eleventy-new-post){target="_blank"} to create new posts for my Eleventy sites. It saves me the work of copying a post file in the project folder then emptying it before adding the new content for the post. It also automates selecting a category for the post from an automatically generated list of all categories used by the site.

I ran it this morning to generate a new post for a site and after generating the new post file, I fired up the `eleventy --serve` command to validate something about the post URL when I got this error:

```text
[11ty] Problem writing Eleventy templates: (more in DEBUG output)
[11ty] 1. Having trouble reading front matter from template ./src/posts/2023/joomla-to-eleventy-migration---part-1.md (via TemplateContentFrontMatterError)
[11ty] 2. gray-matter engine "tags: post" is not registered (via Error)
[11ty] 
[11ty] Original error stack trace: Error: gray-matter engine "tags: post" is not registered
[11ty]     at module.exports (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\node_modules\gray-matter\lib\engine.js:6:11)
[11ty]     at module.exports (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\node_modules\gray-matter\lib\parse.js:8:18)
[11ty]     at parseMatter (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\node_modules\gray-matter\index.js:109:17)   
[11ty]     at matter (C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\node_modules\gray-matter\index.js:50:10)
[11ty]     at C:\Users\john\AppData\Roaming\npm\node_modules\@11ty\eleventy\src\TemplateContent.js:167:20
[11ty] Benchmark    837ms  40%     1× (Data) `./src/_data/popularArticles.js`
[11ty] Copied 189 files / Wrote 0 files in 1.15 seconds (v2.0.1)
```

The error tells me that the `tags` front matter property caused the problem, but really happened is I asked Eleventy to generate a site using an empty post. As soon as I added content to the post, the error went away.

The error likely reflects the last property in the YAML front matter for the post.
