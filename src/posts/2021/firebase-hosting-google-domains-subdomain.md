---
tags: post
title: Google Domains Subdomain Configuration
categories: [Web Hosting]
date: 2021-01-27
---

I'm working a lot lately in Firebase, and when trying to setup Firebase Hosting for one of my domains - I wrote about other issues in [an earlier post](/posts/2021/firebase-hosting-google-domains). In this case, I want to setup a subdomain (for example: subname.mysite.com), Firebase showed me the following dialog:

{% image "src/images/firebase-custom-domain-2.png", "Firebase Hosting Dialog", "image-full" %}

In Google Domains, I tried the trick I learned in that linked article, but it didn't work because the A record doesn't need the whole fully qualified domain name (FQDN), all it needs is the subdomain as shown in the following figure. I whacked the domain portion from the A record and it worked like a champ.

{% image "src/images/google-domains-custom-resources-4.png", "Google Domains Custom Resource Second", "image-full" %}
