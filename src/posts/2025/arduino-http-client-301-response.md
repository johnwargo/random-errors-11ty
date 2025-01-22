---
title: Arduino HTTP Client 301 Response
date: 2025-01-22
categories:
  - IoT
tags: post
timestamp: 2025-01-22T12:05:44.134Z
---

I was working on an Arduino project that connected to a server to retrieve some information. As I tested an initial version of the sketch, I noticed that the connection worked, but returned a 301 error.

> From the [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301){target="_blank"}: The HTTP 301 Moved Permanently redirection response status code indicates that the requested resource has been permanently moved to the URL in the Location header.

Taking a look at my code and the URL the sketch connected to, I quickly found the error. While coding, I 'cleaned up' the URL by removing the trailing backslash:

```c
const char *targetUrl "https://baconipsum.com/api" 
```

What happens is the server redirected the incoming target to:

```c
const char *targetUrl "https://baconipsum.com/api/" 
```

which is the actual URL for the target. As soon as I added the forward slash (`/`) back to the URL, the sketch started connecting to the server correctly and returned the data I needed.

## More

Actually, I lied to you. I deliberately gave you a simplistic example to make the solution more clear to you. In reality, my code actually used this:

```c
const char *targetUrl = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
```

What made me remove the trailing forward slash was the `/?`, the slash before the query string delimiter. In my mind, it didn't make any sense to have the slash before the question mark, that seemed like a wasted character being sent across the network.

It turns out that you have to have that trailing slash there before the query string delimiter. That's because the actual API endpoint is `https://baconipsum.com/api/`, not `https://baconipsum.com/api`. 

If I were loading a page instead of an API endpoint, then the URL would look correctly like this:

```c
const char *targetUrl = "https://baconipsum.com/somepage.html?type=meat-and-filler&paras=1";
```

In this case, the target page ends and the query string picks up from there cleanly. 
