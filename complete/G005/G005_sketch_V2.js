/**
 * G005_sketch_V2.js.
 * Matthew Yu
 * 8/10/18
 * One of a series of sketches involving Generative Art.
 * Using Connected Components algorithm, section areas of an input picture
 * and color each area a discrete color.
 * Tested on the latest Chrome version. Not recommended for images above
 * 300x300 px. Time is a exponential function of size.
 */
//modify these variables
let name = "adventures";
let extension = ".png";
let variance = 20;
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
  for (let y = 0; y < height; y++) {
    if(y%5 === 0)
      console.log("row:" + y);
    for (let x = 0; x < width; x++) {
      color = get(x, y);
      //first pixel
      if (x === 0 && y === 0) {
        objectMap[x][y] = counter;
        correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
        counter++;
      } else if (x != 0 && y === 0) { //first row
        let leftColor = get(x-1, y);
        let diff = [abs(color[0]-leftColor[0]), abs(color[1]-leftColor[1]), abs(color[2]-leftColor[2])];
        if (diff[0] > variance || diff[1] > variance || diff[2] > variance) { //new object
          objectMap[x][y] = counter;
          correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
          counter++;
        } else { //same object
          objectMap[x][y] = objectMap[x-1][y];
        }
      } else if (x === 0 && y != 0) { //first column
        let aboveColor = get(x, y-1);
        let diff = [abs(color[0]-aboveColor[0]), abs(color[1]-aboveColor[1]), abs(color[2]-aboveColor[2])];
        if (diff[0] > variance || diff[1] > variance || diff[2] > variance) { //new object
          objectMap[x][y] = counter;
          correlationMap.push([counter, counter, color]); //push the counter, what obj it equals to, and color
          counter++;
        } else {//same object
          objectMap[x][y] = objectMap[x][y-1];
        }
      } else {  //everywhere else
        let leftColor = get(x-1, y);
        let aboveColor = get(x, y-1);
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
}

/**
 * @function colorImage - colors an image based on its correlationMap and objectMap
 * @param objectMap - reference to array that holds counters of objects
 * @param corrMap - reference to array that holds counter correlations and colors
 * uses references to P5 pixels array to use algorithm
 */
function colorImage(objectMap, correlationMap) {
  let objID;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      objID = objectMap[x][y];
      searchRef(objID, correlationMap, x, y);
    }
  }
}

function searchRef(objID, correlationMap, x, y) {
  for (ele of correlationMap) {
    if (ele[0] === objID) { //object reference found
      if (ele[0] === ele[1]) { //if object ID matches its reference
        set(x, y, ele[2]);  //set color of pixel
      } else { //object ID references another object
        objID = ele[1];
        searchRef(objID, correlationMap, x, y);
      }
      break;
    }
  }
}
