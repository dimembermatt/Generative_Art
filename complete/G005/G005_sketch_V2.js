/**
 * G005_sketch_V2.js.
 * Matthew Yu
 * Last Modified: 11/5/18
 * One of a series of sketches involving Generative Art.
 * Using Connected Components algorithm, section areas of an input picture
 * and color each area a discrete color.
 * Tested on the latest Chrome version. Recommended for pictures within 2kx2k
 * TODO: test merging objects at every collision instead of end algo recursion
 * 11/5/18 Test Results of changing pixel access:
 * Talonflame.jpg (275x287)
 *  Before  345.591s/1.621s
 *  After   1.388s/2.234s
 */
//modify these variables
let name = "planets2";
let extension = ".png";
let variance = 30;
//do not modify
let d;
let iteration = 0;
let canvasSize;
let objMap;
let corrMap = [];
//pixels array implicitly implied

function preload() {
  img = loadImage(name + extension);
}

function setup() {
  let width, height;
  // if(img.width > 1000) {
  //   width = 1000;
  // } else {
    width = img.width;
  // }
  // if(img.height > 900) {
  //   height = 900;
  // } else {
    height = img.height;
  //}
  cnv = createCanvas(width, height);
  image(img, 0,0);

  d = pixelDensity();
  canvasSize = 4 * (width * d) * (height* d);
  objMap = create2dArray(width, height);
}

function draw() {
  noLoop();
}

function mouseClicked() {
  loadPixels();
  console.log("running.");
  runAlgorithm(objMap, corrMap);
  console.log("runAlgo complete.");
  colorImage(objMap, corrMap);
  console.log("coloring complete.");
  updatePixels();
  iteration++;
  console.log(iteration);
}

//2d array, columns/rows interchangeable
function create2dArray(columns, rows) {
  var arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

/**
 * @function runAlgorithm - runs connected component algorithm
 * @param objectMap - reference to array that holds counters of objects
 * @param corrMap - reference to array that holds counter correlations and colors
 * uses references to P5 pixels array to use algorithm
 */
function runAlgorithm(objectMap, correlationMap) {
  let color;
  let counter = 0;
  console.log("Height: " + height);
  let t0 = performance.now();
  for (let y = 0; y < height; y++) {
    if(y%5 === 0)
      console.log("row:" + y);
    for (let x = 0; x < width; x++) {
      color = getP(x, y);
      //first pixel
      if (x === 0 && y === 0) {
        objectMap[x][y] = counter;
        correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
        counter++;
      } else if (x != 0 && y === 0) { //first row
        let leftColor = getP(x-1, y);
        let diff = [abs(color[0]-leftColor[0]), abs(color[1]-leftColor[1]), abs(color[2]-leftColor[2])];
        if (diff[0] > variance || diff[1] > variance || diff[2] > variance) { //new object
          objectMap[x][y] = counter;
          correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
          counter++;
        } else { //same object
          objectMap[x][y] = objectMap[x-1][y];
        }
      } else if (x === 0 && y != 0) { //first column
        let aboveColor = getP(x, y-1);
        let diff = [abs(color[0]-aboveColor[0]), abs(color[1]-aboveColor[1]), abs(color[2]-aboveColor[2])];
        if (diff[0] > variance || diff[1] > variance || diff[2] > variance) { //new object
          objectMap[x][y] = counter;
          correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
          counter++;
        } else {//same object
          objectMap[x][y] = objectMap[x][y-1];
        }
      } else {  //everywhere else
        let leftColor = getP(x-1, y);
        let aboveColor = getP(x, y-1);
        let lDiff = [abs(color[0]-leftColor[0]), abs(color[1]-leftColor[1]), abs(color[2]-leftColor[2])];
        let aDiff = [abs(color[0]-aboveColor[0]), abs(color[1]-aboveColor[1]), abs(color[2]-aboveColor[2])];
        let lBool = lDiff[0] > variance || lDiff[1] > variance || lDiff[2] > variance;
        let aBool = aDiff[0] > variance || aDiff[1] > variance || aDiff[2] > variance;
        if (lBool && !aBool) { //above is similar only
          objectMap[x][y] = objectMap[x][y-1];
        } else if (!lBool && aBool) { //left is similar only
          objectMap[x][y] = objectMap[x-1][y];
        } else if (lBool && aBool) { //neither are similar
          objectMap[x][y] = counter;
          correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
          counter++;
        } else { //both are similar - merge!
          lObjID = objectMap[x-1][y];
          aObjID = objectMap[x][y-1];
          if (lObjID > aObjID) { //if above is smaller id
            objectMap[x][y] = objectMap[x][y-1];
            for (ele of correlationMap) { //assumption lObjID exists in correlationMap. if it doesn't...
              if (ele[0] === lObjID) { //if id matches left, set left equal to above
                ele[1] = aObjID;
                break;
              }
            }
          } else {  //if left is smaller or equal
            objectMap[x][y] = objectMap[x-1][y];
            for (ele of correlationMap) { //assumption lObjID exists in correlationMap. if it doesn't...
              if (ele[0] === aObjID) { //if id matches left, set left equal to above
                ele[1] = lObjID;
                break;
              }
            }
          }
        }
      }
    }
  }
  let t1 = performance.now();
  console.log("Algorithm time: " + (t1-t0) + " ms");
}

/**
 * @function colorImage - colors an image based on its correlationMap and objectMap
 * @param objectMap - reference to array that holds counters of objects
 * @param corrMap - reference to array that holds counter correlations and colors
 * uses references to P5 pixels array to use algorithm
 */
function colorImage(objectMap, correlationMap) {
  let objID;
  let t0 = performance.now();
  for (let y = 0; y < height; y++) {
      if(y%5 === 0)
        console.log("row:" + y);
      for (let x = 0; x < width; x++) {
      objID = objectMap[x][y];
      searchRef(objID, correlationMap, x, y);
    }
  }
  let t1 = performance.now();
  console.log("Coloring time: " + (t1-t0) + " ms");
}

function searchRef(objID, correlationMap, x, y) {
  for (ele of correlationMap) {
    if (ele[0] === objID) { //object reference found
      if (ele[0] === ele[1]) { //if object ID matches its reference
        setP(x, y, ele[2]);  //set color of pixel
      } else { //object ID references another object
        objID = ele[1];
        searchRef(objID, correlationMap, x, y);
      }
      break;
    }
  }
}

function getP(x, y){
    var off = (y * width + x) * d * 4;
    return [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
}

function setP(x, y, color){
    var off = (y * width + x) * d * 4;
    pixels[off] = color[0];
    pixels[off + 1] = color[1];
    pixels[off + 2] = color[2];
    pixels[off + 3] = color[3];
}
