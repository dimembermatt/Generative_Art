# G007 - Belousov-Zharbotinsky Reactions
#### November 20th, 2018

![Reaction](../images/belousov_zharbotinsky/Belousov-Zharbotinsky_Reaction.png)

The Belousov-Zharbotinsky reactions is an interesting mathematical model of an oscillating chemical reaction. I've heard of it before, but until I saw this [video](https://www.youtube.com/watch?v=LL3kVtc-4vY) by NileRed on Youtube did I fully appreciate how mesmerizing it is.

This program is essentially a conversion of the Processing code by Alasdair Turner in his paper [*A Simple Model of the Belousov-Zharbotinsky Reaction From First Principles*](http://discovery.ucl.ac.uk/17241/1/17241.pdf) into a P5 sketch that I could run easily in my browser.

Coincidentally, the way this reaction works in code is remarkably like a cellular automata, another type of generative art I have been working with. A varying concentration of chemicals, chemical A, B, and C, are spread across each pixel in a canvas between the values 0 and 1. After this, for each successive pass over the image, the program looks at the surrounding pixels, adds up the total concentration of each chemical, and then uses that to quantify a new value for the current pixel.

What is particularly interesting about Turner's code is that he has a depth of two for each color, containing a p and a q variable. The total concentration is checked from p, and the new values are written into q. p and q are set to 0 and 1, respectively, at the start of the program. At the end of each pixel calculation, the following control statements are described:

<iframe
  src="https://carbon.now.sh/embed/?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=oceanic-next&wt=none&l=text%2Fx-csrc&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=false&pv=56px&ph=56px&ln=true&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=if%2520(p%2520%253D%253D%25200)%2520%257B%250A%2520%2520p%2520%253D%25201%250A%2520%2520q%2520%253D%25200%250A%257D%2520else%2520%257B%250A%2520%2520p%2520%253D%25200%250A%2520%2520q%2520%253D%25201%250A%257D%250A"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

It seemed confusing at first: why would you change the pixel value right after you've modified it from the pixel calculation? What the program is *actually* doing is switching the index that the calculations are asking. And it's doing so for each pixel, which means the first pixel could be running on p values and the next one running on q values. It's a bit beyond me to grasp the full implications of how this works, but it does work, and it makes a pretty cool sight.

Here are some other images I've made while experimenting with the color scheme and modifying some values here and there to get this to work.

<!--G007 gallery-->
<div class="flex-container">
    <section>
      <button class="accordion"><h2>G007</h2></button>
      <div id="G007" class="panel"></div>
      <script>
        let G007Container = document.getElementById("G007");
        let G007Pictures = ["png", "amnioticFluid", "blue_and_red"];
        for (let i = 1; i < G007Pictures.length; i++) {
            let src = "./images/belousov_zharbotinsky/" + G007Pictures[i] + "." + G007Pictures[0];
            let img = new Image();
            img.src = src;
            G007Container.appendChild(img);
        }
      </script>
    </section>
</div>

<!--expander for galleries-->
<script src="gallery-expander.js"></script>