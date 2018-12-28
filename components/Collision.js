/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * [description]
 *
 * @name Phaser.Physics.Matter.Components.Collision
 * @since 3.0.0
 */
var Collision = {

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Components.Collision#setCollisionGroup
   * @since 3.0.0
   *
   * @param {number} value - Unique group index.
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setCollisionGroup: function(value) {
    this.body.shapes.forEach(shape => {
      shape.collisionGroup = value;
    });

    return this;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Components.Collision#setCollidesWith
   * @since 3.0.0
   *
   * @param {(number|number[])} categories - A unique category bitfield, or an array of them.
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setCollidesWith: function(categories) {
    var flags = 0;

    if (!Array.isArray(categories)) {
      flags = categories;
    } else {
      for (var i = 0; i < categories.length; i++) {
        flags |= categories[i];
      }
    }

    this.body.shapes.forEach(shape => shape.collisionMask = flags);

    return this;
  },

  /**
   * Gets the collision bitmask from the groups this body collides with.
   *
   * @method Phaser.Physics.P2.Body#getCollisionMask
   * @return {number} The bitmask.
   */
  getCollisionMask: function() {

    return this.body.shapes[0].collisionMask;

  },

  /**
   * Clears the collision data from the shapes in this Body. Optionally clears Group and/or Mask.
   */
  clearCollision: function() {

    this.setCollisionGroup(null);
    this.setCollidesWith(null);

    return this;

  },

};

module.exports = Collision;
