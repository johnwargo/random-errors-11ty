---
title: Flutter Android Toolchain Cannot Execute Java
date: 2025-04-29
categories:
  - Flutter Development
tags: post
timestamp: 2025-04-30T00:35:19.833Z
---

I run Microsoft's Java on my development system and whenever I upgrade Java on my system, it breaks my Flutter toolchain. Here's what it looks like.

When I execute `flutter doctor`, the tool shows an error in my Android toolchain"

```text
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.29.2, on Microsoft Windows [Version 10.0.26100.3915], locale en-US)
[✓] Windows Version (11 Pro 64-bit, 24H2, 2009)
[!] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
    ✗ Cannot execute C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot\bin\java to determine the version
[✓] Chrome - develop for the web
[✓] Visual Studio - develop Windows apps (Visual Studio Community 2022 17.13.6)
[✓] Android Studio (version 2024.2)
[✓] VS Code (version 1.99.3)
[✓] Connected device (3 available)
[✓] Network resources
```

To check my system to see what version of Java the system sees, I execute the following command:

```shell
where java
```

which gives me:

``` text
C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot\bin\java.exe
```

In this case, my Flutter toolchain is configured for a version of Java that's no longer on the system, it's been upgraded. Checking the Flutter conifig:

```shell
flutter config --list
```

Shows the following:

```text
jdk-dir: C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot
```

Which is not the current version of Java installed on my system.

Reconfiguring Flutter to use the newer version of Java is as simple as:

```shell
flutter config --jdk-dir "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot"
```

Gives me the following result:

```text
Setting "jdk-dir" value to "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot".
```

Validating the updated Flutter config using 

```shell
flutter doctor
```

Gives me the following results:

```text
Running flutter doctor...
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.29.3, on Microsoft Windows [Version 10.0.26100.3915], locale en-US)
[✓] Windows Version (11 Pro 64-bit, 24H2, 2009)
[✓] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
[✓] Chrome - develop for the web
[✓] Visual Studio - develop Windows apps (Visual Studio Community 2022 17.13.6)
[✓] Android Studio (version 2024.2)
[✓] VS Code (version 1.99.3)
[✓] Connected device (3 available)
[✓] Network resources
```

Fixed!