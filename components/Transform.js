var MATH_CONST = {
  RAD_TO_DEG: 180 / Math.PI,
  DEG_TO_RAD: Math.PI / 180,
};
var Wrap = Phaser.Math.Angle.Wrap;
var WrapDegrees = Phaser.Math.Angle.WrapDegrees;

/**
 * Transform Component
 */
var Transform = {
  /**
   * [description]
   * @type {number}
   */
  x: {
    get: function() {
      return this.body.position[0];
    },
    set: function(value) {
      this.body.position[0] = value;
    }
  },
  /**
   * [description]
   * @type {number}
   */
  y: {
    get: function() {
      return this.body.position[1];
    },
    set: function(value) {
      this.body.position[1] = value;
    }
  },
  /**
   * [description]
   * @type {number}
   */
  scaleX: {
    get: function() {
      return this._scaleX;
    },
    set: function(value) {
      this._scaleX = value;
    }
  },
  /**
   * [description]
   * @type {number}
   */
  scaleY: {
    get: function() {
      return this._scaleY;
    },
    set: function(value) {
      this._scaleY = value;
    }
  },
  /**
   * [description]
   *
   * @name Phaser.Physics.P2.Components.Transform#angle
   * @type {number}
   * @since 3.0.0
   */
  angle: {
    get: function() {
      return WrapDegrees(this.body.angle * MATH_CONST.RAD_TO_DEG);
    },
    set: function(value) {
      this.body.rotation = WrapDegrees(value) * MATH_CONST.DEG_TO_RAD;
    }
  },
  /**
   * [description]
   *
   * @name Phaser.Physics.P2.Components.Transform#rotation
   * @type {number}
   * @since 3.0.0
   */
  rotation: {
    get: function() {
      return this.body.angle;
    },
    set: function(value) {
      this._rotation = Wrap(value);
      this.body.angle = this._rotation;
    }
  },
  /**
   * [description]
   * @param {number} [x=0] - [description]
   * @param {number} [y=x] - [description]
   *
   * @return{Phaser.GameObjects.GameObject} This Game Object.
   */
  setPosition: function(x, y) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = x;
    }

    this.body.position[0] = x;

    return this;
  },
  /**
   * [description]
   * @param {number} [radians=0] - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setRotation: function(radians) {
    if (radians === undefined) {
      radians = 0;
    }

    this._rotation = Wrap(radians);
    this.body.rotation = this._rotation;

    return this;
  },
  /**
   * [description]
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setFixedRotation: function() {
    this.body.fixedRotation = true;
    return this;
  },
  /**
   * [description]
   * @param {number} [degrees=0] - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setAngle: function(degrees) {
    if (degrees === undefined) {
      degrees = 0;
    }

    this.angle = degrees;

    this.body.rotation = MATH_CONST.RAD_TO_DEG * this.angle;

    return this;
  },
};

module.exports = Transform;
