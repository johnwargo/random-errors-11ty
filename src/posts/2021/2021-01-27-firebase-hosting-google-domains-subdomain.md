---
  layout: post
  title: Google Domains Subdomain Configuration
  tags: [Firebase, Google Domains]
  categories: [Web Hosting]
  comments: true
---

I'm working a lot lately in Firebase, and when trying to setup Firebase Hosting for one of my domains - I wrote about other issues in [an earlier post]({{site.baseurl}}/2021/01/27/firebase-hosting-google-domains). In this case, I want to setup a subdomain (for example: subname.mysite.com), Firebase showed me the following dialog:

![Firebase Hosting Dialog]({{site.baseurl}}/assets/firebase-custom-domain-2.png)

In Google Domains, I tried the trick I learned in that linked article, but it didn't work because the A record doesn't need the whole fully qualified domain name (FQDN), all it needs is the subdomain as shown in the following figure. I whacked the domain portion from the A record and it worked like a champ.

![Google Domains Custom Resource Second]({{site.baseurl}}/assets/google-domains-custom-resources-4.png)
