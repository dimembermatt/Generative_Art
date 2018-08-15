/**
 * pointless_sketch.js.
 * Matthew Yu
 * 7/30/18
 * named after Spin_Body objects creating a pointilist picture.
 * used in conjunction with Spin_Bodies.js.
 */
let balls = [];
let bounds = [0, 0];
let count = 0;

function setup() {
  bounds[0] = width = windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  var cnv = createCanvas(width, height);
  background(0);
}

function draw() {
  if(count === 10) {
    if(balls.length <= 25)
      balls.push(new Spin_Body("x", width/2, height/2, 0, 0, random(-1, 1), random(-1, 1), random(10, 20), 50));
  }
  for(ball of balls) {
    ball.update();
    ball.show();
  }
  count = (count+1)%11;
}

function windowResized() {
  bounds[0] = width =  windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  resizeCanvas(width, height);
  background(0);
}
