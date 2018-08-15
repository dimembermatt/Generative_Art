/**
 * orbits_sketch.js.
 * Matthew Yu
 * 7/31/18
 * named after Gravity_Body objects that trace around a fixed object of very large mass.
 * used in conjunction with Gravity_Bodies.js.
 */
let balls = [];
let bounds = [0, 0];
let count = 0;

function setup() {
  bounds[0] = width = windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  var cnv = createCanvas(width, height);
  balls.push(new Gravity_Body("Gravity Sink", width/2, height/2, 0, 0, 0, 0, 50, 10000, [255,255,255,255]));
  //balls.push(new Gravity_Body("Gravity Sink", width/2 + 300, height/2, 0, 0, 0, 0, 5, -10000, (255,255,255,255)));
  // for (let i = 0; i < 30; i++) {
  //   let size = random(10, 20);
  //   balls.push(new Gravity_Body(i, random(100, width-100), random(100, height-100), random(-3, 3), random(-3, 3), 0, 0, size, size*5))
  // }
}

function draw() {
  //balls init
  if(count === 10) {
    if(balls.length <= 30) {
      let size = random(10, 20);
      balls.push(new Gravity_Body('na', random(100, width-100), random(100, height-100), random(-3, 3), random(-3, 3), 0, 0, size, size*5))
    }
  }
  count = (count+1)%11;

  //main loop
  background(0,0,0,1);
  for (ball of balls) {
    for (other of balls) {
      if (ball != other)
        ball.applyForce(other);
    }
    ball.update();
    ball.show();
  }
}

function windowResized() {
  bounds[0] = width =  windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  resizeCanvas(width, height);
  background(0);
}
