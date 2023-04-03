---
title: Netlify Eleventy Build Failure
date: 2023-04-03
categories: [Eleventy]
tags: post
---

I am in the process of migrating my existing johnwargo.com site hosted on FatCow to [Eleventy](https://www.11ty.dev/) hosted on [Netlify](https://www.netlify.com/) and while I work on the site, I setup my [jmw-test.com](https://jmw-test.com) domain so it points to the work in progress site. 

When I setup the site and build in Netlify yesterday, the site built and deployed for me the first time, but then quit working and gave me the following error:

```text
9:00:51 AM: $ eleventy
9:00:52 AM: bash: eleventy: command not found
9:00:52 AM: ​
9:00:52 AM:   "build.command" failed                                        
9:00:52 AM: ────────────────────────────────────────────────────────────────
9:00:52 AM: ​
9:00:52 AM:   Error message
9:00:52 AM:   Command failed with exit code 127: eleventy (https://ntl.fyi/exit-code-127)
9:00:52 AM: ​
9:00:52 AM:   Error location
9:00:52 AM:   In Build command from Netlify app:
9:00:52 AM:   eleventy
9:00:52 AM: ​
9:00:52 AM:   Resolved config
9:00:52 AM:   build:
9:00:53 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
9:00:52 AM:     command: eleventy
9:00:52 AM:     commandOrigin: ui
9:00:52 AM:     environment:
9:00:52 AM:       - NODE_ENV
9:00:52 AM:     publish: /opt/build/repo/_site
9:00:52 AM:     publishOrigin: ui
```

I ran the build all day on my local system with no errors, so this really perplexed me. I poked and prodded at the Netlify docs, but couldn't find a solution that worked. As I prepared to jump on the Netlify community site to ask for help, I opened the build log to copy the error text displayed above and found the reason for the build failure:

```text
9:00:42 AM: WARNING: The environment variable 'NODE_ENV' is set to 'production'. Any 'devDependencies' in package.json will not be installed
```

Being an experienced Node/JavaScript developer, I knew to install my dev dependencies in the project's `package.json` file under `devDependencies` and that worked just fine on my local system. That is a flawed premise though, Eleventy is a static site generator, so runtime for an Eleventy project is during the build process, not while the 'app' executes.

I quickly moved the `devDependencies` to `dependencies` and the project built and deployed as expected.

This site uses Netlify as well and it only took me a few seconds to realize why this issue hit me now rather than when I built this site. I was playing around with HTML minification in Eleventy projects based on the [Minifying HTML Output](https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output) tutorial and during implementation I added a `NODE_ENV` environment variable in Netlify to enable HTML minification for `production` use (rather than having it enabled all the time) and that triggered Netlify to ignore my `devDependencies`. 

Problem solved!
