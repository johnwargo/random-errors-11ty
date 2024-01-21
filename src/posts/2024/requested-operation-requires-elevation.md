---
title: Delphi Requested Operation Requires Elevation
date: 2024-01-21
categories:
  - Delphi
  - Windows
tags: post
---

When running an application that requires elevated access (admin privileges) in the Delphi IDE (RAD Studio), you may see an error displayed in a dialog that says "Unable to create process: The requested operation requires elevation." as shown below:

{% image "src/images/2024/delphi-requires-elevation.png", "Elevation error message", "image-full" %}

This happens because you're running an application that requires elevated access (administrator privileges) but you're running it in/from an application that doesn't have the required privileges. To resolve this issue, start the Delphi IDE as an administrator.

To do this, in Windows right click on the IDE Icon and select **Run as administrator** as shown in the following image:

{% image "src/images/2024/windows-running-app-as-admin.png", "An image showing how to run an app as an admin in Windows", "image-full" %}

Windows will ask for your permission to do this and you're all set. You grant Delphi admin privileges and approve it once. As you run the app you're building, Windows doesn't ask you to approve elevated access because you're already in an app with elevated access.
