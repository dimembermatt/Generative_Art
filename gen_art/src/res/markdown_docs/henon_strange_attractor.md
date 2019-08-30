<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML' async></script>

# G003 - Henon Strange Attractor
#### January 2nd, 2019

Henon Strange Attractor is a particularly prominent example of chaos theory, where slightly different initial conditions can cause a vast difference in result. I was delighted when I stumbled over the Henon Phase diagrams of [Paul Bourke](http://paulbourke.net/fractals/henonphase/) and [Jared Tarbell](http://www.complexification.net/gallery/machines/henonPhaseDeep/).

So I decided to make my own.

![ridges](./henon_strange_attractor/V1/ridges.png)

The first iteration of this program uses the equations:

<script type="math/tex">x_{n+1} = x_n \cos{a} - (y_n - (x_{n2}^2)) \sin{a}</script>

<script type="math/tex">y_{n+1} = x_n \sin{a} + (y_n - (x_{n2}^2)) \cos{a}</script>

The general control flow is:

* Create *n* amount of particles, each with a random position and add them all to a set H.
* For an alpha a (the working version currently uses -15, but feel free to experiment), calculate cos(a) and sin(a).
* For each particle, update their position with the equations. If their position extends beyond the canvas, reset their position.

The following is my initial result, after coloring the particles after x amount rounds and making it that a increases by a linear amount every couple rounds. There is an issue of drawing the full shape of the pixel image within the canvas size, so I also added a scaling factor (in this case, .1) to shrink the resultant image.

![colorBurst](./henon_strange_attractor/V1/colorBurst.png)

Colorful, but not very interesting. After tinkering with alpha values a bit more, I started coming out with images such as Ridges at the top of this section and Dispersion below.

![dispersion](./henon_strange_attractor/V1/dispersion.png)

An interesting artefact of my process, by randomizing the color of each pixel and rotating/shifting the general position of the shape every couple rounds, is the separation of particles into discrete sections sorted by color. The color sections don't seem to have any pattern in which they are sorted, which makes the phenomenon even more intriguing.

### Version 2
#### 8/7/18

So V1 looks nice, but it wasn't quite what I was looking for. So instead I experimented with another set of functions for V2,

<script type="math/tex">x_{n+1} = 1 - a*x(n)^2 + x(n)</script>

<script type="math/tex">y_{n+1} = b*x(n)</script>

A little simpler, and hopefully with better results.

I used the same process for V1, but instead of checking if the particle drops off the canvas, I gave each particle a lifetime and replaced them every time they die.

![shell](./henon_strange_attractor/V2/shell.png)

And tada! We're getting a pattern here! If we zoom out and let the program simmer for a couple minutes..

![bouquet](./henon_strange_attractor/V2/bouquet.png)

The initial values are a(.2) and b(1.01). After experimenting with it, here are the visual differences when a and b are altered to the below values.

![a_2b_93](./henon_strange_attractor/a_2b_93.png)
![a_2b_97](./henon_strange_attractor/a_2b_97.png)
![a_2b1_01](./henon_strange_attractor/a_2b1_01.png)
![a_2b1_1](./henon_strange_attractor/a_2b1_1.png)
![a_17b1_01](./henon_strange_attractor/a_17b1_01.png)
![a_4b1_01](./henon_strange_attractor/a_4b1_01.png)

After experimenting a lot more with those values, I came up with some more interesting results. They are in the gallery at the bottom.

### Version 3
#### 10/29/18

I went back and tried the same equations with V1 again, using the lessons I've learned from V2 to better bound the object and get it to display, but unfortunately this was the best result I could get.

![001](./henon_strange_attractor/V3/001.png)
![flowerPetal](./henon_strange_attractor/V3/flowerPetal.png)

It's a little more interesting, and definitely more in line with what I expected V1 to be, but definitely not what Tarbell or Bourke have created. A couple sources of error might be the scale that I'm on. It's possible that (judging from Bourke's source code for *Henon Phase Deep*) I may be a scale of 10^2 off from the size of the world that these particles move in.

### Version 4
#### 1/2/19

This update plays with the Standard map, or the Chirikov standard map. I was looking into chaotic systems to model chaotic mixing and stumbled onto kicked rotators, which led me to the Standard map.

![Chirikov Standard Map](./henon_strange_attractor/V4/chirikov_standard_map.png)

The full gallery for these images are below, and runnable JS example
can be found [here](./res/G003/page/G003_V4.html).

The really interesting thing that occurred while adjusting the parameters for this program is the range of maps under different bounds. For example, the first image in this update is bounded to p:{-PI, PI}, x:{0, 2 PI}. However, images like the first two in the gallery share a very strong symmetry when unbounded. There's a somewhat obvious dividing line across the center and a less obvious one diagonally (this shows up quite early while iterating across the K constant; the maps are split along the diagonal and slowly connect as K increases). This underscores the importance of bounding conditions when looking for a solution, which gives me another insight into why my Henon maps aren't looking up to par.

Below is a very tall image of the unbounded standard map (P is not modded by 2 PI and is no longer periodic). The diagonal symmetry axis is very evident at the top, and as you go down the image, you can see the very order structure eventually collapsing into noise and chaos.

![02](./henon_strange_attractor/V4/02.png)

### V5
#### 3/21/19

This update is less of an exploration of more chaos theory and more of a demonstration of a port of the previous update into C++ using OpenFrameworks. The expectation was to achieve higher speed and greater quality than P5JS, and the results were mixed to say the least.

![standardMap1](./henon_strange_attractor/V5/standardMap1.png)

Above is the one of the first satisfactory images produced from the C++ port. While there appears to be satisfactory quality in the image, the time needed to produce the image compared to that of the JS sketch was larger by order of magnitudes. In addition, the C++ version produced artefacts in the process that are particularly visible radially from the center eye. These distortions mar the quality of the image.

However, an acceptable advantage of the C++ port is that it reduces a shimmering effect in the JS sketch that tends to visually hide features in the image. By allowing the program to layer hundreds of exposures in the image, high resolution features begin to stand out.

With a little more tweaking (read: hours more), the program created this very nice picture after about 9 hours and 60 thousand exposures.

![standardMap4](./henon_strange_attractor/V5/standardMap4.png)

This program was massively sped up by using an array instead of
a vector/array list. Some function calls, such as ofSetColor() were reduced by running each particle individually n times (I set n to be the lifetime of each particle) before moving to the next particle in the generation, and removing extraneous color change instructions.

I also replaced the drawing buffer by drawing into an fbo (another renderer), and then drawing all the changes at once to the screen at the end of each generation. I also got rid of the artefacts by adding a random offset when drawing each particle. The image now looks much cleaner as a result (to this day, I'm still not sure why this works).

An interesting thing to note is that the colors of each particle were decided based on each particle's initial conditions; a closer look into the minute details of the picture reveals cohesive and distinct groupings of color.

With a sufficiently powerful machine, is it possible that even
more detail is hidden within the noise?
