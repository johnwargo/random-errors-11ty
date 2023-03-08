---
  layout: post
  title: Ionic "Pipe not found"
  tags:
  categories: [Ionic Framework]
  comments: true
---

I'm building a web app using Ionic and needed a [Pipe](https://angular.io/guide/pipes) to transform some data for the app. I'm implementing a CSV file import process and I wanted to display each CSV row as a comma separated list after I'd imported all of it into a JSON object. My goal was to display the list for the user to make sure that the CSV Parsing process worked correctly before completing the import.

it's a pretty simple Pipe, just mapping the object values into a comma-separated list:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaObject'
})
export class CommaObjectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Object.keys(value).map((k) => value[k]).join(', ');
  }
}
```

I found a couple of tutorials and followed them, but I couldn't get it to work. I thought I was doing it right, but apparently not. Every time I tested the app, I received a Pipe not found error.

When you create a pipe using the Ionic CLI, it automatically updates the project's `app.module.ts` file with the pipe, but that doesn't work. I got some help from the [Ionic Forums](https://forum.ionicframework.com/t/custom-pipe-could-not-be-found/204537) and figured it out. You have to undo the CLI's changes to the `app.module.ts` file and put them in the module file for the page using the pipe. I built a complete sample application that highlights how to build a custom pipe, you can find the app on [GitHub](https://github.com/johnwargo/ionic-pipes-example).