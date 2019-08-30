# G007 - Belousov-Zharbotinsky Reactions
#### November 20th, 2018

![Reaction](./belousov_zharbotinsky/Belousov-Zharbotinsky_Reaction.png)

The Belousov-Zharbotinsky reactions is an interesting mathematical model of an oscillating chemical reaction. I've heard of it before, but until I saw this [video](https://www.youtube.com/watch?v=LL3kVtc-4vY) by NileRed on Youtube did I fully appreciate how mesmerizing it is.

This program is essentially a conversion of the Processing code by Alasdair Turner in his paper [*A Simple Model of the Belousov-Zharbotinsky Reaction From First Principles*](http://discovery.ucl.ac.uk/17241/1/17241.pdf) into a P5 sketch that I could run easily in my browser.

Coincidentally, the way this reaction works in code is remarkably like a cellular automata, another type of generative art I have been working with. A varying concentration of chemicals, chemical A, B, and C, are spread across each pixel in a canvas between the values 0 and 1. After this, for each successive pass over the image, the program looks at the surrounding pixels, adds up the total concentration of each chemical, and then uses that to quantify a new value for the current pixel.

What is particularly interesting about Turner's code is that he has a depth of two for each color, containing a p and a q variable. The total concentration is checked from p, and the new values are written into q. p and q are set to 0 and 1, respectively, at the start of the program. At the end of each pixel calculation, the following control statements are described:

![p and q](./belousov_zharbotinsky/p_and_q.png)

It seemed confusing at first: why would you change the pixel value right after you've modified it from the pixel calculation? What the program is *actually* doing is switching the index that the calculations are asking. And it's doing so for each pixel, which means the first pixel could be running on p values and the next one running on q values. It's a bit beyond me to grasp the full implications of how this works, but it does work, and it makes a pretty cool sight.

Here are some other images I've made while experimenting with the color scheme and modifying some values here and there to get this to work.
