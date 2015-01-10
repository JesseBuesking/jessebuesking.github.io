---
layout: post
title: DrivenData — Box-Plots for Education
description: "Now that the Box-Plots for Education competition is complete, in this post I cover the things I tried and my lessons learned."
modified: 2015-01-09
categories:
    - articles
    - deep-learning
tags:
    - data-science
    - machine-learning
    - deep-learning
    - python
comments: true
image:
  feature: texture-feature-02.jpg
---

*In this post I discuss my approach to the problem and the lessons I learned along the way.*

Before I begin, let me preface this by saying that my primary goal of participating in this competition was not necessarily to win — although that would have been an added bonus — but to learn as much as I could about some techniques that interested me, specifically neural networks and deep belief networks. Also note that this was the first competition I have ever signed up to compete in where I did anything more than just sign up.

I ended up ranked 8th with a public score of ``0.5585`` and a private score of ``0.5556`` over a total of ``15`` submissions. For comparison, the competitor who ended up in first had a public score of ``.3665`` while everyone ranked above 11th had scores under ``.6``. The competition had ``296`` people who entered and ``52`` people who made submissions, ``38`` of which made more than ``1`` submission.

My model was implemented in [python](https://www.python.org/) using [scikit learn](http://scikit-learn.org/stable/index.html) for some of the algorithms, [theano](http://deeplearning.net/software/theano/) and [numpy](http://www.numpy.org/) for my [deep belief network](http://en.wikipedia.org/wiki/Deep_belief_network) models, and the [NLTK](http://www.nltk.org/) library for some of the [NLP](http://en.wikipedia.org/wiki/Natural_language_processing) work I was doing. I also used [matplotlib](http://matplotlib.org) and [seaborn](http://stanford.edu/~mwaskom/software/seaborn/) when I was visually exploring the data.

## My first reasonable model

I really should have spent more time on data exploration and feature engineering if I wanted to place higher, but instead I spent most of my time learning and implementing different models. The first model that I submitted with a decent score was an ensemble containing two models, one using Logistic Regression and the other using a Random Forest. After training the models I constructed a weight matrix used to find a weighted average of the two models. This model was very simple to build, involving some parameter tuning via grid searching and the construction of the weight matrix, but it resulted in a public score of ``.6035``, a big improvement over my previous model that scored ``1.5448``.

## Things I discovered about the data itself

I initially tried making use of the floating point columns, bucketing them to reduce the amount of data points. These fields didn't add much value to my models, so I decided to stick with the text columns.

The training data contained about 400k rows of data, however I noticed that there were a lot of duplicates. Removing the duplicates lead to ~53k rows of usable training data. I split these into train (~40k), test (7k), and validation (5k) data sets.

Exploring the text fields showed me that the data was in pretty horrible shape. Inconsistent naming of things, abbreviations, words being chopped off, words missing their vowels; this list goes on and on. I actually spent some time cleaning this data, creating some text mappings to transform these fields.

## What my input data looked like

When performing cross validation on the logistic regression and random forest classifiers, I tried feeding in different feature vectors to see what helped the most. My feature vectors ended up using 1-grams, 2-grams, word prefixes (first 3 letters) and suffixes (last 3 letters) of the mapped words after having been stemmed using a snowball stemmer. The feature vector used these pieces as a bag-of-words, both as a single bag of all the fields together, and as individual fields. In total there were over 30k features. I would've liked to cut this down a lot, but I actually kept the feature vector this large because I honestly wanted to see how the deep belief network would handle it.

## Where I spend most of my time

My primary goal in this competition was to get some hand-on experience working with [neural networks](http://en.wikipedia.org/wiki/Artificial_neural_network) and deep learning. I actually started the competition by building a neural network in numpy, which can be found [on github](https://github.com/JesseBuesking/dbn).

Having built that, I began reading through the tutorials at [deeplearning.net](http://deeplearning.net/tutorial/contents.html). This was my first exposure to theano, which itself was something that took a lot of work to learn. However, I think the effort was worth the reward. Theano is a great library in that it can compile your python logic for optimized execution in ``c``, or for [cuda gpus](https://developer.nvidia.com/cuda-gpus).

I then took the code for the tutorial and repurposed it for the competition. The biggest hurdle with theano on the gpu was just getting comfortable with theano enough to enable batch execution on the training data. Available memory on a gpu causes memory pressure, so this was a requirement. After that, I spent most of my time reading through and manipulating the code to get a better feel for how deep belief networks work. I added regularization to both the pretrain and finetune code ([rbm](http://en.wikipedia.org/wiki/Restricted_Boltzmann_machine) and regression layers respectively), although I didn't see a very noticeable improvement. I even implemented [momentum](http://www.cs.toronto.edu/~fritz/absps/momentum.pdf) in order to speed up convergence, and it was well worth the effort. After that I tried getting [rmsprop](http://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf) working, but ran out of time. I had also planned on implementing and using [dropout](http://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf), but time constraints made that infeasible.

In the end I spent most of my time learning and working with deep belief networks. In the future I'd like to dive deeper into deep belief networks, however I plan on doing so using [pylearn2](http://deeplearning.net/software/pylearn2/) as a reference instead of coming at it from scratch.

## Things I tried

### In general

I toyed with different features. There was a lot of parameter searching and feature testing, but I should have spent more time in this area.

### In sklearn

I tried many models but ran into memory issues with the ones requiring dense vectors (I do realize this was do to the size of my feature vectors). In the end I only trained and parameter tuned a logistic regression classifier, a random forest classifier, and a naive bayes classifier. The logistic regressor scored ``.7578``, the random forest scored ``.7296``, and an ensemble of the two scored ``.6035``. The naive bayes classifier consistently under-performed, so I didn't make any submissions with it.

### Averaged Perceptron

I recently read a blog post about training and using an averaged perceptron for part of speech tagging, so I was curious to learn more about how they work. I ended up implementing one for this competition and giving it a go, but it did not perform very well (at around a ``1.5``, one of my first models).

### Deep belief networks

I tried different numbers of layers (1 - 4) and layer sizes (100 - 2k) in my deep belief nets, but I found that a ``3`` layer network continuously performed better. I also found that 1k layers performed best, but when I increased the amount of data I trained on I noticed that having more nodes actually improved performance. In the end I only had time to try submitting two. One that was a 3-layer 1k hidden node dbn using 100% of the data, which scored ``.6394``. The other was a 3-layer 1,250 hidden node dbn using 90% of the data with fewer epochs on each layer (I was crunched for time), which scored ``.6717``.

Given how much ensembling improved my first reasonable models score, I tried ensembling the sklearn model with the better performing dbn which lead to a score of ``.5651``. Then I looked at the predictions coming from both dbns and noticed they were a decent bit different, so I tried creating an ensemble that had the sklearn model with both dbns. This lead to my final and best score, ``.5584``.

## Things I would have liked to have done

I had a difficult time determining feature importances, the main reason being that the models I was trying to use in sklearn to determine feature importance require dense vectors, and using 32bit python I was running into memory issues. The way I ended up getting a rough sense of importance was via the scores I was seeing during cross validation. If I did the competition again, I would more rigorously determine feature importances.

With my deep belief models I was seeing better scores with larger hidden layers, however pickling them to disk was failing (a common theme I personally experienced in this competition). I would have liked to resolve the pickling issue and train a model using hidden layers with 2k nodes.

Getting more visibility into my nets would've been extremely useful, but I didn't have much time to add the tools to do so. In the future I'd like to view the internal weights and biases, and I'd also like to see what features were actually being learned. With image recognition the hidden layers tend to reveal the visual patterns being learned, but since I was using text I didn't know the best way I could represent what was being learned. In the future I would like to try generating visible units from the hidden units and see which words were being activated. That's probably the best way to see the features being learned, but with thousands of hidden units it would be a slow process to examine them all to determine if there were repeat patterns. Another useful thing to see would be if hidden units are becoming co-dependent in which case [dropout](http://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf) would probably help, but alas I didn't have dropout implemented either.

I truly just scratched the surface on deep belief nets. With more time there are a lot of things I could have tried, and in the future I hope to get the time to do so.

## Things I found surprising

To be honest, I'm surprised that everyone's public and private leaderboard scores were so similar. I would've assumed that at least a handful of people would have overfit the data, but apparently that is not the case.

Two lesser models when combined into an ensemble can be powerful. The jump of over ``.1`` when combining the logistic regressor and random forest really caught me by surprise.

The performance of the deep belief networks on my gpu was pretty amazing. I'm not sure if it's really something surprising, but I was able to crunch a ~30k x 1k matrix over 60k samples in about 12 minutes per epoch. 1k x 1k matrix computations took about 2 minutes per epoch, which occurred in the intermediate hidden layers. This speedup allowed me to do hyperparameter searching in a reasonable time frame, although I did so using only 5% of the data.

## Competition lessons learned

1. Don't defeat yourself. My first several submissions were not very good. I actually laughed at my first submission, a score north of ``25`` due to an issue in how I was generating my submission file. Even after having fixed this I was still scoring in the ``1.5`` - ``2.0`` range and started doubting myself. The uphill climb in continuing the competition lead to the discovery of better models and a better understanding of the algorithms I was using, resulting in a great learning experience.
2. Ensembles are powerful. I've read this over and over, but I cannot stress how much my overall model improved by using an ensemble of models.
3. Create an initial rough timeline and game plan to keep focus. Even though my goal was primarily to learn, I think this is important and worth mentioning. This doesn't mean that you should cut something short because you set a budget and have exceeded it, but instead you should be cognizant of how you're allocating your time.

## For those who care

I've put the code for this [up on github](https://github.com/JesseBuesking/dd-bpfe). It's in rough shape, but if you're curious you can peruse it at your leisure.

## Thanks

I learned a lot, and it was fun. I'd like to thank **Education Resource Strategies** for sharing their dataset, and **DrivenData** for hosting the competition. Congratulations to everyone who participated. I look forward to seeing you on the leaderboard in future competitions.