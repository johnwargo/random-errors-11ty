---
title: Windows Path Items Not Avialable in Visual Studio Code
date: 2023-12-31
categories:
  - Windows
tags: post
---

A few weeks back, in terminal windows (command prompts) on my primary Windows system, the system lost access to the system `PATH` variable contents. My experience differed depending on how I launched the terminal window.

If I opened a Windows Terminal window and navigated to the folder where I wanted to work, everything worked fine. In this case, my system's `PATH` applied correctly and when I typed any command for an executable file (`.exe`, `.bin`, `.cmd`, or `.bat files`) on the path, the command executed.

When executing any command in the Visual Studio Code terminal or when opening a command prompt from Windows File Explorer, those commands didn't execute. It wasn't all commands, just some. For example, the `git` command worked everywhere, but any installed node packages executed through `npm` didn't work.

I assumed I encountered some change in Visual Studio Code, but since it also affected terminal windows depending on how I opened them, I knew the problem was somewhere else.

The first troubleshooting step I took was to compare the contents of the system's `PATH` variable in each condition (Visual Studio Code terminal, manually opened terminal, and File Explorer opened terminal) and quickly noticed a difference. The `PATH` variable in the manually opened terminal window was much bigger (more entries) than the other two.  When I opened a Windows Path Editor app I downloaded years ago (and can't find a link to share) I noticed that many of the items in the System Path were duplicated in the User Path. 

I deleted the duplicate entries between the two (User and System Paths) and removed old entries that pointed to deleted folders. After rebooting the system, all the issues resolved. 

My thought is that the path may have been too long, and somehow when Visual Studio Code or the Windows File Explorer truncated the path when opening a new window. Manually opened Terminal windows apparently use the longer, full path.

I searched around and found a utility called [Windows Path Editor](https://rix0rrr.github.io/WindowsPathEditor/){target="_blank"} has a clean Up button you can use to prune your path and remove duplicate entries. **I did not test out this app**, so I can't tell if it would have fixed my problem. I downloaded a copy so the next time this happens I have something easier to use to fix it. 
