/**
 * [description]
 *
 * @name Phaser.Physics.P2.Components.Velocity
 * @since 3.0.0
 */
var Velocity = {

  /**
   * [description]
   * @param {number} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setAngularVelocity: function(value) {
    this.body.angularVelocity = value;

    return this;
  },

  /**
   * [description]
   * @param {number} x - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setVelocityX: function(x) {
    this.body.velocity[0] = x;
    return this;
  },

  /**
   * [description]
   * @param {number} y - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setVelocityY: function(y) {
    this.velocity[1] = y;
    return this;
  },

  /**
   * [description]
   * @param {number} x - [description]
   * @param {number} [y=x] - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setVelocity: function(x, y) {
    this.body.velocity[0] = x;
    this.body.velocity[1] = y;

    return this;
  }
};

module.exports = Velocity;
