/**
 * Cellular_Automata_2.js
 * Matthew Yu
 * 11/29/19
 * One of a series of sketches involving Generative Art.
 * 
 * Description: Generate a RPS cellular automata
 * Mode 2: Populate a nxm matrix using an image with a union{R,G,B}
 * Randomly pick a neighbor.
 *  R beats B
 *  B beats G
 *  G beats R.
 * Replace cell.
 * 
 * TODO: Try to speed up runtime per iteration.
 *  Note: vast majority of processing time is in rect(). Attempted to manipulate pixel directly,
 *  appears that the function is already optimized.
 */
const   RED = 1,
        GREEN = 2,
        BLUE = 3,
        PROB_SHIFT = .4,
        SIZE = 2;

let imgName = "nebula3";
let imgExtension = "jpg";

function create2dArray(columns, rows) {
    var arr = new Array(columns);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let COL, ROW;
let d; // density
let img;

function preload() {
    img = loadImage(imgName + "." + imgExtension);
    d = pixelDensity();
}

let world;
function setup() {
    COL = img.width;
    ROW = img.height;
    world = create2dArray(COL, ROW);
    createCanvas(COL*10, ROW*10);
    image(img, 0, 0);
    loadPixels();
    let start = millis();
    for (let j = 0; j < ROW; j++) {     // y
        for (let i = 0; i < COL; i++) { // x
            let index = 4 * ((j * d) * COL * d + (d + i));
            let colors = getP(i, j);
            if(colors[0] >= colors[1] && colors[0] >= colors[2])
                world[i][j] = RED;
            else if(colors[1] >= colors[0] && colors[1] >= colors[2])
                world[i][j] = GREEN;
            else
                world[i][j] = BLUE;
            
            noStroke();
            switch(world[i][j]) {
                case RED:   fill(255, 0, 0); break;
                case GREEN: fill(0, 255, 0); break;
                case BLUE:  fill(0, 0, 255); break;
                default:
            }
            rect(i*SIZE, j*SIZE, SIZE, SIZE);
        }
    }
    let end = millis();
    console.log("Setting up world: " + (end-start) + "ms.");
}

function draw() {
    let start = millis();
    let end;
    for (let j = 0; j < ROW; j++) {     // y
        for (let i = 0; i < COL; i++) { // x
            // run step
            let neighbor;
            let rand = floor(random(0, 8));
            switch(rand) {
                case 0: neighbor = [0, -1];     break;
                case 1: neighbor = [-1, -1];    break;
                case 2: neighbor = [-1, 0];     break;
                case 3: neighbor = [-1, 1];     break;
                case 4: neighbor = [0, 1];      break;
                case 5: neighbor = [1, 1];      break;
                case 6: neighbor = [1, 0];      break;
                case 7: neighbor = [0, -1];     break;
                default: console.log("Invalid neighbor: ", rand);
            }
            let myColor = world[i][j];
            let neighborColor = world[(i + neighbor[0] + COL)%COL][(j + neighbor[1] + ROW)%ROW];

            /*      NEIGHBOR
            SELF        R  G  B
                    R   0 -1  1
                    G   1  0 -1
                    B  -1  1  0
            */
            if((myColor == RED && neighborColor == GREEN) || (myColor == GREEN && neighborColor == BLUE) || (myColor == BLUE && neighborColor == RED)) {
                if(random() > PROB_SHIFT) world[i][j] = world[(i + neighbor[0] + COL)%COL][(j + neighbor[1] + ROW)%ROW];
            }else if((myColor == RED && neighborColor == BLUE) || (myColor == GREEN && neighborColor == RED) || (myColor == BLUE && neighborColor == GREEN)) {
                if(random() > PROB_SHIFT) world[(i + neighbor[0] + COL)%COL][(j + neighbor[1] + ROW)%ROW] = world[i][j];
            }// else do nothing

            noStroke();
            switch(world[i][j]) {
                case RED:   fill(255, 0, 0); break;
                case GREEN: fill(0, 255, 0); break;
                case BLUE:  fill(0, 0, 255); break;
                default:
            }
            rect(i*SIZE, j*SIZE, SIZE, SIZE);
        }
    }     

    end = millis();
    console.log("Iterating through world: ", + (end-start) + "ms.");    
    console.log("Through row: " + (end-start)/ROW + "ms.");
    console.log("Through unit: " + (end-start)/(ROW*COL)  + "ms.");
}

function getP(x, y){
    var off = (y * width + x) * d * 4;
    return [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
}

function setP(x, y, color){
    var off = (y * COL + x) * d * 4;
    pixels[off] = color[0];
    pixels[off + 1] = color[1];
    pixels[off + 2] = color[2];
    pixels[off + 3] = color[3];
}
