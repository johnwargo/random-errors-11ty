---
tags: post
title: Google Domains "Record Already in Use"
categories: [Web Hosting]
date: 2021-01-27
---

I'm working a lot lately in Firebase and when trying to setup Firebase Hosting for one of my domains, Firebase showed me the following dialog:

{% image "src/images/firebase-custom-domain.png", "Firebase Hosting Dialog", "image-full" %}

Hopping over to Google Domains, I created the first A record, but when I added the second record, Google Domains reported "Record already in use".

{% image "src/images/google-domains-custom-resources-1.png", "Google Domains Error", "image-full" %}

I poked around on the Internet for a while and didn't find the answer in the Google Domains documentation or through a Google Search. I used the Google Domains contact form and was quickly on a chat where a support technician showed me the simple solution. 

You can't add two A records for the same domain, but you don't have to - you can add multiple IP Addresses for a single record as shown in the following figure:

{% image "src/images/google-domains-custom-resources-2.png", "Google Domains Custom Resource Add", "image-full" %}

Put in the first address, click the highlighted + button to open a panel that allows you to add the second address. Easier than expected, but hard for me to notice that button. 

{% image "src/images/google-domains-custom-resources-3.png", "Google Domains Custom Resource Second", "image-full" %}
