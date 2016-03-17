---
layout: post
title: NDSB2 Post Competition Notes
description: "Notes on my approach to Kaggle's NDSB2 competition."
modified: 2016-03-17
categories:
    - articles
    - machine-learning
    - neural-networks
tags:
    - data-science
    - python
comments: true
image:
    feature: texture-feature-02.jpg
baseurl: /JesseBuesking
---

<style>
    article .pair {
        padding: 4px 0;
        margin: 4px 0;
        border-bottom: 3px solid #ddd;
    }
    article .pair p {
        padding: 10px 0;
    }
    article img {
        padding: 4px;
        display: block;
        margin: 0 auto;
    }
</style>


Given that the competition has recently ended, I figured that I should make some notes on the approach I took.

### Background

The goal of the competition was to predict heart volumes at two stages in its cycle, given images taken via MRI. Most patients had around 300 images, roughly 30 images for a cycle across 10 slices of the heart. For some patients we were given their volumes so that we could create models to predict against future patient MRI data. This should be enough background to get the gist of the approach below, but for more information check out [the competition details over on Kaggle](https://www.kaggle.com/c/second-annual-data-science-bowl).

<img
    src="{{ site.baseurl }}/static/img/ndsb2/16examples.png"
    width="377"
    height="500"
    alt="16 examples"/>

Above is a sample of some of the images you might come across. The images in the example are samples taken from two patients, the top 8 for one patient and the bottom 8 for another. Not all images look like this however. The images can come in a variety of orientations, dimensions, and quality.

### Notes on my approach

I began to work on my model with only 4 weeks left in the competition, so I could only try a limited number of ideas. My final pipeline was pretty simple:

1. Preprocess the images to a standard size 192x192 pixels by padding the image if necessary and rescaling.
2. Create a CNN to segment the left ventricle from the full image. The goal of this network is to locate the left ventricle.
3. Run the network on 1 out of every 7 images per patient, and find the center of the predicted segment per slice.
4. Zoom into the predicted location of the left ventricle, including some buffer area to allow for some error in the first CNN.
5. Create a CNN to segment the left ventricle from the zoomed in image. The goal of this network is to correctly segment the left ventricle.
6. Run the network on every image, finding the segments for each image. The output is mapped back to the original image so that we can work in the original pixel scale.
7. Predict volumes using the final segmentations.

For my first "find the LV" model, each image was actually a combination of 5: the actual image, the previous and next image in the cycle, and the previous and next image at the same time but in adjacent slices. The idea was that the model could potentially benefit from seeing nearby images to increase its confidence in the location of the LV. It is hard to spot the LV for some images in isolation, but if you scan across slices or time you can get an idea of the location and map it back to the image in question. The issue with my approach to this was that I placed the additional images in the "channels" instead of doing 3D convolutions. I still saw a benefit regardless, so it might be worthwhile to try out 3D convolutions and see if it performs better.

I only ran this model on 1 out of every 7 images so that this stage could be ran faster. I ran it on 64 augmentations of each image, so speed was actually a concern. I then averaged the augmentations for a given slice and saved the result to disk. When running the second model, I would load the predictions for each slice to find the LV. To isolate the LV, I would find the center pixel for each slice and then attempt to detect any outliers across slices. Outliers typically occurred in the end slices, primarily because some images did not contain the LV because they were just beyond the edge of the heart. In these cases the predictions were incorrect and could be detected. I would then find the smallest box containing all the predicted segments in the slices that were not outliers, and increase its size by 1.2x. This left me with the left ventricle roughly centered in a box with a little space on all sides.

My second model also took the same 5 images, this time zoomed in on the left ventricle. The zoomed images were all resized to 128x128 pixels. My predictions were made on only 8 test time augmentations for speed, then saved to disk. I computed the volume using the formula in the tutorials using the slice locations to determine thickness and the supplied pixel spacings. For the images shown above, here are the predicted contours overlaid on the image. As you can see, the predictions are pretty darn good!

<img
    src="{{ site.baseurl }}/static/img/ndsb2/16final.png"
    width="377"
    height="500"
    alt="16 predictions"/>

Also note that both of my CNN models were fed augmented images using zooming, rotation, shearing, flipping, stretching, and brightness/contrast augmentations to improve their abilities to generalize. Their architectures were basically autoencoders where the output to be predicted were the contours and not the original images. Originally I tried a typical CNN where the dense output was a map to the contours at 24x24 pixels which I'd then scale up to the original 192x192 pixel size, however the segmentations weren't very well defined and pretty noisy. I tried something similar to what's apparently called a U-net (discovered the name via [Julian's forum post](https://www.kaggle.com/c/second-annual-data-science-bowl/forums/t/19530/3rd-place-quick-summary)), but I wasn't too successful. I'd like to go back and try it with an actual U-net to see if my results improve.

The only other thing I tried was to use an LSTM on the subvolumes computed from the predicted segmentations in order to improve the target volume predictions. However, it seems that just computing the mean offset for each of the two volumes over the training data and subtracting it from all test predictions seemed to work just as well.

### Issues

I created a simple GUI tool to draw contours on the Kaggle dataset and used it to label roughly 800 images (or about 40 patients). The tool used the formula for computing the volume and displayed it to me as I was drawing the contours for a patient. This was when I realized that my model would not be successful as it was, because no matter how hard I tried, almost all volumes were pretty far off from what were given. If my contours led to volumes that were under the labeled volume, I would go back and try to squeeze out some more LV, but in a lot of cases I couldn't see how that was possible. At this point I began to wonder why we were just given volumes and not contours, given that the volumes were almost guaranteed to have been obtained by expert contours that already existed. I then decided to just try and draw reasonable contours and hope for the best.

Another issue was likely with how I loaded the data. After reading the forums, it was apparent that there would be some issues regarding patients who had multiple scans taken at the same slice location. I always took the latest scan as recommended by one of the doctors on the forums. I then tried to be clever and remove what I thought were erroneous slices. I noticed that slice locations typically followed a pattern. For example, you might see locations like ``11.12, 21.12, 31.12, ...``. These were what I considered "good" slices, and I used them as-is. However, I noticed slice locations like ``11.12, 20.13, 21.12, 31.12, ...``, where you'd have most slices being equally spaced plus some extras (in this case ``20.13``). I removed the slices that did not follow the overall pattern for a patient thinking that these were most likely erroneous, however it doesn't sound like others did this so I may have been removing some necessary images! I'm curious if anyone else did something similar...

### Wrap up

Overall I placed [60th out of 192](https://www.kaggle.com/c/second-annual-data-science-bowl/leaderboard/private) on the private leaderboard. I was around 40th out of roughly 750 on the original leaderboard, but not everyone submitted in the final week. Given the simplicity of my pipeline, I don't think this is too bad!

If I were to work more on this, my next steps would be:

1. Fix my data loading, removing my "clever" input cleanup if it is actually incorrect.
2. Use an actual U-net for more precise segmentations.
3. Try using 3D convolutions for my 5 images instead of putting them into the channels.
4. Any other tips/tricks I come across in other competitors' write ups.

Despite not having ended in the money (or even close to it really), I think this was a worthwhile competition. I got to work on my segmentation chops, and towards a worthy cause! I hope that the top contender's models will be useful to cardiologists and have an actual impact in the real world. I'd also like to see more big impact competitions like this on Kaggle, but maybe not divided into two separate leaderboards...
