---
title: Eleventy Pagination Before Callback Not Working
date: 2023-04-16
categories: [Eleventy, Static Site Generators]
tags: post
---

I've been trying to figure out how to easily build:

1. A categories page for this site that lists all categories including the number of posts per category (easily done in Eleventy).
2. A separate page for each category with pagination when the article list is greater than 20 posts.

The first one's easy and the second one is typically done manually in all the other solutions I've been able to find.

I figured out how to solve the second one and it all hinges around a specific feature of Eleventy Pagination: [the `before` callback](https://www.11ty.dev/docs/pagination/#the-before-callback){target="_blank"}.

With the `before` callback, Eleventy site builders have a chance to execute some JavaScript code before pagination kicks in to generate the paginated pages. Based on how I read the docs, I knew that I could add the following `before` property to my YAML front matter and it would filter my posts to the current category:

{% highlight liquid %}
---
layout: default
pagination:
  data: collections.post
  size: 20
  alias: catposts
  before: function(paginationData, fullData){ return paginationData.filter((item)
    => item.categories.includes("BlackBerry"));}
category: BlackBerry
eleventyComputed:
  title: "Category: {{ category }}"
permalink: categories/{{ category }}/{% if pagination.pageNumber != 0 %}page-{{
  pagination.pageNumber }}/{% endif %}
---

{% for post in catposts reversed %}
  <div>
    <a href="{{post.url}}">{{ post.data.title }}</a>, posted {{ post.date | niceDate }}
    {% excerpt post %}
  </div>

  <p>
    {% if pagination.href.previous %}
      <button type="button" onclick="location.href='{{ pagination.href.previous }}'">Previous</button>
    {% endif %}
    {% if pagination.href.next %}
      <button type="button" onclick="location.href='{{ pagination.href.next }}'">Next</button>
    {% endif %}
  </p>
{% endfor %}
{% endhighlight %}

Basically, the point is to execute the following function using the complete set of posts and returning only the posts where the `categories` property includes `Miscellaneous`.

```js
function(paginationData, fullData){ 
  return paginationData.filter((item) => item.data.categories.includes('Miscellaneous'));
}
```

Well, it turns out that this doesn't work. The function's correct, but Eleventy never executes it.

I pushed and prodded at this and couldn't get anything to work. I eventually posted a question on the Eleventy Discord: [Pagination before callback not working](https://discord.com/channels/741017160297611315/1092758549249151016){target="_blank"}. I didn't find the answer there, but, of course, while I asked the question, I found the answer.

Since Eleventy is executing a JavaScript function during processing, Eleventy has to see it as JavaScript in the front matter. The documentation page **showed** this, but didn't explain this, so I missed it. Apparently, the front matter must be in JSON format (I didn't know there was such a thing as JSON front matter) for this to work. As soon as I converted the YAML to JSON, it worked perfectly. 

{% highlight liquid %}
---js
{
  "layout": "generic",
  "pagination": {
    "data": "collections.post",
    "size": 20,
    "alias": "catposts",
    "before": function(paginationData, fullData){ return paginationData.filter((item) => item.data.categories.includes('Miscellaneous'));}
  },
  "category": "Miscellaneous",
  "eleventyComputed": {
    "title": "Category: {{ category }}"
  },
  "permalink": "category/{{ category | slugify }}/{% if pagination.pageNumber != 0 %}page-{{ pagination.pageNumber }}/{% endif %}"
}
---

<p>All posts for a single category, in reverse chronological order.</p>

{% for post in catposts reversed %}
  <div>
    <a href="{{post.url}}">{{ post.data.title }}</a>, posted {{ post.date | niceDate }}
    {% excerpt post %}
  </div>
{% endfor %}

<p>
  {% if pagination.href.previous %}
    <button type="button" onclick="location.href='{{ pagination.href.previous }}'">Previous</button>
  {% endif %}
  {% if pagination.href.next %}
    <button type="button" onclick="location.href='{{ pagination.href.next }}'">Next</button>
  {% endif %}
</p>
{% endhighlight %}

With this in place, I was able to build this functionality into this site as well as the current [johnwargo.com](https://johnwargo.com){target="_blank"} site I'm currently migrating to Eleventy.

I built this into a npm package that automates the process of building the category list data and generating the individual category pages. Its called [Eleventy Category Pages](https://www.npmjs.com/package/eleventy-category-pages){target="_blank"} and I published it today. Give me a while and I'll publish a blog post explaining the process on [johnwargo.com](https://johnwargo.com){target="_blank"}.
