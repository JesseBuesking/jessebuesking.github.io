---
layout: post
title: Neural Art
description: "Creating artwork using neural networks."
modified: 2015-09-08
categories:
    - articles
    - machine-learning
    - neural-networks
tags:
    - data-science
    - machine-learning
    - python
    - art
comments: true
image:
    feature: texture-feature-02.jpg
baseurl: /JesseBuesking
---

<style>
    .pair {
        margin-bottom: 10px;
        border-bottom: 3px solid #ddd;
    }
</style>


Fairly recently, a paper titled [A Neural Algorithm of Artistic Style](http://arxiv.org/abs/1508.06576) appeared and several implementations of the algorithm appeared. Like many, I found it to be quite impressive and decided to try it out for myself. Below are some the results of applying that technique to some images from the popular television show *Doctor Who*, as well as to myself.

*Note: You can click the resulting image for each of the outputs below to view a gif of the neural network applying the technique to the original image. I decided not to inline the gif image to save those viewing this page on mobile from having to download a bunch of ~4mb gifs to save some bandwidth.*


### Doctor Who

Being a fan of Doctor Who, I figured that I would try this out on some photos from the show.

To start, *Starry Night* seems to be a good fit for this image of the TARDIS floating out in space.

<img
    src="{{ site.baseurl }}/static/img/neural-art/starry_night.jpg"
    width="400"
    height="311"
    alt="Starry Night"/>

<!-- tardis -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/tardis.png"
        width="400"
        height="250"
        alt="TARDIS floating in space"/>
    <img
        src="{{ site.baseurl }}/static/img/neural-art/tardis-starry_night.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/tardis-starry_night-5fps.gif"
        width="400"
        height="250"
        alt="TARDIS styled using Starry Night">
    </img>
</div>

You can see the dark tower from the original photo coming through in various places throughout the image. The TARDIS is still visible and is the brightest part of the image.

In the fifth series, there is an episode where the Doctor sees a painting of his TARDIS exploding, painted by — according to the episode — Vincent van Gogh himself. This would also seem to be a good fit for applying *Starry Night*.

<!-- tardis exploding -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/tardis-explode.png"
        width="400"
        height="225"
        alt="TARDIS exploding">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/tardis-explode_starry_night.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/tardis-explode_starry_night-5fps.gif"
        width="400"
        height="225"
        alt="TARDIS exploding styled using Starry Night">
    </img>
</div>

Again you can see the dark tower in a few spots. I think this one turned out really well with a lot of the original artwork taking shape in this resulting image.

Earlier in that season, the Doctor and Amelia Pond travel back in time and meet up with van Gogh. The actor they found to play van Gogh bears a resemblance to the famous painter himself, so I decided to try using the style from one of his self portraits on the actor.

<img
    src="{{ site.baseurl }}/static/img/neural-art/van_gogh_self_portrait.jpg"
    width="300"
    height="363"
    alt="van Gogh self portrait"/>

<!-- van gogh actor -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh.png"
        width="400"
        height="225"
        alt="van Gogh actor">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh_van-gogh.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/van-gogh_van-gogh-5fps.gif"
        width="400"
        height="225"
        alt="van Gogh actor styled using a van Gogh self portrait">
    </img>
</div>

I was curious to see the effect of applying it to the same image, but this time after having cropped the image around the actor.

<!-- van gogh actor cropped -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh-zoomed.png"
        width="400"
        height="335"
        alt="van Gogh actor cropped">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh-zoomed_van-gogh.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/van-gogh-zoomed_van-gogh-5fps.gif"
        width="400"
        height="225"
        alt="van Gogh actor cropped styled using a van Gogh self portrait">
    </img>
</div>

It looks like both turned out well, however I think the network did a better job on the cropped image. Cropping enlarged the details of the image so that the large brush strokes are still able to preserve a lot of detail. For example, compare the eyes in the two images. You can see the eyes in the first image, but they blend in to some extent with the rest of the face. The white of his eyes and the definition of his nose are more defined in the second image, which is more inline with the original self portrait.

I decided to also use a still from the episode where van Gogh, the Doctor, and Amelia are all together. Again, I applied the self portrait to the image.

<!-- van gogh, the doctor, and amelia -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh-dr-pond.png"
        width="400"
        height="275"
        alt="van Gogh, the Doctor, and Amelia">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van-gogh-dr-pond_van-gogh.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/van-gogh-dr-pond_van-gogh-5fps.gif"
        width="400"
        height="225"
        alt="van Gogh, the Doctor, and Amelia styled using a van Gogh self portrait">
    </img>
</div>

Aside from the BBC copyright notice making it's way into the result a bit, I'd like to think that van Gogh painted this himself and this is proof that the Doctor really did travel back in time. It looks pretty good!


### Myself

I also attempted to run the network on an image of myself, styled to some famous paintings. Some results turned out better than others, but overall the network did a reasonable job.

<img
    src="{{ site.baseurl }}/static/img/neural-art/me_512.jpg"
    width="400"
    height="257"
    alt="an image of myself"/>

<!-- donelli style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/donelli.jpg"
        width="289"
        height="400"
        alt="donelli self portrait">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_donelli.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_donelli-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the donelli self portrait">
    </img>
</div>

<!-- frida style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/frida_kahlo.jpg"
        width="307"
        height="400"
        alt="frida self portrait">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_frida.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_frida-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the frida self portrait">
    </img>
</div>

<!-- mona lisa style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/mona_lisa_da_vinci_756.jpg"
        width="265"
        height="400"
        alt="mona lisa">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_mona_lisa.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_mona_lisa-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the mona lisa">
    </img>
</div>

<!-- picasso style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/picasso_selfport1907.jpg"
        width="312"
        height="400"
        alt="picasso self portrait">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_picasso.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_picasso-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the picasso self portrait">
    </img>
</div>

<!-- seated nude style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/seated-nude.jpg"
        width="308"
        height="400"
        alt="seated nude">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_seated_nude.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_seated_nude-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the seated nude">
    </img>
</div>

<!-- shipwreck style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/shipwreck.jpg"
        width="400"
        height="276"
        alt="shipwreck">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_shipwreck.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_shipwreck-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the shipwreck">
    </img>
</div>

<!-- starry night style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/starry_night.jpg"
        width="400"
        height="311"
        alt="starry night">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_starry_night.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_starry_night-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the starry night">
    </img>
</div>

<!-- scream style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/the_scream.jpg"
        width="288"
        height="400"
        alt="the scream">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_the_scream.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_the_scream-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the scream">
    </img>
</div>

<!-- van gogh style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/van_gogh_self_portrait.jpg"
        width="330"
        height="400"
        alt="van gogh self portrait">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_van_gogh.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_van_gogh-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the van gogh self portrait">
    </img>
</div>

<!-- matisse style -->
<div class="pair">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/woman-with-hat-matisse.jpg"
        width="296"
        height="400"
        alt="woman with hat by matisse">
    <img
        src="{{ site.baseurl }}/static/img/neural-art/me_matisse.png"
        data-alt="{{ site.baseurl }}/static/img/neural-art/me_matisse-5fps.gif"
        width="400"
        height="257"
        alt="myself styled using the woman with hat by matisse">
    </img>
</div>

All the results look pretty good! The only one keeping me up at night is the *Mona Lisa*-styled result because the result is kinda creepy, but otherwise the styles applied were done reasonably well.

Overall I'd say that this technique is pretty cool and I think the results turned out pretty darned good.

<script>
    $("img").click(function () {
        // backup the current src
        var alt = $(this).data("alt"),
            current = $(this).attr("src");
        // swap
        $(this).data("alt", current);
        $(this).attr("src", alt);
    });
</script>
