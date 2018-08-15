//this class represents worm like objects that propage depending on the resources they "eat".
//each instance are indirectly affected by other objects of its class.
class Hungry_Body {
  constructor(location, velocity=[0,1], length=1, colorConsume=[random(0,255), random(0,255), random(0,255)], color=[random(0,255), random(0,255), random(0,255), 255]) {
    this.location = location; //dynamic array with positions of each length
    this.speed = velocity;
    this.length = length;
    this.colorConsume = colorConsume;
    this.color = color;

  }
  update() {
    //update location of every part of the body given
    for (let i = this.length-1; i > 0; i--) {
      this.location[i] = this.location[i-1];
    }
    //update the head with the new position
    this.location[0] = [this.location[0][0] + this.speed[0], this.location[0][1] + this.speed[1]];
    //wall collision
    if(this.location[0][0] < 0 || this.location[0][0] > bounds[0])
      this.speed[0] = -this.speed[0];
    if(this.location[0][1] < 0 || this.location[0][1] > bounds[1])
      this.speed[1] = -this.speed[1];
    //uncomment to see the velocity and acceleration vectors (scaled to see better)
    // stroke(0,255,0);
    // line(this.location[0], this.location[1], this.location[0] + this.speed[0]*5, this.location[1] + this.speed[1]*5);
  }
  show() {
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
    noStroke();
    for(let i = 0; i < this.length; i++) {
      rect(this.location[i][0]-1, this.location[i][1]-1, 2, 2);
    }
  }
  /**
   * feed takes the pixel color at the head and if it matches the requirements of the
   * Hungry_Body, consumes it and leaves the remaining color.
   * Options:
   *   Consumes x amount of each color value.
   *   Consumes all the color value if it exceeds a certain threshold.
   * @param pixelRGB - rgb struct of the pixel
   * @param mode - 4 modes: 0-option 1 dark, 1-option 1 light, 2- option 2 dark, 3-option 3 light
   * @return nPixelRGB - the new rgb struct of the pixel
   */
  feed(pixelRGB, mode) {
    //option 1:
    if(mode === 0) {
      if (pixelRGB[0] > this.colorConsume[0] && pixelRGB[1] > this.colorConsume[1] && pixelRGB[2] > this.colorConsume[2]) {
        //push coordinates of the tail
        this.location.push(this.location[length]);
        this.length ++;
        return [pixelRGB[0]-this.colorConsume[0], pixelRGB[1]-this.colorConsume[1], pixelRGB[2]-this.colorConsume[2]];
      }
      else return pixelRGB;
    }
    if(mode === 1) {
      if (pixelRGB[0] < this.colorConsume[0] && pixelRGB[1] < this.colorConsume[1] && pixelRGB[2] < this.colorConsume[2]) {
        //push coordinates of the tail
        this.location.push(this.location[length]);
        this.length ++;
        return [pixelRGB[0]+this.colorConsume[0], pixelRGB[1]+this.colorConsume[1], pixelRGB[2]+this.colorConsume[2]];
      }
      else return pixelRGB;
    }

    //option 2:
    if(mode === 2) {
      let pixelRGBout = [pixelRGB[0], pixelRGB[1], pixelRGB[2]];
      if (pixelRGB[0] > this.colorConsume[0])
        pixelRGBout[0] = 0;
      if (pixelRGB[1] > this.colorConsume[1])
        pixelRGBout[1] = 0;
      if (pixelRGB[2] > this.colorConsume[2])
        pixelRGBout[2] = 0;
      return pixelRGBout;
    }
    if(mode === 3) {
      let pixelRGBout = [pixelRGB[0], pixelRGB[1], pixelRGB[2]];
      if (pixelRGB[0] < this.colorConsume[0])
        pixelRGBout[0] = 255;
      if (pixelRGB[1] < this.colorConsume[1])
        pixelRGBout[1] = 255;
      if (pixelRGB[2] < this.colorConsume[2])
        pixelRGBout[2] = 255;
      return pixelRGBout;
    }

  }

  changeColor(color) {
    this.color = color;
  }
}
