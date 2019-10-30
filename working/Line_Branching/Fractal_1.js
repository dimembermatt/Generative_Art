/**
 * Fractal_1.js
 * Matthew Yu
 * 10/27/19
 * One of a series of sketches involving Generative Art.
 *
 * Algorithm:
 * Take a randomly placed line of position (x,y) and width/height w, h.
 * Spawn a second line of L/a length at position (x+w/b, y+h/b)*, alternating.
 */

let A = 1/1.618, B = .78, MAX_LINES = 250, EXPAND = 1.1;
let lines = [];
let X = 100, Y = 100, W = 0, H = 700;
let heading = 0;

function setup() {
    width = 1000;
    height = 1000;
    let cnv = createCanvas(width, height);
    lines.push({X, Y, W, H});
}

function draw() {
    fill(255, 255, 255);
    // add a line
    let last = lines[lines.length-1];
    let add = {X:last.X + last.W*A, Y:last.Y + last.H*A, W:0, H:0};
    switch(heading){
        case 0: add.W = last.H*B; add.H = 0; // add line going east
            break;
        case 1: add.W = 0; add.H = -last.W*B; // add line going north
            break;
        case 2: add.W = last.H*B; add.H = 0; // add line going west
            break;
        case 3: add.W = 0; add.H = -last.W*B; // add line going south
            break;
        default: console.log("invalid orientation.");
    }
    lines.push(add);
    // rotate orientation
    heading = (heading + 1)%4;

    if(heading == 3) {
        A *= .92;
        B *= .95;
    }

    if(lines.length > MAX_LINES) lines.shift();
    // draw shapes
    for(let i = 0; i < lines.length; i++) {
        stroke(noise((i/100)*255), noise((i/100+50)*255), noise((i/100+75)*255));
        line(lines[i].X, lines[i].Y, lines[i].X+lines[i].W, lines[i].Y+lines[i].H);
    }

}
