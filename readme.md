# Random Development Errors (Eleventy)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d0df3329-8819-45b4-9920-240104777d6c/deploy-status)](https://app.netlify.com/sites/random-errors/deploys)

The Eleventy version of the static web site for [randomerrors.dev](https://randomerrors.dev).

![Home Page](images/image-01.png)

Based on: https://cfjedimaster.github.io/eleventy-blog-guide/guide.html

+ Domain: [Google Domains](https://domains.google)
+ Framework: [Eleventy](https://www.11ty.dev/)
+ Source: [Github](https://github.com/johnwargo/random-errors-11ty)
+ Hosting: [Netlify](https://app.netlify.com/sites/randomerrors/overview)
+ Backdoor Access: [Random Errors](https://randomerrors.netlify.app/)
+ Email Obfuscator: https://www.wbwip.com/wbw/emailencoder.html

Search Page shamelessly stolen from Ray Camden:  https://github.com/cfjedimaster/raymondcamden2020/blob/master/search.liquid

## Tasks

* [x] Select theme and implement
* [x] Categories menu
* [x] Update contact options
* [x] Add number of pages and buttons to pagination
* [x] Add Buy me a coffee
* [x] Add Favicons
* [x] Publish site to Netlify
* [x] Add Google Analytics
* [x] Switch DNS
* [x] Add email link on the bottom (do I have an email address)
* [x] Add Site Search (Algolia)
* [x] Make categories data file with article counts (11ty-cat-pages)
* [x] Make categories data file with description (11ty-cat-pages)
* [x] Minification - https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output
* [x] Fix Case issue for tags (no lowercase)
* [x] Add statistics page
* [ ] Add manifest
* [ ] Add image shortcode and update pictures
* [ ] Add description field to posts
* [ ] Rebuild search form (no Vue)

## Google Analytics

* Random Errors-GA4
* Property ID: 311016183
* Measurement ID: G-ZWB41V4FM5

```javascript
<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="johnwargo" data-color="#5F7FFF" data-emoji="☕"  data-font="Poppins" data-text="Buy me a Coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
```

```html
<br/>
<p>If this article helps you, please consider
<a href="https://www.buymeacoffee.com/johnwargo" target="_blank"><img
  src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
  alt="Buy Me A Coffee"
  height="41"
  width="174"></a>
</p>
```


{target="_blank"}

{% highlight liquid %}
{% endhighlight %}

