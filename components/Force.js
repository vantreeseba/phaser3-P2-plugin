var Force = {
  /**
   * [description]
   * @param {Phaser.Math.Vector2} force - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  applyForce: function(force) {
    this.body.applyForce(force);
    return this;
  },

  /**
   * [description]
   * @param {Phaser.Math.Vector2} position - [description]
   * @param {Phaser.Math.Vector2} force - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  applyForceFrom: function(position, force) {
    this.body.applyForce(force, position);
    return this;
  },

  /**
   * [description]
   * @param {number} speed - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  thrust: function(speed) {
    var angle = this.body.angle;
    this.body.applyForce([speed * Math.cos(angle), speed * Math.sin(angle)]);

    return this;
  },

  /**
   * [description]
   * @param {number} speed - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  thrustLeft: function(speed) {
    var angle = this.body.angle - Math.PI / 2;
    this.body.applyForce([speed * Math.cos(angle), speed * Math.sin(angle)]);

    return this;
  },

  /**
   * [description]
   * @param {number} speed - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  thrustRight: function(speed) {
    var angle = this.body.angle + Math.PI / 2;
    this.body.applyForce([speed * Math.cos(angle), speed * Math.sin(angle)]);

    return this;
  },

  /**
   * [description]
   * @param {number} speed - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  thrustBack: function(speed) {
    var angle = this.body.angle - Math.PI;
    this.body.applyForce([speed * Math.cos(angle), speed * Math.sin(angle)]);

    return this;
  },

  /**
   * [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setZeroForce: function() {
    this.body.setZeroForce();
    return this;
  }
};

module.exports = Force;
