---
  layout: post
  title: App Script Date Picker UTC
  tags: 
  categories: [Google App Script]
  comments: true
---

I'm working on a project where I needed an Add-on to Google Calendar. Google Developers recently sent me an email with details about App Script, and after a little research I knew it would solve my problem. It took me a really long time to get to the point where it worked - longer than I expected and, I think, a direct result of the fact the the App Script docs omit a lot of concrete examples I needed to get started.

Anyway, one of the things I have in my Add-on is a Home Page with a simple form to collect data from the user. Once the user populates some fields and clicks a button, off my code goes to do its work. One of the things I needed was a Date Picker, and the App Script toolbox readily provided one for me:

```javascript
sectionMain.addWidget(
  CardService.newDatePicker()
    .setTitle("Enter a start date for the generated entries:")
    .setFieldName("start_date")
    .setValueInMsSinceEpoch(Date.now())
    .setOnChangeAction(
      CardService.newAction().setFunctionName("handleStartDateChange")
    )
);
```

When I run the script in Google Calendar, it dutifully collects the input values, then passes an event object to my code for me to retrieve the input values after the user clicks the button. The event object has a bunch of stuff in it, but here's the part that matters to me (or my code anyway):

```json
"formInput":{
  "mtg_duration":"30",
  "start_time":{
      "minutes":0,
      "hours":12
  },
  "num_entries":"5",
  "start_date":{
      "msSinceEpoch":1611014400000
  }
}
```

So the start date value collected on the input form is represented as milliseconds since midnight. Not a problem, I'm an experienced JavaScript developer and this doesn't throw me off since I know that the JavaScript Date object has a constructor that accepts milliseconds:

```javascript
var startDate = new Date(e.formInput.start_date.msSinceEpoch);
Logger.log("Selected Date: " + startDate.toDateString());
```

But when I looked at the output, the date object showed yesterday's date. I had no idea what was going on here as I was fairly certain today wasn't yesterday. I poked and prodded this for a while and eventually found a site called [current millis](https://currentmillis.com/) that (sort of) gave me the answer. When I pasted in the date value I got from my app's logs (in milliseconds) it showed me that the date object pointed to midnight today, as expected since this was a Date instead of a Date/Time. But the value is in UTC, so midnight this morning UTC, is actually 9 PM yesterday in my local time zone (UTC - 5) - see the results highlighted in the image below.

![Current Millis Site](assets/current-millis.png)

The simple solution was to add the UTC time offset to the Date object, and that transformed it to midnight (morning) my time - which is TODAY!!

```javascript
/**
 * Get the start date. Google returns it as a UTC date object
 * So we have to add the UTC Offset to it to get the current date
 */
var startDate = new Date(e.formInput.start_date.msSinceEpoch);
var timeOffsetInMS = startDate.getTimezoneOffset() * 60000;
startDate.setTime(startDate.getTime() + timeOffsetInMS);
Logger.log("Selected Date: " + startDate.toDateString());
```

This works for my current locale, it feels like it would work for other parts of the world, but I didn't test it to that level.
