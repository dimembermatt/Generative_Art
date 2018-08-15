/**
 * G005_sketch.js.
 * Matthew Yu
 * 8/10/18
 * One of a series of sketches involving Generative Art.
 * Using Connected Components algorithm, section areas of an input picture
 * and color each area a discrete color.
 */
//modify these variables
let name = "squareCircle2";
let extension = ".jpg";
let variance = 40;
//do not modify
let d;
let iteration = 0;
let canvas;
let vImage;

function preload() {
  img = loadImage(name + extension);
}

function setup() {
  let width, height;
  if(img.width > 2000) {
    width = 2000;
  } else {
    width = img.width;
  }
  if(img.height > 1333) {
    height = 1333;
  } else {
    height = img.height;
  }
  cnv = createCanvas(width, height);
  background(255);
  image(img, 0,0);

  d = pixelDensity();
  canvas = 4 * (width * d) * (height* d);
  vImage = create2dArray(height, width);
}

function draw() {
  noLoop();
}

function mouseClicked() {
  loadPixels();
  runAlgorithm(vImage);
  console.log("runAlgo complete.");
  updateColors(vImage);
  console.log("color complete.");
  updatePixels();
  iteration++;
  console.log(iteration);
}

let counter;
/**
 * @function runAlgorithm - runs connected component algorithm
 * @param arr - reference to array hold counters of objects
 * uses references to P5 pixels array to use algorithm
 * uses the @function merge.
 */
function runAlgorithm(arr) {
  counter = 0;
  let cColor;

  //run through each pixel
  //mark first pixel
  arr[0][0] = counter;
  counter++;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //console.log("row:" + (y+1) + " column:" + (x+1));
      //console.log("pixel:" + ((y*width+x)*4));
      //console.log("pixel color:" + get(x, y));
      let left;
      let above;
      let center = get(x, y);
      let diffL, diffA;
      if (y > 0) { //if not first row
        if(x > 0) { //if not first column
          left = get(x-1, y);
          above = get(x, y-1);
          diffL = [abs(center[0]-left[0]), abs(center[1]-left[1]), abs(center[2]-left[2])];
          diffA = [abs(center[0]-above[0]), abs(center[1]-above[1]), abs(center[2]-above[2])];
          let lDiff = (diffL[0] > variance || diffL[1] > variance || diffL[2] > variance);
          let aDiff = (diffA[0] > variance || diffA[1] > variance || diffA[2] > variance);
          //if different from both, label new object
          if (lDiff && aDiff) {
              arr[y][x] = counter;
              counter++;
          } else if (lDiff && !aDiff) { //if only above is similar
            arr[y][x] = arr[y-1][x];
          } else if (!lDiff && aDiff) { //if only left is similar
            arr[y][x] = arr[y][x-1];
          } else {
            merge(y, x, arr); //merge all cells towards the counter of the lower value
          }
        } else { //first column but not first pixel
          above = get(x, y-1);
          diffA = [abs(center[0]-above[0]), abs(center[1]-above[1]), abs(center[2]-above[2])];
          if (diffA[0] > variance || diffA[1] > variance || diffA[2] > variance) {
            arr[x][y] = counter;
            counter++;
          } else {
            arr[y][x] = arr[y-1][x];
          }
        }
      } else { //first row
        if (x > 0) { //not first pixel
          left = get(x-1, y);
          diffL = [abs(center[0]-left[0]), abs(center[1]-left[1]), abs(center[2]-left[2])];
          if (diffL[0] > variance || diffL[1] > variance || diffL[2] > variance) {
            arr[x][y] = counter;
            counter++;
          } else {
            arr[y][x] = arr[y][x-1];
          }

        }
      }

    }
  }
}

/**
 * @function merge - checks both adjacent cells that are similar and finds the lowest counter
 * and rewrites current cell as well as all cells of the higher counter
 * @param i - row of subject cell in array
 * @param j - column of subject cell in array
 * @param arr - reference to array to check values
 * values checked are 1 dimensional counter
 */
function merge(i, j, arr) {
  let lowest;
  let highest;
  let leftCt = arr[i][j-1];
  let aboveCt = arr[i-1][j];
  if (leftCt < aboveCt) {
    lowest = leftCt;
    highest = aboveCt;
  } else {
    lowest = aboveCt;
    highest = leftCt;
  }
  for (let a = 0; a < height; a++) {
    for (let b = 0; b < width; b++) {
      if (arr[a][b] === highest) {
        arr[a][b] = lowest;
      }
    }
  }
  arr[i][j] = lowest;
}

/**
 * @function updateColors - colors the image based on the object numbers in the array
 * takes the color of the first pixel of the object number and applies it to all
 * pixels of the same object number.
 * @param arr - reference to array hold counters of objects
 * uses references to P5 pixels array to use algorithm
 * possible to use independently with an array preset with object numbers.
 */
function updateColors(arr) {
  colorArr = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let ct = vImage[y][x];
      let ctExists = false;
      let color = get(x, y);
      let idx = (x + y * width)*4;
      for (ele of colorArr) {
        //if ct exists in color array (assume color already assigned)
        if (ele[0] === ct) {
          ctExists = true;
          set(x, y, ele[1]);
        }
      }
      //if ct doesn't exist yet, make it so
      if (ctExists === false) {
        colorArr.push([ct, color]);
      }
    }
  }
}

//2d array, columns/rows interchangeable
function create2dArray(columns, rows) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
