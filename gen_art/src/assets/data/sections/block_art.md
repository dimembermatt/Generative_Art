# G005 - Block Art
##### November 19th, 2018

This program converts an image with a gradient across multiple surfaces, such as the sky, and turns the area into a solid color. The end result is "blocks" of color that match together, like puzzle pieces.

The inspiration for this program from the music videos of Jason Mraz's summer 2018 album, [Know](https://www.youtube.com/watch?v=BpVzXWdJBq0&index=5&list=PLAHwrrBPBeO44MBUiF4eHjvIkCztQfGri).

The program works by sectioning an image by the color gradient across each pixel. If the color gradient is larger than a threshold, then a new object is created. The algorithm used for this is also used for object detection for computer vision, called [connected components](https://www.youtube.com/watch?v=hMIrQdX4BkE&t=11s).

The specific algorithm written for this program is as follows:

**Code here**

This part of the program, encapsulated into a **connected components** function, is followed by a postprocessing image coloring function. This **coloring** function updates the image (through P5.js's Pixel array) by taking the first pixel's color of an object and setting that as the color for every pixel part of that object. This essentially flattens the gradient across the image.

**Code also here**

This is a pretty short function, right?

The trick to this function is to have a helper function, **searchRef**, that looks through the equivalency list data structure and finds the smallest object ID that the input ID matches.

![Equivalency List.](Equivalency_List.png)

This image is a pretty good representation of the objects identified in the connected component algorithm and searched in the searchRef function. A new object is created with an ID, and if there are no matching neighbors (left and top) then its equivalent ID is congruent.

But if there is two matching neighbors, the lower ID of the two becomes the equivalent ID and the higher one is the ID of the pixel.

This is important because instead of merging the two similar objects at the time they are found (which isn't very efficient but easier to code) we want to be able to do a final pass after building the equivalency list. Making the higher ID be the ID of the pixel means all related pixels of the higher ID will be congruent to the lower ID when looking through searchRef.

For the table above, this means that 5 = 4 = 2, with 2 being the base ID. Three objects are being merged here! The final color for all pixels of the IDs 5, 4, and 2 will be white.

Here are some of the results that I've made!

Under Construction ...
