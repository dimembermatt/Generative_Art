/**
 * hungry_sketch.js.
 * Matthew Yu
 * 8/4/18
 * named after Hungry_Body objects that move randomly across the canvas,
 * "eating" pixels and growing in length based on their consumption.
 * used in conjunction with Hungry_Bodies.js.
 */
let organisms = [];
let bounds = [0, 0];
let count = 0;
let d, canvas;
let virtualCanvas;
let counter = 0;
let name = "nebula3";
let extension = ".jpg";
function preload() {
  img = loadImage(name + extension);
}

function setup() {
  let width, height;
  if(img.width > 1500) {
    width = 1500;
  } else {
    width = img.width;
  }
  if(img.height > 700) {
    height = 700;
  } else {
    height = img.height;
  }
  bounds[0] = width;//windowWidth * .9998;
  bounds[1] = height;//windowHeight * .995;

  d = pixelDensity();
  canvas = 4 * (width * d) * (height * d);
  var cnv = createCanvas(width, height);

  for (let i = 0; i < 50000; i++) {
    // let type = round(random(0,3));
    // if (type === 0) {
    //   organisms.push(new Hungry_Body(
    //     [[round(random(0,width)), round(random(0,height))]],//round(noise(i)*width), round(noise(i+150)*height)]],
    //     [round(random(-1,1)), round(random(-1,1))], 1,
    //     [noise(i)*255, 255, 255]
    //   ));
    // } else if (type === 1) {
    //   organisms.push(new Hungry_Body(
    //     [[round(random(0,width)), round(random(0,height))]],//round(noise(i)*width), round(noise(i+150)*height)]],
    //     [round(random(-1,1)), round(random(-1,1))], 1,
    //     [255, 255, noise(i+500)*255]
    //   ));
    // } else if (type === 2){
    //   organisms.push(new Hungry_Body(
    //     [[round(random(0,width)), round(random(0,height))]],//round(noise(i)*width), round(noise(i+150)*height)]],
    //     [round(random(-1,1)), round(random(-1,1))], 1,
    //     [255, noise(i+200)*255, 255]
    //   ));
    // } else {
      organisms.push(new Hungry_Body(
        [[round(random(0,width)), round(random(0,height))]],//round(noise(i)*width), round(noise(i+150)*height)]],
        [round(random(-1,1)), round(random(-1,1))], 1,
        [noise(i)*225+30, noise(i+200)*225+30, noise(i+500)*225+30]
      ));
    // }
  }
  image(img, 0,0);
  // loadPixels();
  // for (let i=0; i < canvas; i+=4) {
  //   pixels[i] = noise(i/10)*100 + 155;
  //   pixels[i+1] = noise((i+150)/10)*100 + 155;
  //   pixels[i+2] = noise((i+300)/10)*100 + 155;
  //   pixels[i+3] = 255;
  // }
  // updatePixels();
}

function draw() {
  pixels = virtualCanvas;
  updatePixels();
  loadPixels();
  for(organism of organisms) {
    let pixelRGB = organism.feed([
      pixels[(organism.location[0][0] + organism.location[0][1]*width)*4],
      pixels[(organism.location[0][0] + organism.location[0][1]*width)*4 + 1],
      pixels[(organism.location[0][0] + organism.location[0][1]*width)*4 + 2],
    ], 1);
    //change the pixels of the organism's current location to white
    pixels[(organism.location[0][0] + organism.location[0][1]*width)*4] = pixelRGB[0];
    pixels[(organism.location[0][0] + organism.location[0][1]*width)*4 + 1] = pixelRGB[1];
    pixels[(organism.location[0][0] + organism.location[0][1]*width)*4 + 2] = pixelRGB[2];
    pixels[(organism.location[0][0] + organism.location[0][1]*width)*4 + 3] = 255;

  }
  virtualCanvas = pixels;
  updatePixels();
  for(organism of organisms) {
    //move the current location forward
    organism.update();
    //display current location
    //organism.show();
    // stroke(0);
    // fill(0,0,0,0);
    // rect(organism.location[0][0]-5, organism.location[0][1]-5, 10, 10);
  }
  if(counter === 0)
    changeVelocity();
  counter = (counter + 1)%15;
}
function windowResized() {
  bounds[0] = width =  windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  resizeCanvas(width, height);
  background(255);
}
function changeVelocity() {
  for (organism of organisms) {
    let oVelocity = organism.speed;
    let nVelocity = [round(random(-1,1)), round(random(-1,1))];
    while (oVelocity === nVelocity || nVelocity === [0,0]) {
      nVelocity = [round(random(-1,1)), round(random(-1,1))];
    }
    organism.speed = nVelocity;
  }
}
