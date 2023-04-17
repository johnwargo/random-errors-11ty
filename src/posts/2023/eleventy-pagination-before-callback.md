---
title: Eleventy Pagination Before Callback Not Working
date: 2023-03-16
categories: [Eleventy, Static Site Generators]
tags: post
---

I've been trying to figure out how to easily build:

1. A categories page for this site that lists all categories including the number of posts per category (easily done in Eleventy).
2. A separate page for each category with pagination when the article list is greater than 20 posts.

The first one's easy and the second one is typically done manually in all the other solutions I've been able to find.

I figured out how to solve the second one and it all hinges around a specific feature of Eleventy Pagination: [the `before` callback](https://www.11ty.dev/docs/pagination/#the-before-callback){target="_blank"}.

{% highlight liquid %}

{% endhighlight %}
