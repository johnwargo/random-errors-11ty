---
title: Ionic disable_input_output_paths
date: 2019-06-04
categories: [Ionic Framework]
tags: post
---

I was testing an Ionic application in Xcode yesterday when I received the following error message during the Build process:

``` text
Unknown installation options: disable_input_output_paths
```

It turns out that I was running an older version of CocoaPods, opening a terminal window and executing the following command fixed the issue:

``` text
sudo gem install cocoapods
```
