/**
 * G006_sketch.js.
 * Matthew Yu
 * 8/11/18
 * One of a series of sketches involving Generative Art.
 * Basic copy off https://p5js.org/examples/image-pointillism.html
 * by Dan Shiffman and repurposed
 */
//modify these variables
let name = "arjun";
let extension = ".jpg";
var pointSize = 6;

//do not modify
var img;

function preload() {
  img = loadImage(name + extension);
}

function setup() {
  createCanvas(img.width, img.height);
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}

function draw() {
  for (let i = 0; i < 15; i++) {
    var x = floor(random(img.width));
    var y = floor(random(img.height));
    var pix = img.get(x, y);
    fill(pix, 128);
    if (round(random(0, 1))) {
      ellipse(x, y, pointSize, pointSize);
    } else {
      rect(x-pointSize/2, y-pointSize/2, pointSize, pointSize);
    }
  }
}
