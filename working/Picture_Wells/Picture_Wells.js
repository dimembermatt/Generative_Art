/**
 * Picture_Wells.js
 * Matthew Yu
 * 11/2/19
 * One of a series of sketches involving Generative Art.
 * 
 * Algorithm:
 * Take an image and convert it into grayscale.
 * Build an image matrix that holds particles corresponding to the depth of the color:
 *  Particles move from lighter colored pixels to darker colored pixels.
 */

 // modify these variables
 let imgName = "arjun";
 let imgExtension = "jpg";
 var depthLimit = 10;
 var particleLimit = 5000;

 // do not modify
 var img;

 function create2dArray(columns, rows) {
    var arr = new Array(columns);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

 function preload() {
    img = loadImage(imgName + "." + imgExtension);
 }

 var well;
 function setup() {
    createCanvas(img.width, img.height);
    imageMode(CENTER);
    noStroke();
    background(255);
    image(img, img.width/2, img.height/2);
    filter(GRAY)
    loadPixels();

    // get density field
    let idx = 0;

    well = create2dArray(img.width, img.height);

    pixels.forEach(function (pixel){
        well[idx%img.width][floor(idx/img.height)] = {Limit: floor(pixel*depthLimit/255), PList: []};
        idx++;
    });

    // generate particles
    for(let i = 0; i < particleLimit; i++) {
        let x = floor(random(img.width));
        let y = floor(random(img.height));
        while(well[x][y].PList.length >= well[x][y].Limit) {
            x = floor(random(img.width));
            y = floor(random(img.height));
        }
        well[x][y].PList.push(i);

    }


 }

 function draw() {
    // move all filled points one timestep
    moveList = [];
    for(let y = 0; y < img.height; y++) {
        for(let x = 0; x < img.width; x++) {
            for(let p = 0; p < well[x][y].PList.length; p++) {
                // look at 8 edges
                // if one edge is deeper, move there

            }
        }
    }

    // draw all filled points
    stroke('black'); // Change the color
    strokeWeight(1); // Make the points 10 pixels in size
    for(let y = 0; y < img.height; y++) {
        for(let x = 0; x < img.width; x++) {
            if(well[x][y].PList.length > 0)
                point(x, y);
        }
    }
 }
