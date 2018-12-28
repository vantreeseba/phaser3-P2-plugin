/**
 * @name Phaser.Physics.Matter.Components.Static
 */
var Type = {
  setType: function(type) {
    this.body.type = type;
    return this;
  },
  /**
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setStatic: function() {
    this.body.type = this.body.STATIC;
    return this;
  },

  setDynamic: function() {
    this.body.type = this.body.DYNAMIC;
    return this;
  },

  setKinematic: function() {
    this.body.type = this.body.KINEMATIC;
    return this;
  },

  /**
   * [description]
   *
   * @return {boolean} [description]
   */
  isStatic: function() {
    return this.body.type === this.body.STATIC;
  },

  isDynamic: function() {
    return this.body.type === this.body.STATIC;
  },
  isKinematic: function() {
    return this.body.type === this.body.KINEMATIC;
  }
};

module.exports = Type;
