/**
 * G002_V2_sketch.js.
 * Matthew Yu
 * 8/7/18
 * One of a series of sketches involving Generative Art.
 * A second version of "Mosaic", but creates polygons based on grid points.
 * Abstract Art generator
 */
let columns=29, rows=29;
let scale = 1;
let nodes = [];
let nodesPicked = [];
let nodeNum;

function setup() {
  width = windowWidth * .9998;
  height = windowHeight * .995;
  let cnv = createCanvas(width, height);

  for (let i = 1; i <= rows+1; i++) {
    let layer = [];
    for (let j = 1; j <= columns+1; j++) {
      layer.push([j*scale*columns, i*rows]);
    }
    nodes.push(layer);
  }

  for (let i = 0; i <= columns; i++) {
    for (let j = 0; j <= rows; j++) {
      //draw
      if (j < rows) {
        line(nodes[j][i][0], nodes[j][i][1], nodes[j+1][i][0], nodes[j+1][i][1]);
      }
      if (i < columns) {
        line(nodes[j][i][0], nodes[j][i][1], nodes[j][i+1][0], nodes[j][i+1][1]);
      }
    }
  }
}
function draw() {
  background(255, 255, 255, .5);
  for (let i = 1; i < columns; i++) {
    for (let j = 1; j < rows; j++) {
      //adjust x, y values of nodes slightly
      let newX = nodes[j][i][0]+random(-1,1);
      let newY = nodes[j][i][1]+random(-1,1);
      while (newX < nodes[j][i-1][0] || newX > nodes[j][i+1][0]) {
        newX = nodes[j][i][0]+random(-1,1);
      }
      while (newY < nodes[j-1][i][1] || newY > nodes[j+1][i][1]) {
          newY = nodes[j][i][1]+random(-1,1);
      }
      nodes[j][i] = [newX, newY];

      //draw
      //polygon
      push();
      //fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
      fill(255, 255, 255, 1);
      beginShape();
      vertex(nodes[j+1][i+1][0], nodes[j+1][i+1][1]);
      vertex(nodes[j+1][i][0], nodes[j+1][i][1]);
      vertex(nodes[j][i][0], nodes[j][i][1]);
      vertex(nodes[j][i+1][0], nodes[j][i+1][1]);
      endShape(CLOSE);
      pop();
      //lines
      stroke(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
      strokeWeight(.1);
      if (j === 1) {
        push();
        //fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
        fill(255, 255, 255, 1);
        beginShape();
        vertex(nodes[j-1][i-1][0], nodes[j-1][i-1][1]);
        vertex(nodes[j-1][i][0], nodes[j-1][i][1]);
        vertex(nodes[j][i][0], nodes[j][i][1]);
        vertex(nodes[j][i-1][0], nodes[j][i-1][1]);
        endShape(CLOSE);
        pop();
        line(nodes[j][i][0], nodes[j][i][1], nodes[j-1][i][0], nodes[j-1][i][1]);
      }
      if (i === 1) {
        push();
        //fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
        fill(255, 255, 255, 1);
        beginShape();
        vertex(nodes[j-1][i-1][0], nodes[j-1][i-1][1]);
        vertex(nodes[j-1][i][0], nodes[j-1][i][1]);
        vertex(nodes[j][i][0], nodes[j][i][1]);
        vertex(nodes[j][i-1][0], nodes[j][i-1][1]);
        endShape(CLOSE);
        pop();
        line(nodes[j][i][0], nodes[j][i][1], nodes[j][i-1][0], nodes[j][i-1][1]);
      }
      line(nodes[j][i][0], nodes[j][i][1], nodes[j+1][i][0], nodes[j+1][i][1]);
      line(nodes[j][i][0], nodes[j][i][1], nodes[j][i+1][0], nodes[j][i+1][1]);
    }
  }
  //start from center node and adjacent 4 nodes
  if(frameCount%10 === 0) {
    nodeNum = random(2, 20);
    nodesPicked = [];
    for (let i = 0; i < nodeNum; i++) {
      let x = round(random(0, columns));
      let y = round(random(0, rows));
      nodesPicked.push(nodes[x][y]);
    }
    generateShape();
  }
}

function generateShape() {
  push();
  //fill(noise(frameCount+150)*255,noise(frameCount+300)*255,noise(frameCount)*255, 255);
  fill(random(0, 255), random(0, 255), random(0, 255), 255);
  beginShape();
  for (node of nodesPicked) {
    //ellipse(node[0], node[1], 10, 10);
    vertex(node[0], node[1]);
  }
  endShape(CLOSE);
  pop();
}

let pressed = false;
function mouseClicked() {
  if (pressed === false) {
    noLoop();
    pressed = true;
  } else {
    loop();
    pressed = false;
  }
}
