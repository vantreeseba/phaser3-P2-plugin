/**
 * A component that allows setting / removing sensor status on a bodies shapes.
 */
var Sensor = {

  /**
   * Set whether the body is a sensor or not.
   * @param {boolean} isSensor
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setSensor: function(isSensor) {
    this.body.shapes.forEach(x => x.sensor = isSensor);

    return this;
  },

  /**
   * Returns true if the body has any shapes set to be a sensor.
   * @return {boolean} Does the body have any sensor shapes.
   */
  isSensor: function() {
    return this.body.shapes.some(x => x.sensor);
  }
};

module.exports = Sensor;
