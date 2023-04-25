---
title: Eleventy Last Post Date Using Liquid
date: 2023-04-25
categories: [Eleventy]
tags: post
---

While migrating my personal blog to Eleventy, I decided to add a statistics page to the site. As part of that, I wanted to add the publish dates for the first and last posts on the site. Getting the first post date was easy:

{% highlight liquid %}
{{ collections.posts[0].date | readableDate }}
{% endhighlight %}

The `readableDate` you see there is a filter added by the [`eleventy-plugin-date`](https://www.npmjs.com/package/eleventy-plugin-date) plugin to format the date for easy reading. 

Getting the last post date was tougher as I couldn't do this:

{% highlight liquid %}
**WRONG** - Doesn't work.
{{ collections.posts[collections.posts.length - 1].date | readableDate }}
{% endhighlight %}

The liquid templating engine doesn't allow math that way in an array index. Instead, you must do the math in a variable assignment using the `minus` filter, then use the variable as the index to the last item in the posts array:

{% highlight liquid %}
{% assign lastIndex = collections.posts.length | minus: 1 %}
{{ collections.posts[lastIndex].date | readableDate }}
{% endhighlight %}

Here's a complete example as a table:

{% highlight liquid %}
{% assign lastIndex = collections.posts.length | minus: 1 %}

<table>
  <thead>
    <tr>
      <th>Statistic</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Posts</td>
      <td>{{ collections.posts.length }}
      </td>
    </tr>
    <tr>
      <td>First Post</td>
      <td>{{ collections.posts[0].date | readableDate }}</td>
    </tr>
    <tr>
      <td>Latest Post</td>
      <td>
        {{ collections.posts[lastIndex].date | readableDate }}</td>
    </tr>    
  </tbody>
</table>
{% endhighlight %}

Special thanks to [chriskirknielsen](https://chriskirknielsen.com/designs/){target="_blank"} for providing me with this solution on Discord.