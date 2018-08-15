/**
 * G003_sketch.js.
 * Matthew Yu
 * 8/6/18
 * One of a series of sketches involving Generative Art.
 * Experiments with the Henon Strange Attractor.
 * http://mathworld.wolfram.com/HenonMap.html
 * http://www.complexification.net/gallery/machines/henonPhaseDeep/
 * http://paulbourke.net/fractals/henonphase/
 * The related equations are:
 * xn+1 = xn cos(a) - (yn - xn2) sin(a)
 * yn+1 = xn sin(a) + (yn - xn2) cos(a)
 */
let dim = 1700;
let scale = .1;
let imScale = 10;
let numParticles = 12000;
let particles = [];
let a = -15;
let e, f;
function setup() {
  width = dim;//windowWidth * .9998;
  height = dim;//windowHeight * .995;
  let cnv = createCanvas(width, height);
  for (let i = 0; i < numParticles; i++) {
    particles.push([random(-width/2, width/2), random(-height/2, height/2), [random(0,255), random(0,255), random(0,255)], 5]);
  }
  e = cos(a);
  f = sin(a);
  background(0);
}
function draw() {
  for (particle of particles) {
    update(particle);
    particle[3] = particle[3] - 1;
    //draw
    //translate(5,5);
    //rotate(TWO_PI/16);
    stroke((frameCount/10)%256, ((frameCount/10)+256/3)%256, ((frameCount/10)+256*2/3)%256, 255);
    if(particle[0]/imScale+width/2<width && particle[0]/imScale+width/2>0 && particle[1]/imScale+height/2<height && particle[1]/imScale+height/2 > 0)
      point(particle[0]/imScale+width/2, particle[1]/imScale+height/2);
    // fill(particle[2]);
    // noStroke();
    // ellipse(particle[0], particle[1], 1, 1);
  }
  let timer = round(abs(a))*10;
  if(timer === 0)
    timer = 1;
  if (frameCount%timer=== 0) {
     //let adder = 1/(a*a);
     a += .1;
     e = cos(a);
     f = sin(a);
  }
  if (a > 15)
    noLoop();

}

function update(particle) {
  //update
  let oX = particle[0];
  let oY = particle[1];
  particle[0] = (oX*e - (oY - pow(oX, 2)*f))*scale;
  particle[1] = (oX*f + (oY - pow(oX, 2)*e))*scale;
  if(particle[3] <= 0) {
    //regenerate if lifetime is exceeded
    particle[0] = random(-width/2, width/2);
    particle[1] = random(-height/2, height/2);
    particle[3] = 5;
    update(particle);
  }
}
