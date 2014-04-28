---
layout: post
title: F# is Slow in IIS and IIS Express
description: "Speeding up web development when using F# with IIS and IIS Express."
modified: 2014-04-27
categories:
    - articles
    - programming
tags:
    - f#
    - fsharp
    - iis
    - express
comments: true
image:
  feature: texture-feature-02.jpg
---

Over the past few weeks I've finally decided to give F# a try with a simple web project. For the most part, the experience was enjoyable. However, one thing that was driving me crazy was the slow start up time of IIS Express.

My typical workflow is to make one or two smallish changes, then check the results in a browser. So for me, having to wait for more than a few seconds can really kill productivity. Doing this workflow with a typical C# and MVC project results in a wait that's less than about 5 seconds on average. I can handle waiting about 5 seconds. However, this new project that utilizes F# was taking a LOT longer. I never actually timed it, but I'd say it was taking something like 2 to 5 minutes on average. As you can see, this is an unacceptable amount of time for my workflow.

I dealt with this for a few weeks, thinking that it was just the price you pay when working with F#. Also, I'm lazy. But just the other day I finally decided to look into this more, so I fired up the task manager and kicked off another change using ``Start Without Debugging`` (from Visual Studio). I noticed almost instantly that something called ``Antimalware Service Executable`` was suddenly using decent bit of CPU. After a quick search, I found that this was a part of ``Windows Defender``, a service Microsoft supplies by default until antivirus software is installed.

A bit of messing with it and I find that you can exclude certain paths and processes from being protected, so I figured that I'd try excluding IIS Express from being protected to see if that would have an effect. I started another launch of my project using ``Start Without Debugging``, and about 5 seconds later the page is loaded in my browser. Victory!

Since then I've added a few more exclusions to the list including Visual Studio itself, and my development environment now loads faster and is a bit snappier. I wish I had looked into this sooner!

If you find this useful, here's the list of processes I ended up excluding in the end:

1. ``C:\Program Files (x86)\IIS Express\\iisexpress.exe`` (IIS Express, the main culprit)
2. ``C:\Windows\System32\inetsrv\w3wp.exe`` (The IIS worker process)
3. ``C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe`` (Used with IIS)
4. ``C:\Program Files (x86)\Microsoft SDKs\F#\3.1\Framework\v4.0\Fsc.exe`` (F# compiler)
5. ``C:\Program Files (x86)\Microsoft SDKs\F#\3.1\Framework\v4.0\Fsi.exe`` (F# interpreter)
6. ``C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\devenv.exe`` (VS2012)
7. ``C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe`` (VS2013)
