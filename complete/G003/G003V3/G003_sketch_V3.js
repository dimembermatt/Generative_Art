/**
 * G003_sketch_V3.js.
 * Matthew Yu
 * Last Modified: 10/29/18
 *  Modified to show differentiation from V2
 * One of a series of sketches involving Generative Art.
 * Experiments with the Henon Strange Attractor.
 * http://mathworld.wolfram.com/HenonMap.html
 * http://www.complexification.net/gallery/machines/henonPhaseDeep/
 * http://paulbourke.net/fractals/henonphase/
 * The related equations are
 * X(n+1) = x(n) cos(a) - (Y(n) - X(n)^2 * sin(a))
 * Y(n+1) = x(n) sin(a) + (Y(n) - X(n)^2 * cos(a))
 */
let dim = 2500;
let numParticles = 2000;
let lifetime = 25;
let particles = [];
let a = 1.7831;
let e, f;
let r = 250, g = 0, bc = 250;
let colorSwitch = 0, sign = 1;
function setup() {
  cWidth = windowWidth * .9998;
  cHeight = windowHeight * .995;
  let cnv = createCanvas(cWidth, cHeight);
  for (let i = 0; i < numParticles; i++) {
    particles.push([random(-3, 3), random(-3, 3), [0, 0, bc], lifetime]);
  }
  e = cos(a);
  f = sin(a);
  background(0);
}
function draw() {
  //background(0, 0, 0, 2);
  for (particle of particles) {
    update(particle);
    particle[3] = particle[3] - 1;
    //draw
    stroke(map(particle[3], 0, lifetime, 255, 0), g, particle[2][2], 255);
    point(particle[0]*dim/450+cWidth/3, particle[1]*dim/450+cHeight/3);
  }
  let timer = lifetime;
  if (frameCount%timer=== 0) {
    g = (g + 2) % 256;
    //a += .005;
  }
}

function update(particle) {
  //update
  let oX = particle[0];
  let oY = particle[1];
  particle[0] = oX*e - (oY - oX*oX*f);
  particle[1] = oX*f + (oY - oX*oX*e);
  //particle[2][0] =
  if(particle[3] <= 0) {
    //regenerate if lifetime is exceeded
    particle[0] = random(-3, 3);
    particle[1] = random(-3, 3);
    particle[3] = lifetime;
    update(particle);
  }
}

function mouseClicked() {
  console.log("X:", mouseX);
  console.log("Y:", mouseY);
}
