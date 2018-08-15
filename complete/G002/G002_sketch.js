/**
 * G002_sketch.js.
 * Matthew Yu
 * 8/5/18
 * One of a series of sketches involving Generative Art.
 * Experiment with grids and lines.
 * Dubbed "Mosaic"
 */
let columns=25, rows=25;
let scale = 1;
let nodes = [];

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
      if (j < rows-1) {
        line(nodes[j][i][0], nodes[j][i][1], nodes[j+1][i][0], nodes[j+1][i][1]);
      }
      if (i < columns-1) {
        line(nodes[j][i][0], nodes[j][i][1], nodes[j][i+1][0], nodes[j][i+1][1]);
      }
      //fill(noise(nodes[j][i][0], nodes[j][i][1])*255,noise(i/2, j/2)*255,noise(frameCount/100)*255);
      ellipse(nodes[j][i][0], nodes[j][i][1], 10, 10);
    }
  }
}
function draw() {
  background(255);
  for (let i = 1; i < columns-1; i++) {
    for (let j = 1; j < rows-1; j++) {
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
      fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
      beginShape();
      vertex(nodes[j+1][i+1][0], nodes[j+1][i+1][1]);
      vertex(nodes[j+1][i][0], nodes[j+1][i][1]);
      vertex(nodes[j][i][0], nodes[j][i][1]);
      vertex(nodes[j][i+1][0], nodes[j][i+1][1]);
      endShape(CLOSE);
      pop();
      //lines
      stroke(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
      //ellipse(nodes[j][i][0], nodes[j][i][1], 10, 10);
      if (j === 1) {
        push();
        fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
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
        fill(noise(nodes[j][i][0])*255, noise(nodes[j][i][1])*255,noise(i/10, j/10)*255,noise(frameCount/100)*255);
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
}

function mouseClicked() {
}
