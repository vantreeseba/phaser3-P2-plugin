/**
 * [description]
 */
var Gravity = {
  /**
   * [description]
   * @param {boolean} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setIgnoreGravity: function(value) {
    this.body.gravityScale = value ? 0 : 1;
    return this;
  },

  /**
   * Set the scale of the gravity, 1 is normal, 0 is no gravity, -1 is inverse.
   *
   * @param {Number} value The gravity scale.
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setGravityScale: function(value) {
    this.body.gravityScale = value;
    return this;
  }

};

module.exports = Gravity;
