<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML' async></script>

# G001 - Layered Nodes
#### October 26th, 2018

This program experiments with layered nodes and connecting nodes in a branching out circular pattern. Pretty simple.

Each node consists of a x and a y coordinate. It starts with a shape in the center, a set of nodes that are vertices to a polygon. Then for each vertice, <i>a</i> amount of nodes are connected to it. This occurs for up to <i>k</i> layers until your browser starts freezing, trying to process so many shapes. I've found that the program works decently smoothly up to around 1400 nodes, with the following settings.

 * n: base nodes = 7
 * a: number of nodes per node for successive layers = 3
 * k: number of layers = 6
 * r: radius of each layer = 60

The equation that models the number of nodes total is:

<script type="math/tex">\sum\limits_{i=1}^k n*a^{i-1}</script>

With the current parameters, I get 1456 nodes. If I add another layer, my nodes spike up to 4372.

I connected the nodes as triangulish polygons, with one node from the previous layer and a nodes from the current layer, and then filled them in with a random color using Perlin noise. My basic output would be something like this:

![Layered_Nodes_0](./images/layered_nodes/Layered_Nodes_0.PNG)

With more layers, you tend to see higher layers devolve into darkness since there is a larger node density despite the increased radius size. Therefore layers beyond 7 are probably not going to look very interesting.

![Layered_Nodes_1](./images/layered_nodes/Layered_Nodes_1.PNG)

So after drawing a static image, the next rational thing to do is to make it dynamic. So I added rotation for each layer, based on the framecount of the program.

![Layered_Nodes_2](./images/layered_nodes/Layered_Nodes_2.PNG)

Tada! A rotating eyeball! Let's add an offset to each layer (but just enough so it doesn't cause layers to come out of each other).

![Layered_Nodes_3](./images/layered_nodes/Layered_Nodes_3.PNG)

#### Additional things from this program:

The coordinates of each node are determined are generated from the *sine* and *cosine* functions. I used the following formulas:

<div align="center">
    <script type="math/tex">
        x=radius \times layer \times \cos{(\frac{2 \times \pi \times node}{Max Layer Nodes})}+xOffset
    </script>
</div>
<div align="center">
    <script style="align:center;" type="math/tex">
        y=radius \times layer \times \sin{(\frac{2 \times \pi \times node}{Max Layer Nodes})}+yOffset
    </script>
</div>

where I cycled through each node for each layer. Each node in a layer
was pushed to a set called a *nodeLayer*, and each nodeLayer was pushed into an all encompassing set *nodes*.

Creating these node sets enabled me to draw shapes based on their vertices and color them in, as well as make them spin, using p5's rotate() function.

Here's a gallery of some of the Generative Art I've created with this program.

<!--G001 gallery-->
<div class="flex-container">
    <section>
        <button class="accordion"><h2>G001</h2></button>
        <div id="G001Gallery" class="panel"></div>
        <script>
            let G001Container = document.getElementById("G001Gallery");
            let G001Pictures = ["png", "aligningMirors", "circleStructure", "eyeball", "mechanicalSun", "rotatingDrums"];
            for (let i = 1; i < G001Pictures.length; i++) {
                let src = "./images/layered_nodes/" + G001Pictures[i] + "." + G001Pictures[0];
                let img = new Image();
                img.src = src;
                G001Container.appendChild(img);
            }
        </script>
    </section>
</div>

<!--expander for galleries-->
<script src="gallery-expander.js"></script>
