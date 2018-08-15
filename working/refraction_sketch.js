/**
 * refraction_sketch.js.
 * Matthew Yu
 * 8/2/18
 * named after Refraction_Body objects that act as a "lens" for particles, namely
 * the pixels of the canvas, to warp with.
 * used in conjunction with Refraction_Bodies.js.
 */
function setup() {
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
}

function create2dArray(columns, rows) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
