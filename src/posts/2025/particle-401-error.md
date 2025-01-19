---
title: Particle API Request failed with status code 401
date: 2025-01-19
categories:
  - IoT
  - Particle Platform
tags: post
timestamp: 2025-01-19T15:17:21.664Z
---

For years now, the [Particle Platform](https://particle.io){target="_blank"} on login prompted me to enable two factor authentication (2FA). I finally got tired of seeing that message, so last week I enabled 2FA on my account. 

Unfortunately, as soon as I did that, my existing Particle API tokens expired or were deleted by the Particle folks. When calling any of the APIs, the platform returned the 401 error shown below. 

> Request failed with status code 401

Not realizing that the API tokens were deleted/cancelled, I was surprised to see that it still failed after I deleted the 2FA. Once I generated a new API Token and added it to my app, everything started working again. 
