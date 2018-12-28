/**
 * [description]
 */
var Mass = {

  /**
   * Set the mass.
   * @param {number} value - [description]
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setMass: function(value) {
    this.body.mass = value;
    this.body.updateMassProperties();

    return this;
  },
};

module.exports = Mass;
