# G001 - Layered Nodes
##### October 26th, 2018

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

Under Construction...
