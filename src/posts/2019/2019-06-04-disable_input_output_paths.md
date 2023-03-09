---
tags: post
title: Ionic `disable_input_output_paths`
categories: [Ionic Framework]
date: 2019-06-04
---

I was testing an Ionic application in Xcode yesterday when I received the following error message during the Build process:

{% highlight text %}
Unknown installation options: disable_input_output_paths
{% endhighlight %}

It turns out that I was running an older version of CocoaPods, opening a terminal window and executing the following command fixed the issue:

{% highlight text %}
sudo gem install cocoapods
{% endhighlight %}
