/**
 * Prime_Implicant_Bubble.js
 * Matthew Yu
 * 10/22/19
 * One of a series of sketches involving Generative Art.
 *
 * Description:
 *  Prime Implicant Bubbles
 *  Given an nxn matrix/torus
 *  Give each cell a color value in the RGB space and a 1/0 value.
 *  If two adjacent cells are 1, merge them together and create a larger 2^n cell
 *  with an average color of the 2^n cells.
 *  Repeat until no more cells can be merged
 *
 * TODO:    * Fix adjacency check in merge(), move to separate function, cover corner cases (literally)
 *          * Figure out a better algorithm than brute force
 *          * Create a profiler on merge() and possibly other functions, looking at the tangible asymptotic complexity over N (cellList length). Create companion graphics.
 *          * Find a way to merge two compatible cells given position and dimensions (which cell is leftmost? which cell is topmost?)
 *          * Figure out wrapping
 *          * Consider renaming of kmap visual is not directly tied to prime implicants
 */
const   GRID_SIZE = [2**6, 2**6],
        CELL_SIZE = 8,
        CANVAS_WIDTH = 800*2,
        CANVAS_HEIGHT = 800,
        NOISE_DIVISOR = 4,
        PROFILE_LENGTH = 25;

/**
 * the grid variable originally contains a nxm matrix of randomized values.
 * over time, adjacent cells are compared and merged if needed.
 * each member of the grid contains an RGB value, a binary value, and it's size in the matrix (i.e 0,0 to 0,1).
 */
let grid = [];
let gridList;
let gridListSize = 0;
let binary = 0;

// set up a grid of GRID_SIZE columns and rows. Initialize a random color and binary weight to each of them.
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // randomly initialize each square in the grid.
    for (let i = 0; i < GRID_SIZE[0]; i++) {
        for (let j = 0; j < GRID_SIZE[1]; j++) {
            let cell = {
                position:   [i, j],                 // 0: row, column
                dimension:  [1, 1],                 // 1: height, width
                color:
                    [round(random(0, 255)),
                    round(random(0, 255)),
                    round(random(0, 255))],         // 2: Color
                binary:     round(noise(i/NOISE_DIVISOR, j/NOISE_DIVISOR))};   // 3: binary value

            grid.push(cell);
        }
    }
    gridList = JSON.parse(JSON.stringify(grid));
}

// call merge function and draw the new grid array.
function draw() {
    merge();
    background(255, 255, 255, 255);
    // say every square is about 10x10 pixels.

    for (let i = 0; i < gridList.length; i++) {
        let square = gridList[i];
        // color trigger
        if(binary == 0) fill(square.color[0], square.color[1], square.color[2]);
        else            fill(square.binary*255, square.binary*255, square.binary*255);
        // draw rectangle for each cell
        rect(
            square.position[0]*CELL_SIZE + 100,
            square.position[1]*CELL_SIZE + 100,
            square.dimension[0]*CELL_SIZE,
            square.dimension[1]*CELL_SIZE);
    }
    for (let i = 0; i < grid.length; i++) {
        let square = grid[i];
        // color trigger
        if(binary == 0) fill(square.color[0], square.color[1], square.color[2]);
        else            fill(square.binary*255, square.binary*255, square.binary*255);
        // draw rectangle for each cell
        rect(
            square.position[0]*CELL_SIZE + CANVAS_WIDTH/3 + 100,
            square.position[1]*CELL_SIZE + 100,
            square.dimension[0]*CELL_SIZE,
            square.dimension[1]*CELL_SIZE);
    }
}

let movingAvg = [];

// brute force merge two adjacent cells
function merge() {
    // profiling
    let start = millis();

    // let cellList = JSON.parse(JSON.stringify(grid)).sort(() => Math.random() - 0.5);
    let cellList = JSON.parse(JSON.stringify(grid)).filter(cell => cell.binary >= 1).sort(() => Math.random() - 0.5);
    let mergeList = [];

    // run through cellList until no changes can be made.
    let completeFlag = false;
    let i = 0, j = 1;
    do{
        // check if cells are adjacent
        let mergeFlag = false;
        for (let i = 0; i < cellList.length - 1; i++) {
            let cell1 = cellList[i];
            for (let j = i + 1; j < cellList.length; j++) {
                let cell2 = cellList[j];
                // if both cells are adjacent
                if ( !(
                    cell2.position[0] > cell1.position[0] + cell1.dimension[0]  ||  // edges
                    cell2.position[0] + cell2.dimension[0] < cell1.position[0]  ||
                    cell2.position[1] > cell1.position[1] + cell1.dimension[1]  ||
                    cell2.position[1] + cell2.dimension[1] < cell1.position[1]  ||
                    // this only works for size 1 cells
                    ((cell1.position[0] != cell2.position[0]) && (cell1.position[1] != cell2.position[1]))
                )) {
                    // if both cells are binary 1
                    if (cell1.binary && cell2.binary) {
                        // console.log("Cells at ", cell1.position, " and ", cell2.position, " are adjacent.");
                        // pop both cells
                        cellList.splice(j, 1);
                        cellList.splice(i, 1);
                        // TODO: calculate new cell position, dimension, color
                        // let cell = {
                        //     position:   [(cell1.position[0] <= cell2.position[0]) ? cell1.position[0]: cell2.position[0], (cell1.position[1] <= cell2.position[1]) ? cell1.position[1] : cell2.position[1]],                 // 0: row, column
                        //     dimension:  [2, 2],                 // 1: height, width
                        //     color: [
                        //         (cell1.color[0] + cell2.color[0]) >> 1,
                        //         (cell1.color[1] + cell2.color[1]) >> 1,
                        //         (cell1.color[2] + cell2.color[2])],         // 2: Color
                        //     binary: 1};                                     // 3: binary value
                        // // push mergedcell to mergeList
                        let color = [(cell1.color[0] + cell2.color[0]) >> 1,
                                     (cell1.color[1] + cell2.color[1]) >> 1,
                                     (cell1.color[2] + cell2.color[2])];         // 2: Color
                        cell1.color = color;
                        cell2.color = color;
                        mergeList.push(cell1);
                        mergeList.push(cell2);
                        // mergeList.push(cell);
                        // raise mergeFlag
                        mergeFlag = true;
                        break;
                    }
                }
            }
        }
        if(!mergeFlag)  // finish when no merges are possible
            completeFlag = true;
    }while(!completeFlag);
    // replace with only a better mergeList
    if(mergeList.length > gridListSize) {
        gridList = mergeList.concat(cellList.filter(cell => cell.binary >= 1));
        gridListSize = mergeList.length;
    }

    // profiling
    let end = millis();
    let elapsed = end - start;
    movingAvg.push(elapsed);
    if(movingAvg.length > PROFILE_LENGTH)
        movingAvg.shift();
}


// visually check the binary-ness of the grid cells.
function mouseClicked() {
    binary = binary ? 0 : 1;

}

function keyTyped() {
    if (key === 'a') {
        console.log("Executing merge()");
        merge();
    }else if (key === 'b') {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        console.log("Avg time to run merge(): ", movingAvg.reduce(reducer)/movingAvg.length, " ms");

    }
    // uncomment to prevent any default behavior
    return false;
}
