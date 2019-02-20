/**
 * G003_sketch_V4.js.
 * Matthew Yu
 * Last Modified: 1/2/19
 * Implementing standard map chaos model
 * One of a series of sketches involving Generative Art.
 * https://en.wikipedia.org/wiki/Standard_map
 * https://en.wikipedia.org/wiki/Kicked_rotator
 * The related equations are
 * Y(n+1) = Y(n) + Ksin(X(n)) where Y represents p (momentum) mod TWO_PI
 * X(n+1) = X(n) + Y(n+1) mod TWO_PI
 */
let numParticles = 4000;
let lifetime = 50;
let particles = [];
let k = .971635;
let r = 250, g = 0, b = 127, a = 255;

function setup() {
  cWidth = 2048;//windowWidth * .9998;
  cHeight = 1536;//windowHeight * .995;
  let cnv = createCanvas(cWidth, cHeight);
  for (let i = 0; i < numParticles; i++) {
    particles.push([random(0, TWO_PI), random(-PI/2, PI/2), lifetime]);
  }
  background(0);
}

function draw() {
  background(0, 0, 0, 5);
  for (particle of particles) {
    update(particle);
    particle[2] = particle[2] - 1;
    //draw
    stroke(map(particle[2], 0, lifetime, 255, 0), g, b, a);
    point(particle[0]*250+cWidth/8, particle[1]*200+cHeight/2, .1, .1);
  }
  let timer = lifetime;
  if (frameCount%timer == 0) {
    g = (g + 2) % 256;
    b = (b + 2) % 256;
    // k = (k+.1)%10;
  }
}

function update(particle) {
  //update
  let oX = particle[0];
  let oY = particle[1];
  particle[1] = (oY + k*sin(oX))%(TWO_PI);
  particle[0] = (oX + particle[1])%(TWO_PI);

  if(particle[0] <= 0 || particle[0] > TWO_PI || particle[1] < -PI || particle[1] > PI) {
    //regenerate if lifetime is exceeded
    particle[0] = random(0, PI);
    particle[1] = random(-PI/2, PI/2);
    particle[2] = lifetime;
    update(particle);
  }
}

function mouseClicked() {
  console.log("X:", mouseX);
  console.log("Y:", mouseY);
  console.log("K:", k);
}
