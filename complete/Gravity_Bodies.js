//this class represents elliptical objects that are bound by a simulated gravitational force.
//each instance is affected by other objects of its class.
class Gravity_Body {
  constructor(name, x, y, vx=0, vy=0, ax=0, ay=0, size=50, mass=1000, color=[random(0, 255), random(0, 255), random(0, 255), 0]) {
    this.name = name;
    this.location = [x, y];
    this.speed = [vx, vy];
    this.acceleration = [ax, ay];
    this.size = size;
    this.mass = mass;
    this.color = color;
    this.tBool = false; //transparency boolean
    if(name === "Gravity Sink")
      this.blackHoleBool = true;
    else {
      this.blackHoleBool = false;
    }
  }
  update() {
    this.location[0] += this.speed[0];
    this.location[1] += this.speed[1];
    //only move if not black hole
    if(this.blackHoleBool === false) {
      this.speed[0] += this.acceleration[0];
      this.speed[1] += this.acceleration[1];
    }

    //wall collision
    // if(this.location[0] < 0 || this.location[0] > bounds[0])
    //   this.speed[0] = -this.speed[0];
    // if(this.location[1] < 0 || this.location[1] > bounds[1])
    //   this.speed[1] = -this.speed[1];

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
    //stroke(255,0,0);
    //line(this.location[0], this.location[1], this.location[0] + this.acceleration[0]*100, this.location[1] + this.acceleration[1]*100);
    //stroke(0,255,0);
    //line(this.location[0], this.location[1], this.location[0] + this.speed[0]*5, this.location[1] + this.speed[1]*5);

    //reset accel vector for next run
    this.acceleration[0] = 0;
    this.acceleration[1] = 0;
  }
  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
    ellipse(this.location[0], this.location[1], this.size);
  }
  applyForce(other) {
    //normalize the vector using the magnitude of the distance
    let dx = this.location[0]-other.location[0];
    let dy = this.location[1]-other.location[1];
    let mag = 0;
    if (dx != 0 || dy != 0) {
      mag = -Math.sqrt(dx*dx + dy*dy);
    }
    let xcomp = dx/mag; //ratio of the accel in the x dir
    let ycomp = dy/mag; //ratio of the accel in the y dir
    let accel = 6.67*other.mass/(mag*mag);  //acceleration of gravity w/o 10^-12 power
    //acceleration limit
    if(accel > .5)
      accel = .5;
    this.acceleration[0] += xcomp*accel;
    this.acceleration[1] += ycomp*accel;
  }
}
