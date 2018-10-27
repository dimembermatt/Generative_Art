/**
 * noisy_sketch.js.
 * Matthew Yu
 * 8/2/18
 * warps graphics based on noise and average color
 */
let d;
let r=0, g=0, b=0;
let n = 0;
let threshold = 255;
let noiseIdx;
let iteration = 0;
let canvas;
let blockIdx = 0;
let colorPickerR = 0;
let colorPickerG = 0;
let colorPickerB = 0;
let name = "ahmad";
let extension = ".png";
let cnv;

function preload() {
  img = loadImage(name + extension);
}

function setup() {
  let width, height;
  if(img.width > 2000) {
    width = 2000;
  } else {
    width = img.width;
  }
  if(img.height > 1333) {
    height = 1333;
  } else {
    height = img.height;
  }
  cnv = createCanvas(width, height);

  background(255);
  image(img, 0,0);

  d = pixelDensity();
  noiseIdx = random(0, 10000);
  canvas = 4 * (width * d) * (height* d);
 }

function draw() {
  if (iteration === 0) {
    for (let i = 0; i < canvas; i += 4) {
      r += pixels[i];
      g += pixels[i+1];
      b += pixels[i+2];
      n++;
    }
    threshold = (r+g+b)/n/3;
  }
  r = 0;
  g = 0;
  b = 0;
  n = 0;
  loadPixels();
  for (let i = 0; i < canvas; i += 4) {
    if (i/(d*width/(width/25)) == blockIdx) {  // divide by 100 for rowish, 19,25 for splotchy
      colorPickerR = noise(noiseIdx) * 255;
      colorPickerG = noise(noiseIdx+150) * 255;
      colorPickerB = noise(noiseIdx+300) * 255;
      blockIdx += 1;
      noiseIdx += .01;
    }

    if(pixels[i] > threshold) {
      pixels[i] = (pixels[i]+colorPickerR)%256;
    }
    if(pixels[i+1] > threshold) {
      pixels[i+1] = (pixels[i+1]+colorPickerG)%256;
    }
    if(pixels[i+2] > threshold) {
      pixels[i+2] = (pixels[i+2]+colorPickerB)%256;
    }
    //prepare to set threshold for next iteration
    r += pixels[i];
    g += pixels[i+1];
    b += pixels[i+2];
    n++;
  }
  blockIdx = 0;
  updatePixels();
  threshold = (r+g+b)/n/3;
  iteration++;
  if (iteration === 3)
    noLoop();
}
let pressed = false;
function mouseClicked() {
  if (pressed === false) {
    noLoop();
    pressed = true;
  } else {
    loop();
    pressed = false;
  }
}
