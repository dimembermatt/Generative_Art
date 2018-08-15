//this class an area that manipulates data points or particles that represent
//of light passing between materials.
//each instance is not affected by other objects of its class.
class Refraction_Body {
  /**
   * @param position - the top left point of the Refraction_Body.
   * @param size - a 2-element list consisting of width and height.
   * @param template - a string value ("Rectangle, Ellipse, NULL") that assigns
   *  a predefined set of matrix values to the Refraction_Body.
   * @param refractionIdx - a value that is adjusted into the template that controls
   * the warping of light through the Refraction_Body.
   * @param incomingAngle - angle in degrees that the light is coming from to the normal.
   */
  constructor(position, size, template=Rectangle, refractionIdx, incomingAngle=90) {
    this.position = position;
    this.size = size;
    this.template = template;
    this.refractionIdx = refractionIdx;
    this.incomingAngle = incomingAngle;
  }

  refract() {

  }

}
