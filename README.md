# Journal++
A better way to journal. Project for Hack the 6ix.

## Overview
Finding the time to journal can be difficult, especially when one doesn't know how to face the wrath that is their own mind. It can often seem like a waste of time or an inconvenient task. Journal++ uses NLP and sentiment analysis to create an unstructured, smooth journalling experience. Whenever you're ready, Journal++ is prepared to interpret and unscramble your raw thoughts into key categories and sentiments to better help you visualize your patterns of emotions.

## How we built it
To do this, we leveraged a text classification model using Cohere's Generate API to break down, process, and categorize user input into lifestyle categories (e.g. career, interpersonal relationships). Then, the categorized text segments are analyzed by emotion using a custom-trained sentiment analysis model (that works really hard to make the right choices).

## Challenges we ran into
-> Tensorflow was mean
-> determination, grit, and perseverence
-> We kept pushing the django and virtual environment dependencies which caused thousands of merge conflicts as we compounded the number of times django was intalled on our devices 

## What we learned
-> To stop pushing the venv into github

## Accomplishments that we're proud of
-> Our homemade, made-with-love, TensorFlow model
-> Our determination, grit, and perseverence
-> Our adeptnesss at reinstalling all dependencies five times over
-> How much more comfortable we've gotten with web development since last hackathon
-> Not sleeping for 9 hours every single night (a particular challenge for Richard Miao)

## What's next for Journal++
-> An auto-generated weekly summary detailing the key events that were journalized that week, the user's stress points and general emotional outlook, etc. in order to facilitate further self-reflection

-> Fun background CSS animations with mouse interactions that can help users destress and procrastinate <3

## Built With
Languages: Python, Javascript
Framworks and Tools: React, Django, Tensorflow + Kaggle dataset (Emotion Classification), Cohere Generate API (Category Classifications)
