/**
 * G003_sketch_V2.js.
 * Matthew Yu
 * 8/7/18
 * One of a series of sketches involving Generative Art.
 * Experiments with the Henon Strange Attractor.
 * http://mathworld.wolfram.com/HenonMap.html
 * http://www.complexification.net/gallery/machines/henonPhaseDeep/
 * http://paulbourke.net/fractals/henonphase/
 * The related equations are
 * X(n+1) = 1 - aX(n)^2 + Y(n)
 * Y(n+1) = bX(n)
 */
let dim = 2500;
let numParticles = 2000;
let lifetime = 25;
let particles = [];
let a = .55;
let b = 1.01;
let r = 250, g = 0, bc = 250;
let colorSwitch = 0, sign = 1;
function setup() {
  cWidth = windowWidth * .9998;
  cHeight = windowHeight * .995;
  let cnv = createCanvas(cWidth, cHeight);
  for (let i = 0; i < numParticles; i++) {
    particles.push([random(-1, 1), 0, [0, 0, b], lifetime]);
  }
  // e = cos(a);
  // f = sin(a);
  background(0);
}
function draw() {
  //background(0, 0, 0, 2);
  for (particle of particles) {
    update(particle);
    particle[3] = particle[3] - 1;
    //draw
    stroke(map(particle[3], 0, lifetime, 255, 0), g, particle[2][2], 255);
    point(particle[0]*dim/18+cWidth/2, particle[1]*dim/18+cHeight/2);
  }
  let timer = 25;
  if (frameCount%timer=== 0) {
  //let adder = 1/(a*a);
    g = (g + 2) % 256;
    // a += .1;
    // b += .2;
  }
}

function update(particle) {
  //update
  let oX = particle[0];
  let oY = particle[1];
  particle[0] = 1 - a*oX*oX + oY;
  particle[1] = b*oX;
  //particle[2][0] =
  if(particle[3] <= 0) {
    //regenerate if lifetime is exceeded
    particle[0] = random(-1, 1);
    particle[1] = 0;
    particle[3] = lifetime;
    update(particle);
  }
}

function mouseClicked() {
  console.log("X:", mouseX);
  console.log("Y:", mouseY);
}
