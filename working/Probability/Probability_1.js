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
const   NUM_POINTS = 5000000,
        WIDTH = 1100,    WIDTH_SEC = 2,
        HEIGHT = 700,   HEIGHT_SEC = 2,
                        DEPTH_SEC = 3,
        SCALE_X = -1.1,   SCALE_Y = .8,
        SHIFT_Y = 10,
        STEP_WIDTH = 10;

        WHITE   = [255, 255, 255, 200];
        RED     = [255, 0, 0, 200];
        GREEN   = [0, 255, 0, 200];
        BLUE    = [0, 0, 255, 200];


// layer color
let color1 = RED;
let color2 = GREEN;
let color3 = BLUE;
let color4 = WHITE;

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
let points = [];
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

    loadPixels();
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

                        let Xin = ((newPoint.X + newPoint.Y*SCALE_X) * .5) + WIDTH/2;
                        let Yin = ((newPoint.Y*SCALE_Y + newPoint.Z*SHIFT_Y) * .5) + HEIGHT/4;
                        switch(l) {
                            case 0: setP(Xin, Yin, color1);
                                    break;
                            case 1: setP(Xin, Yin, color2);
                                    break;
                            case 2: setP(Xin, Yin, color3);
                                    break;
                            default:setP(Xin, Yin, color4);
                        }
                        done = false;
                    }
                }
            }
        }
    }
    updatePixels();
    console.log("Populated the monte carlo simulation.");
}

function draw() {
    // for(let i = 0; i < points.length; i++) {
    //     stroke('purple'); // Change the color
    //     strokeWeight(3); // Make the points 10 pixels in size
    //     point(points[i].X, points[i].Y);
    // }
}


function getP(x, y){
    var off = (y * WIDTH + x) * d * 4;
    return [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
}

function setP(x, y, color){
    var off = (round(y) * (WIDTH*1.2) + round(x)) * 1 * 4;
    pixels[off] = color[0];
    pixels[off + 1] = color[1];
    pixels[off + 2] = color[2];
    pixels[off + 3] = color[3];
}
