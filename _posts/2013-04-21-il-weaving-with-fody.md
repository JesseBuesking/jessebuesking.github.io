---
layout: post
title: IL Weaving with Fody
description: "IL weaving for fun and profit with Fody."
modified: 2013-12-04
categories:
    - articles
    - programming
tags:
    - il
    - fody
    - programming
    - c#
    - .net
image:
  feature: texture-feature-01.jpg
  credit: Lei Han
  creditlink: http://www.flickr.com/photos/sunsetnoir/8104146861
---

I've finally taken the plunge and decided to try my hand at [Intermediate Language (IL)weaving](http://stackoverflow.com/questions/189359/what-is-il-weaving). I'm only about two weeks in, but I've gotta say that it's been a great learning experience.

After reading [Mitigate The Billion Dollar Mistake With Aspects](http://haacked.com/archive/2013/01/05/mitigate-the-billion-dollar-mistake-with-aspects.aspx) by Phil Haack, I immediately realized how great [Aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) can be at removing a lot of annoying boilerplate code. Under *Alternative Approaches and What's Next?*, Haack mentioned [Fody](https://github.com/Fody/Fody), so I decided to check it out.

Fody is an awesome tool by [Simon Cropp](http://simoncropp.com/) that can help you get right into weaving IL into your code. Simon's got quite a few add-ins already written, and they make pretty good resources for learning how to weave IL.

Until recently I really didn't have a reason to attempt weaving IL, so I just kept these resources in the back of my mind. Just a few weeks ago though, I was working on a [Genetic Programming](http://en.wikipedia.org/wiki/Genetic_programming) project I've been writing in C#, which makes use of binary serialization to perform deep copying of objects. I found an extension through a [StackOverflow question](http://stackoverflow.com/a/129395/435460) that makes deep copying a trivial task.

After profiling my project, I found that it was spending a large portion of its time executing this deep copy extension method (I was cloning individuals of the previous generation's population when performing any genetic operations in order to prevent memory leaks). I knew that I could write the deep copying logic by hand per object to avoid the cost of the binary serialization, but then I remembered about Fody and IL weaving and thought this would be the perfect problem that could be used to try out IL weaving.

I must admit, the first few days were a bit of a mess. I was really just copying code snippets from Fody projects and examples I found online, crossing my fingers, and hoping things would magically work. But after working through it I now feel that I have a **much** better understanding of how IL weaving works, and how you can translate method in C# into the necessary Mono.Cecil Instructions to perform the same task. I also know a bit more about what's happening behind the scenes in C# when using properties, among other things.

Two weeks later, and I've created a working Fody add-in called [BB.DeepCopy](https://github.com/JesseBuesking/BB.DeepCopy) that covers all of the cases I needed in my Genetic Programming project. It's cut the execution time of each generation in half, and I really didn't need to alter my code at all to make use of it. Amazing!

It doesn't support quite a few scenarios (deep copying [Generics](http://msdn.microsoft.com/en-us/library/512aeb7t.aspx), handling circular references, etc.), but it's a nice step towards automatically handling deep copying for your typical use cases.
