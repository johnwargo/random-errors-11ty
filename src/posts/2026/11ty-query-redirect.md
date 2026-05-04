---
title: 11ty Search Query Redirect Empty
date: 2026-05-04
categories:
  - Eleventy
tags: post
timestamp: 2026-05-04T23:29:51.416Z
---

While working on adding search capabilities to an [11ty](https://www.11ty.dev/){target="_blank"} site, I noticed that when my search form redirected to the full search results page, the query string didn't make it to the page. 

I started with the following input form:

```html
<form onsubmit="doSearch(event)">
  <input type="text" id="queryInput" placeholder="Search..." />
</form>

<div id="search-results"></div>
```

Then I added a submit handler:

```js
function handleSearch(event) {	
	event.preventDefault(); 
	const queryStr = document.getElementById('query').value.replace(/\s+/g, ' ').trim();
	window.location.href = `/search?query=${encodeURIComponent(queryStr)}`;
}
```

On the target page, I used the following code to grab the query string and launch the search:

```js
document.addEventListener('DOMContentLoaded', () => {
  const query = new URLSearchParams(window.location.search).get('query');
  if (query && query.length > 0) {
    console.log(`Query parameter: ${query}`);
    // populate the search field
    document.getElementById('queryInput').value = query;
    // execute the search
    doSearch();
  }
});
```
Every time the app loaded the search page, the query string was empty. Unfortunately, this took me a while to figure this out, but the solution is simple. 

When serving an 11ty site locally, the embedded web server automatically redirects urls like `/search` to `/search/`. So, in this case, the site opened `/search` and passed in the query string, but the server immediately redirected to `/search/` but didn't append the query string.

Changing the search url solved the problem, adding the `/` to the end of the page url:

```js
window.location.href = `/search/?query=${encodeURIComponent(queryStr)}`;
```
