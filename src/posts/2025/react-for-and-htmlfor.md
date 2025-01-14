---
title: React For and htmlFor
date: 2025-01-14
categories:
  - Web Development
tags: post
timestamp: 2025-01-14T22:50:19.189Z
---

I was working in an old React app today and came across the following error at runtime:

> Warning: Invalid DOM property for. Did you mean htmlFor

This is a known thing in React, and after a quick search, I realized the problem. In my app, I changed all of the instances of the `for` in `label` elements from:

```html
<label for="currentPage">Current Page</label>
```

to:

```html
<label htmlFor="currentPage">Current Page</label>
```

Under the covers, React and JSX resolve the htmlFor into the regular everyday `for` used by the `label` element.

Sadly, that fixed some of the errors, but not all of them. Apparently you can't use "for" in any of the text on the JSX page either. My app had the following content:

```html
<p>Goodreads is an excellent web application for tracking book reading activity. However, its
  page count is often inaccurate (flat out wrong from including notes, appendices, and other 
  stuff in the page count). To get Goodreads to display an accurate completion percentage, you 
  must adjust your current page read to accommodate; this application does it for you.</p>
```

I had to figure out a way to use that word in the page content. I did some editing and replaced a couple of "for"s but I couldn't remove some of them. Some more research brought me to the following solution. 

In the app's JavaScript code, I added the following constant:

```js
const theForbiddenWord = "for";
```

Then, in my page content, I did this:

```html
<p>Goodreads is an excellent web application {theForbiddenWord} tracking book reading activity. 
  However, its page count is often inaccurate (flat out wrong from including notes, appendices, 
  and other stuff in the page count). To get Goodreads to display an accurate completion percentage, 
  you must adjust your current page read to accommodate; this application does it 
  {theForbiddenWord} you.</p>
```
