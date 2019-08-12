# G002 - Grids
##### October 26th, 2018

There's a lot of Generative Art ideas you can do with grids. Cellular Automata can spawn from cells, pixels can be flashing random colors, and structures can be grown from arbitrary points, to name a few. This program focuses on the intersections of a visual grid, and mutating them (often to the point that the grid is unrecognizable).

To start with, I made a set of nodes corresponding to each intersection in the grid. I can connect them together by lines to make a real grid, and sans a couple edge cases we end up with this:

![Grid 0.](Grid_0.png)

Next I added an offset to each node, such that each point becomes slightly out of place. I check it against the neighboring nodes to make sure it doesn't go past them, but they roam around pretty freely.

I do that for each frame, and add color to each polygon drawn between four nodes. These nodes that form each shape will always be the same, but their positions won't, so I get a slightly interesting result:

![Grid 1.](Grid_1.png)

Over time, they do overlap somewhat, which makes the polygon they corner a little darker than the others.

![Grid 2.](Grid_2.png)

As a side note, the top right and bottom left edges don't have a shape attached to them. This is partially because I didn't add an edge case for them, which underscores the importance about edge cases and testing. For real world systems and products, edge cases are abundant, and although you might not think of them, they are bound to pop up and cause errors (and migraines). Therefore it's pretty important to test your system thoroughly and completely.

Now, this end result is a bit boring. So what I decided to do next is to randomly select a set of nodes across the grid and use that to draw a bigger, overlapping shape. The number of vertices or nodes for each shape vary between certain numbers, and therefore the span of the shape could be very large. In addition, the nodes are picked *at random* and stored *in order*, so the shape can double back across itself and split into several connected shapes.

Here's the result:

![Grid 3.](Grid_3.png)

I allowed the lines between the nodes to continue to exist at every frame,but removed the fill color. So eventually over time the shapes become a nice background shade of grey.

![Grid 4.](Grid_4.png)
