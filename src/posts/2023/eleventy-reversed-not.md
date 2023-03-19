---
title: Eleventy Posts Not Sorting Correctly
date: 2023-03-11
categories: [Eleventy]
tags: post
---

I recently switched this site to Eleventy and I noticed that my posts weren't sorting correctly on the home page. I want them sorted in reverse chronological order, but the site did the opposite. 

I used [Raymond Camden](https://www.raymondcamden.com/){target="_blank"}'s excellent [A Complete Guide to Building a Blog with Eleventy](https://cfjedimaster.github.io/eleventy-blog-guide/guide.html){target="_blank"} and from it I learned I could sort posts in reverse order using the following:

{% highlight liquid %}
{% for post in posts reversed %}
  <a href="{{post.url}}">{{ post.data.title }}</a>, posted {{ post.date | niceDate }}<br/>
  {% excerpt post %}
{% endfor %}
{% endhighlight %}

And that's what I did in my code. I started reading around on the Eleventy docs and confirmed this approach in the [Collections](https://www.11ty.dev/docs/collections/#sort-descending){target="_blank"} docs.

I started looking around in my site's code and found this in the front matter of my home page:

```yaml
---
title: Home
layout: home
pagination:
  data: collections.post
  size: 10
  alias: posts
  reverse: true
---
```

It sets up a set of pages with ordered posts, reversed because of the `reverse: true`. That was the problem, I was reverse ordering them twice. As soon as I removed `reversed` from my liquid template it works as expected. See the 'fixed' template below:

{% highlight liquid %}
{% for post in posts %}
  <a href="{{post.url}}">{{ post.data.title }}</a>, posted {{ post.date | niceDate }}<br/>
  {% excerpt post %}
{% endfor %}
{% endhighlight %}
