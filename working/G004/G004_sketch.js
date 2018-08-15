/**
 * G004_sketch.js.
 * Matthew Yu
 * 8/10/18
 * One of a series of sketches involving Generative Art.
 * Failed experiment to warp the surface of a sphere with Perlin noise
 * to create terrain.
 * Laggy, slow, low quality - needs a better quality computer than the toaster
 * I'll ever have.
 * Next attempt is to generate in python.
 */
let total = 50;
let globe;
let first = true;

function setup() {
  createCanvas(400, 400, WEBGL);
  globe = create2dArray(total+1, total+1);
  //draw sphere
  let radius = 100;
  for (let i = 0; i < total+1; i++) {
    let lat = map(i, 0, total, 0, PI);
    for (let j = 0; j < total+1; j++) {
      let lon = map(j, 0, total, 0, TWO_PI);
      let x = radius * sin(lat) * cos(lon);
      let y = radius * sin(lat) * sin(lon);
      let z = radius * cos(lat);
      globe[i][j] = new Vector(x, y, z);
    }
  }
}

function draw() {
  background(0, 0, 0, 250);
  //rotateX(millis()/2000);
  orbitControl();

  for (let i = 0; i < total; i++) {
    let hu = map(i, 0, total, 0, 255*6);
    fill(hu  % 255, noise(frameCount/100)*255, noise(frameCount+i/100)*255);
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total+1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}

function mouseClicked() {
  for (let i = 0; i < total+1; i++) {
    for (let j = 0; j < total+1; j++) {
      let v1 = globe[i][j];
      globe[i][j] = new Vector(v1.x, v1.y, v1.z + noise(((frameCount+j+i)/10) %TWO_PI)*15-7.5);
    }
  }
}

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function create2dArray(columns, rows) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
