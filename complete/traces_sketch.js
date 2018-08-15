/**
 * traces_sketch.js.
 * Matthew Yu
 * 7/30/18
 * named after Spin_Body objects with a translucent background creating wax traces.
 * used in conjunction with Spin_Bodies.js.
 */
let balls = [];
let bounds = [0, 0];
let count = 0;
let rgb = [0,0,0, 0]; //last is modifier state


function setup() {
  bounds[0] = width = windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  var cnv = createCanvas(width, height);
  background(0);
}

function draw() {
  //balls init
  if(count === 10) {
    if(balls.length <= 250)
      balls.push(new Spin_Body("x", width/2, height/2, 0, 0, random(-.1, .1), random(-.1, .1), random(10, 20), 50));
  }
  count = (count+1)%11;

  //bg change
  if(rgb[3] < 100 && count === 10) {
    rgb[0] = random(0, 255);
  } else if(rgb[3] >= 100 && rgb[3] < 200 && count === 10) {
    rgb[1] = random(0, 255);
  } else if(rgb[3] >= 200 && rgb[3] < 300 && count === 10){
    rgb[2] = random(0, 255);
  }
  background(rgb[0], rgb[1], rgb[2], 5);
  rgb[3] = (rgb[3] + 1) % 300;

  //main loop
  for(ball of balls) {
    ball.update();
    ball.show();
  }
}

function windowResized() {
  bounds[0] = width =  windowWidth * .9998;
  bounds[1] = height = windowHeight * .995;
  resizeCanvas(width, height);
}
