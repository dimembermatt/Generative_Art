# G005 - Block Art
#### November 19th, 2018

![Self](./images/block_art/self.png)

This program converts an image with a gradient across multiple surfaces, such as the sky, and turns the area into a solid color. The end result is "blocks" of color that match together, like puzzle pieces.

The inspiration for this program from the music videos of Jason Mraz's summer 2018 album, [Know](https://www.youtube.com/watch?v=BpVzXWdJBq0&index=5&list=PLAHwrrBPBeO44MBUiF4eHjvIkCztQfGri).

The program works by sectioning an image by the color gradient across each pixel. If the color gradient is larger than a threshold, then a new object is created. The algorithm used for this is also used for object detection for computer vision, called [connected components](https://www.youtube.com/watch?v=hMIrQdX4BkE&t=11s).

The specific algorithm written for this program is as follows:

<iframe
  src="https://carbon.now.sh/embed/?bg=rgba(249%2C249%2C249%2C0)&t=material&wt=none&l=python&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=false&pv=56px&ph=56px&ln=true&fm=Fira%20Code&fs=18px&lh=164%25&si=false&es=4x&wm=false&code=for%2520a%2520pixel%2520in%2520the%2520image%2520(we%2520go%2520iteratively%252C%2520from%2520row%2520to%2520row)%253A%250A%2520%2520%2509check%2520the%2520top%2520and%2520left%2520adjacent%2520pixel%250A%2520%2520%2520%2520%2509if%2520variance%2520(of%2520neighbor%2520color)%2520%253E%2520threshold%253A%250A%2520%2520%2520%2520%2520%2520%2520%2520%2509if%2520left%2520neighbor%2520only%2520passes%253A%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2509set%2520pixel%2520id%2520as%2520left%2520pixel%2520id%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520if%2520top%2520neighbor%2520only%2520passes%253A%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2509%2509set%2520pixel%2520id%2520as%2520top%2520pixel%2520id%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520if%2520both%2520neighbors%2520pass%253A%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2509add%2520both%2520ids%2520to%2520an%2520equivalency%2520list%252Fcorrelation%2520map%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2509set%2520pixel%2520id%2520as%2520either%2520id%250A%2509%2509else%253A%250A%2520%2520%2520%2520%2520%2520%2520%2520%2509start%2520a%2520new%2520object%2520id"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

This part of the program, encapsulated into a **connected components** function, is followed by a postprocessing image coloring function. This **coloring** function updates the image (through P5.js's Pixel array) by taking the first pixel's color of an object and setting that as the color for every pixel part of that object. This essentially flattens the gradient across the image.

<iframe
  src="https://carbon.now.sh/embed/?bg=rgba(249%2C249%2C249%2C0)&t=material&wt=none&l=python&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=false&pv=56px&ph=56px&ln=true&fm=Fira%20Code&fs=18px&lh=164%25&si=false&es=4x&wm=false&code=for%2520pixel%2520in%2520the%2520image%253A%250A%2509get%2520the%2520pixel%2520id%250A%2509search%2520the%2520correlation%2520map%2520for%2520the%2520associated%2520base%2520id%2520and%2520color"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

This is a pretty short function, right?

The trick to this function is to have a helper function, **searchRef**, that looks through the equivalency list data structure and finds the smallest object ID that the input ID matches.

![Equivalency List.](./images/block_art/EquivalencyList.png)

This image is a pretty good representation of the objects identified in the connected component algorithm and searched in the searchRef function. A new object is created with an ID, and if there are no matching neighbors (left and top) then its equivalent ID is congruent.

But if there is two matching neighbors, the lower ID of the two becomes the equivalent ID and the higher one is the ID of the pixel.

This is important because instead of merging the two similar objects at the time they are found (which isn't very efficient but easier to code) we want to be able to do a final pass after building the equivalency list. Making the higher ID be the ID of the pixel means all related pixels of the higher ID will be congruent to the lower ID when looking through searchRef.

For the table above, this means that 5 = 4 = 2, with 2 being the base ID. Three objects are being merged here! The final color for all pixels of the IDs 5, 4, and 2 will be white.

Here are some of the results that I've made!

<!--G005 gallery-->
<div class="flex-container">
    <section>
        <button class="accordion"><h2>G005</h2></button>
        <div id="G005" class="panel"></div>
        <script>
            let G005Container = document.getElementById("G005");
            let G005Pictures = ["png", "pixelSchool", "pixelSchool2", "pixelTurtle",
                "pixelTurtle2", "talonflame", "talonflame2", "concorde", "arjunFace"];
            for (let i = 1; i < G005Pictures.length; i++) {
                let src = "images/block_art/" + G005Pictures[i] + "." + G005Pictures[0];
                let img = new Image();
                img.src = src;
                G005Container.appendChild(img);
            }
        </script>
    </section>
</div>

<!--expander for galleries-->
<script src="gallery-expander.js"></script>

The parameter that adjusts how objects are sectioned and made is the variance. As the variance increases, less objects are formed since fewer pixels break through the variance threshold to become a new object. Vice versa, we see more detail in the image as the variance decreases. Similarly, the runtime of the algorithm and coloring functions are proportional to the variance. As more objects are created, the coloring function specifically has to look through more equivalent IDs before it can reach the base ID.

Here is an image showing the image change as variability increases [5, 10, 15, 20, 30].

![launch2_sum](./images/block_art/launch2_sum.png)

You can see the image gradually being eroded away as variance increases, so it's best to keep variance low, to like 10 on high detail images. I expected better results though if it's for something like the puzzle heart in the youtube video I linked at the start.

### Version 3

One of the things I went back and fixed in version 3 of this program is a dedicated set() and get() method for the p5 Pixels array. The algorithms previously took up to an hour to do medium-large images, which was actually really terrible. The biggest reason for this is that P5JS's get and set methods for accessing the Pixel array are horribly bloated, which means directly accessing the array would increase your processing speed by at least a magnitude.

So after writing my own direct access methods I benchmarked the difference between the two and was very pleasantly surprised. For the Talonflame image in my G005 gallery above, a 275x287 image, here were the results:

* Before: 345.591s  | 1.621s
* After:  1.388s    | 2.234s

The two differing values for each test being the correlated components and coloring function, respectively.

I experienced a near 340x increase in speed! Now I'm able to run images like the SpaceX rocket launch photo above in a matter of minutes at 960x636 pixels rather than a matter of hours.

I'm currently considering more optimization fixes and algorithm changes to tweak the performance and results of this program.

* Before running the color function, I want to run a function that runs through the equivalency list and updates all equivalent IDs to the base ID beforehand. This way every pixel doesn't have to recurse to the base ID when determining its color.
* Instead of running a connected components algorithm, I want to instead find objects using DBSCAN, which is an improved K means clustering algorithm. DBSCAN uses a density and a ball radius parameter, with which it uses to find all the related pixels within a nearby circle and thresholds it to the density in order to determine whether it is part of an object or not.

The DBSCAN suggestion is specifically based on my work on DBSCAN algorithm implementation for UT's IEEE RAS Region V committee, which is currently building an autonomous robot for a Mars Rover challenge. I was very surprised when I realized that connected components was a radius 1 simplified implementation of DBSCAN, and am I currently thinking of implementing a equivalency list/correlation map to speed up the algorithm. You can find more about our project [here](https://github.com/ut-ras/r5-2019/tree/vision/db_scan/DB_scan).

If you have any suggestions, please feel free to contact me!

### Version 4
#### 11/20/18

In preparation for optimizing Region V's DBSCAN using a correlation map and a post processing pass, I went and implemented a new function for this program which flattens the equivalency list before handing it to the coloring function. Essentially, what I did was run through each ID in the equivalency list, matched it to the base ID, and directly connected it to the base ID. This way, I don't have to run each pixel recursively to find the base ID.

Here are the results of the optimizations: (960x636 image at 10 variance, equivalence list length: 110,721)

| Version   | Compiling     | Flattening    | Coloring  | Detail                                    |
| --------- | ------------- | ------------- | --------- | ----------------------------------------- |
| 2         | ~350xV3       | N/A           | ~160s     | First Working Version                     |
| 3         | 50.839s       | N/A           | 167.579s  | Dedicated set() and get()                 |
| 4.1       | 53.936s       | 55.492s       | 97.3ms    | Flattening the Equivalency List           |
| 4.2       | 42.691s       | 11.860s       | 96.7ms    | Ignoring Shallow Equivalencies (1 == 1)   |

Of course, these are all approximate times and may vary wildly depending on how much resource your computer allocates to it, but having a ~350 increase in algorithm efficiency and a >10x increase in coloring (flattening and coloring) efficiency means that my optimizations have reduced the amount of time to process the image from hours to mere minutes.

Confirming the efficacy of these results means that I intend to apply what I've learned here to DBSCAN for our Region V computer vision process. We will be analyzing tens of thousands of frames of images in succession with this process, which means that the optimization gains here will be extremely useful.
