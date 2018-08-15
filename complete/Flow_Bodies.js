//this class represents elliptical objects that are bound by a force provided by an external field.
//each instance is not affected by other objects of its class.
class Flow_Body {
  constructor(position, velocity=[0,0], acceleration=[0,0], size=[50,50], color=[random(0, 255), random(0, 255), random(0, 255), 200]) {
    this.location = position;
    this.speed = velocity;
    this.acceleration = acceleration;
    this.size = size;
    this.color = color;
    this.tBool = false;

  }
  update() {
    this.location[0] += this.speed[0];
    this.location[1] += this.speed[1];
    this.speed[0] += this.acceleration[0];
    this.speed[1] += this.acceleration[1];
    //max vel
    if(Math.abs(this.speed[0]) > 5) {
      let sign = this.speed[0]/Math.abs(this.speed[0]);
      this.speed[0] = 5 * sign;
    }
    if(Math.abs(this.speed[1]) > 5) {
      let sign = this.speed[1]/Math.abs(this.speed[1]);
      this.speed[1] = 5 * sign;
    }

    //wall collision
    // if(this.location[0] < 0 || this.location[0] > (cols-1)*scale)
    //   this.speed[0] = -this.speed[0];
    // if(this.location[1] < 0 || this.location[1] > (rows-1)*scale)
    //   this.speed[1] = -this.speed[1];
    //boundary collision
    let wWidth = (cols-1)*scale;
    let wHeight = (rows-1)*scale;
    if(this.location[0] < 0) {
      this.location[0] = this.location[0] + wWidth;
    }
    this.location[0] = this.location[0]%wWidth;
    if(this.location[1] < 0) {
      this.location[1] = this.location[1] + wHeight;
    }
    this.location[1] = this.location[1]%wHeight;

    //transparency
    if(this.tBool === true)
      this.color[3] -= 5;
    else
      this.color[3] += 5;
    if(this.color[3] === 255)
      this.tBool = true;
    if(this.color[3] === 150)
      this.tBool = false;


    //uncomment to see the velocity and acceleration vectors (scaled to see better)
    // stroke(0,0,0);
    // line(this.location[0], this.location[1], this.location[0] + this.acceleration[0]*5, this.location[1] + this.acceleration[1]*5);
    // stroke(0,255,0);
    // line(this.location[0], this.location[1], this.location[0] + this.speed[0]*5, this.location[1] + this.speed[1]*5);

    //reset accel vector for next run
    this.acceleration[0] = 0;
    this.acceleration[1] = 0;
  }
  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
    ellipse(this.location[0], this.location[1], this.size[0], this.size[1]);
  }
  /**
   * @param: force - a force struct containing a x and y acceleration ([0], [1] respectively)
   */
  applyForce(force) {
    this.acceleration[0] = force[0];
    this.acceleration[1] = force[1];
  }

  changeColor(color) {
    this.color = color;
  }
}
