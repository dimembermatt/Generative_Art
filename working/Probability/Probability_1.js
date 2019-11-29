/**
 * Probability_1.js
 * Matthew Yu
 * 10/29/19
 * One of a series of sketches involving Generative Art.
 *
 * Algorithm:
 * Generate a nxn matrix of probabilities, of which the sum of probabilities over the entire matrix is 1.
 * Throw random points over the matrix.
 * Extension: Modify the matrix to have multiple layers, of which the sum of probabilities over all layers is 1.
 * Throw random points over the matrix.
 */
const   NUM_POINTS = 1000000,
        WIDTH = 1350,    WIDTH_SEC = 25,
        HEIGHT = 800,   HEIGHT_SEC = 25,
                        DEPTH_SEC = 4,
        SCALE_X = -1.3,   SCALE_Y = .7,
        SHIFT_Y = 10,
        STEP_WIDTH = 1;

function create3dArray(columns, rows, layers) {
   var arr = new Array(columns);
   for (let i = 0; i < arr.length; i++) {
     arr[i] = new Array(rows);
     for (let j = 0; j < arr[i].length; j++) {
         arr[i][j] = new Array(layers);
     }
   }
   return arr;
 }

let matrix, total;
// let points = [];
function setup() {
    matrix = create3dArray(WIDTH_SEC, HEIGHT_SEC, DEPTH_SEC);
    console.log("Built the matrix.");

    let cnv = createCanvas(WIDTH*1.2, HEIGHT);
    background('#222222');

    total = 0;
    for (let i = 0; i < WIDTH_SEC; i++) {
        for (let j = 0; j < HEIGHT_SEC; j++) {
            for (let k = 0; k < DEPTH_SEC; k++) {
                let noiseVal = noise(i*STEP_WIDTH, j*STEP_WIDTH, k*STEP_WIDTH);
                matrix[i][j][k] = noiseVal;
                total += noiseVal;
            }
        }
    }
    console.log("Populated the matrix.");

    strokeWeight(1); // Make the points 10 pixels in size
    for (let i = 0; i < NUM_POINTS; i++) {
        let value = random(0, total);
        let done = true;
        for (let j = 0; j < WIDTH_SEC && done; j++) {
            for (let k = 0; k < HEIGHT_SEC && done; k++) {
                for (let l = 0; l < DEPTH_SEC && done; l++) {
                    value -= matrix[j][k][l];
                    if(value < 0) {
                        let newPoint = {
                            X:k*WIDTH/WIDTH_SEC+random(0, WIDTH/WIDTH_SEC),
                            Y:j*HEIGHT/HEIGHT_SEC+random(0, HEIGHT/HEIGHT_SEC),
                            Z:l*DEPTH_SEC+random(0, DEPTH_SEC) // replace width with height?
                        };
                        switch(l) {
                            case 0: stroke(255, 0, 0, 230);
                                    break;
                            case 1: stroke(0, 255, 0, 230);
                                    break;
                            case 2: stroke(0, 0, 255, 230);
                                    break;
                            default: stroke(255/(l + 1), 255/(l + 1), 255/(l + 1), 230);
                        }
                        push();
                        translate(WIDTH/2, HEIGHT/4);
                        scale(.6, .6);
                        point(newPoint.X + newPoint.Y*SCALE_X, newPoint.Y*SCALE_Y + newPoint.Z*SHIFT_Y);
                        pop();
                        // points.push(newPoint);
                        done = false;
                    }
                }
            }
        }
    }
    console.log("Populated the monte carlo simulation.");
}

function draw() {
    // for(let i = 0; i < points.length; i++) {
    //     stroke('purple'); // Change the color
    //     strokeWeight(3); // Make the points 10 pixels in size
    //     point(points[i].X, points[i].Y);
    // }
}
