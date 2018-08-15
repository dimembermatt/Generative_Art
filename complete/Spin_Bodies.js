//this class represents elliptical objects that are given a projected movement.
//each instance is not affected by other objects of the class.
class Spin_Body {
  constructor(name, x, y, vx=0, vy=0, ax=0, ay=0, size, mass) {
    this.name = name;
    this.location = [x, y];
    this.speed = [vx, vy];
    this.acceleration = [ax, ay];
    this.size = size;
    this.mass = mass;
    this.color = [random(0, 255), random(0, 255), random(0, 255), 5];
    this.tBool = false; //transparency boolean
  }
  update() {
    this.location[0] += this.speed[0];
    this.location[1] += this.speed[1];
    this.speed[0] += this.acceleration[0];
    this.speed[1] += this.acceleration[1];
    this.acceleration[0] *= .99;
    this.acceleration[1] *= .99;

    //wall collision
    if(this.location[0] < 0 || this.location[0] > bounds[0])
      this.speed[0] = -this.speed[0];
    if(this.location[1] < 0 || this.location[1] > bounds[1])
      this.speed[1] = -this.speed[1];

    //transparency
    if(this.tBool === true)
      this.color[3] -= 5;
    else
      this.color[3] += 5;

    if(this.color[3] === 255)
      this.tBool = true;
    if(this.color[3] === 0)
      this.tBool = false;
  }
  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
    ellipse(this.location[0], this.location[1], this.size);
  }
}
