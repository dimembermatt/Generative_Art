/**
 * G007_sketch.js.
 * Matthew Yu
 * 8/12/18
 * One of a series of sketches involving Generative Art.
 * Simple sketch translating the Processing code from
 * "A Simple Model of the Belousov-Zharbotinsky Reaction From First Principles"
 * by Alasdair Turner. http://discovery.ucl.ac.uk/17241/1/17241.pdf
 * into P5.js.
 */
let a, b, c;
let p = 0; q = 1;

function setup() {
  createCanvas(350, 350);
  colorMode(HSB, 1, 1, 1, 1);
  a = create3dArray(width, height, 2);
  b = create3dArray(width, height, 2);
  c = create3dArray(width, height, 2);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      a[x][y][p] = random(0.0, 1.0);
      b[x][y][p] = random(0.0, 1.0);
      c[x][y][p] = random(0.0, 1.0);
      set(x , y, color(a[x][y][p], .9, .9));
    }
  }
  updatePixels();
}

function draw() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c_a = 0.0;
      let c_b = 0.0;
      let c_c = 0.0;
      for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
          c_a += a[(i+width)%width][(j+height)%height][p];
          c_b += b[(i+width)%width][(j+height)%height][p];
          c_c += c[(i+width)%width][(j+height)%height][p];
        }
      }
      c_a /= 9.0;
      c_b /= 9.0;
      c_c /= 9.0;
      a[x][y][q] = constrain(c_a + c_a * (c_b - c_c), 0, 1);
      b[x][y][q] = constrain(c_b + c_b * (c_c - c_a), 0, 1);
      c[x][y][q] = constrain(c_c + c_c * (c_a - c_b), 0, 1);
      set(x, y, color(a[x][y][q], .9, .9));
    }
  }
  updatePixels();
  if (p === 0) {
    p = 1;
    q = 0;
  } else {
    p = 0;
    q = 1;
  }
}

function mouseClicked() {
  //reset
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      a[x][y][p] = random(0.0, 1.0);
      b[x][y][p] = random(0.0, 1.0);
      c[x][y][p] = random(0.0, 1.0);
      set(x , y, color(a[x][y][p], .9, .9));
    }
  }
  updatePixels();
}

function create3dArray(columns, rows, depth) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(depth);
    }
  }
  return arr;
}
