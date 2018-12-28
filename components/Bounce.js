/**
 * [description]
 *
 * @name Phaser.Physics.Matter.Components.Bounce
 * @since 3.0.0
 */
var Bounce = {
  /**
   * [description]
   * @param {number} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setBounce: function(value) {
    this.body.restitution = value;

    return this;
  }

};

module.exports = Bounce;
