---
title: Delphi Method Hides Virtual Method
date: 2026-01-25
categories:
  - Delphi
tags: post
timestamp: 2026-01-25T15:04:41.357Z
---

I was doing some coding this morning in Delphi and encountered the following warning in the compiler output:

``` text
doClose method hides virtual method of base type 'TCustomForm'
```

I recently created a local procedure called `doClose` that did some cleanup before the application closes and I never considered that that procedure name conflicted with something else used internally by the application.

It turns out that Delphi's `Vcl.Forms.TCustomForm` has a [`DoClose`](https://docwiki.embarcadero.com/Libraries/Sydney/en/Vcl.Forms.TCustomForm.DoClose){target="_blank"} method and I created a potential conflict by using it.

I renamed my procedure to `doClosingStuff` and the warning went away.
