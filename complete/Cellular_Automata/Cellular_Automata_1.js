/**
 * Cellular_Automata_1.js
 * Matthew Yu
 * 11/2/19
 * One of a series of sketches involving Generative Art.
 * 
 * Description: Generate a RPS cellular automata
 * Mode 1: Randomly populate a nxm matrix with a union{R,G,B}
 * Randomly pick a neighbor.
 *  R beats B
 *  B beats G
 *  G beats R.
 * Replace cell.
 */
const   RED = 1,
        GREEN = 2,
        BLUE = 3,
        PROB_SHIFT = .5,
        COL = 50,
        ROW = 50;


function create2dArray(columns, rows) {
    var arr = new Array(columns);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let world;

function setup() {
    world = create2dArray(COL, ROW);
    createCanvas(COL*10, ROW*10);
    for (let i = 0; i < COL; i++) {
        for (let j = 0; j < ROW; j++) {
            world[i][j] = random([RED, GREEN, BLUE]);
            switch(world[i][j]) {
                case RED:   fill(255, 0, 0); break;
                case GREEN: fill(0, 255, 0); break;
                case BLUE:  fill(0, 0, 255); break;
                default:
            }
            rect(i*10, j*10, 10, 10);
        }
    }
}

function draw() {
    for (let i = 0; i < COL; i++) {
        for (let j = 0; j < ROW; j++) {
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
        }
    }    
    for (let i = 0; i < COL; i++) {
        for (let j = 0; j < ROW; j++) {
            switch(world[i][j]) {
                case RED:   fill(255, 0, 0); break;
                case GREEN: fill(0, 255, 0); break;
                case BLUE:  fill(0, 0, 255); break;
                default:
            }
            rect(i*10, j*10, 10, 10);
        }
    }
}