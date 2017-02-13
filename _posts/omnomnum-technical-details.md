---
layout: post
published: false
title: OmNomNum - Technical Details
description: "A look at some of the technical details behind the creation of OmNomNum."
modified: 2017-02-11
categories:
    - articles
    - programming
    - c
    - ruby
tags:
    - ruby
    - c
comments: true
image:
    feature: texture-feature-02.jpg
baseurl: /JesseBuesking
---

- How to include a c submodule in a gem.
- Things I did to improve performance.
  - faster int to string conversion
  - faster double to string conversion
  - inlining some logic within re2c
  - jump table for fun, but also speed
  - reusing strings
  - reuse buffers in itoa and dtoa
  - reusing parser by adding 'reset' logic
  - sds library for working with character arrays
  - wish i could use perfect hashing but numbers could be together, eg onehundred
