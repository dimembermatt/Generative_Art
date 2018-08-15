/**
 * G001_sketch.js.
 * Matthew Yu
 * 8/5/18
 * One of a series of sketches involving Generative Art.
 */
let n = 7;  //number of base nodes for layer 1
let a = 3;  //multiplier per node
let layer = 6;  //layers (0 indexed)
let r = 60; //radius of each layer
let nodes = [];

function setup() {
  angleMode(DEGREES);
  width = r*layer+1000;//windowWidth * .9998;
  height = r*layer+1000;//windowHeight * .995;
  let cnv = createCanvas(width, height);

  //push central node with position at center of canvas
  nodes.push([0,0]);
  //push a^k*n nodes for each layer
  for (let i = 1; i <= layer; i++) {
    let nodeLayer = [];
    let maxLayerNodes = pow(a, i-1)*n;
    //maximum offset before collision of rings is r/2
    let offset = [random(-1, 1)*25, random(-1, 1)*r/2];
    for (let j = 1; j <= maxLayerNodes; j++) {
      x = r*i*cos(degrees(TWO_PI*j/maxLayerNodes)) + offset[0];
      y = r*i*sin(degrees(TWO_PI*j/maxLayerNodes)) + offset[1];
      nodeLayer.push([x,y]);
    }
    nodes.push(nodeLayer);
  }
  //basic draw
  // ellipse(nodes[0][0], nodes[0][1], 10, 10);
  // for (let i = 1; i <= layer; i++) {
  //   for (node of nodes[i]) {
  //     ellipse(node[0], node[1], 3, 3);
  //   }
  // }
}
function draw() {
  background(255, 255);
  //for layer 1
  push();
  translate(width*0.5, height*0.5);
  rotate(frameCount / 5);
  fill(255);
  beginShape();
  for (node of nodes[1]) {
    vertex(node[0], node[1]);
  }
  endShape(CLOSE);
  pop();
  //for layer 2+
  for (let i = 2; i <= layer; i++) {
    let numPoints = pow(a, i-1)*n;
    let currentPt = 0;
    for (let j = 0; j < numPoints; j+=a) {
      push();
      translate(width*0.5, height*0.5);
      if(i%2) {
        rotate(frameCount/i);
      } else {
        rotate(-frameCount/i);
      }
      fill(noise(j/10+100)*255, noise(j/10+200)*255, noise(j/10)*255, i/layer*255);
      beginShape();
      //vertex at every a points of the layer, then vertex at a single point of the prev layer
      for (let k = j; k < (j+a); k++)
        vertex(nodes[i][k][0], nodes[i][k][1]);
      vertex(nodes[i-1][currentPt][0], nodes[i-1][currentPt][1]);
      endShape(CLOSE);
      pop();
      currentPt++;
    }
  }
}
