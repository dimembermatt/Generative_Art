/**
 * perlin_noise_flowfield.js.
 * Matthew Yu
 * 8/1/18
 * named after Flow_Body objects that are accelerated by an external field of vectors
 * dictated by a Perlin noise field.
 * used in conjunction with Flow_Bodies.js.
 */
let incr = .01;
let scale;
let width, height;
let cols, rows;
let zoff = 0;
let particle = [];
let vectorMap;

function setup() {
  scale = 30;
  width = windowWidth * .9998;
  height = windowHeight * .995;
  let cnv = createCanvas(width, height);
  cols  = ceil(width/scale);
  rows = ceil(height/scale);
  vectorMap = create2dArray(cols, rows);
  for (let i = 0; i < 500; i++) {
    particle[i] = new Flow_Body([random(0, (cols-1)*scale), random(0, (rows-1)*scale)], [0, 0], [0, 0], [width/cols/4, height/rows/4]);
  }
}

function draw() {
  background(255,255,255,.1);
  let xoff = 0;
  for (let x = 0; x < cols; x++) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI*5;
      let v = p5.Vector.fromAngle(angle);
      yoff += .08;
      //grab color values
      let R = map(v.x, -1, 1, 0, 255);
      let G = map(v.y, -1, 1, 0, 255);
      let B = map(v.z, -1, 1, 0, 255);
      //add to vector map
      vectorMap[x][y] = [v, [R, G, B, 255]];

      //display vectors
      stroke(R, G, B, 50);
      strokeWeight(2);
      push();
      translate(x * scale, y * scale);
      rotate(v.heading());
      line(0, 0, scale, 0);
      pop();
    }
    xoff += .08;
    zoff += .0001;
  }

  //add acceleration for each particle
  for (obj of particle) {
    col = Math.round(map(obj.location[0], 0, width, 0, cols-1));
    row = Math.round(map(obj.location[1], 0, height, 0, rows-1));
    //see hitboxes
    //stroke(0);
    //rect(obj.location[0], obj.location[1], 20, 20);
    //rect(col*scale, row*scale, 20, 20);
    //change color to situation obj.changeColor(vectorMap[col][row][1]);
    obj.update();
    obj.show();
    obj.applyForce(
      [vectorMap[col][row][0].x,
      vectorMap[col][row][0].y]
    );
  }
}

function windowResized() {
  scale = 30;
  width =  windowWidth * .9998;
  height = windowHeight * .995;
  resizeCanvas(width, height);
  cols  = floor(width/scale);
  rows = floor(height/scale);
  vectorMap = create2dArray(cols, rows);
}

function create2dArray(columns, rows) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
