/**
 * [description]
 */
var Friction = {

  /**
   * [description]
   * @param {number} [air] - [description]
   * @param {number} [fstatic] - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setFriction: function(value, air, fstatic) {
    this.body.friction = value;

    if (air !== undefined) {
      this.body.frictionAir = air;
    }

    if (fstatic !== undefined) {
      this.body.frictionStatic = fstatic;
    }

    return this;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Components.Friction#setFrictionAir
   * @since 3.0.0
   *
   * @param {number} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setFrictionAir: function(value) {
    this.body.frictionAir = value;

    return this;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Components.Friction#setFrictionStatic
   * @since 3.0.0
   *
   * @param {number} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setFrictionStatic: function(value) {
    this.body.frictionStatic = value;

    return this;
  }

};

module.exports = Friction;
