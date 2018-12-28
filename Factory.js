var P2Image = require('./P2Image');

/**
 * @classdesc
 * [description]
 *
 * @param {Phaser.Physics.Matter.World} world - [description]
 */
var Factory = new Phaser.Class({
  initialize:
    function Factory(world) {
      /**
       * [description]
       *
       * @name Phaser.Physics.Matter.Factory#world
       * @type {Phaser.Physics.Matter.World}
       * @since 3.0.0
       */
      this.world = world;

      /**
       * [description]
       *
       * @name Phaser.Physics.Matter.Factory#scene
       * @type {Phaser.Scene}
       * @since 3.0.0
       */
      this.scene = world.scene;

      /**
       * A reference to the Scene.Systems this Matter Physics instance belongs to.
       *
       * @name Phaser.Physics.Matter.Factory#sys
       * @type {Phaser.Scenes.Systems}
       * @since 3.0.0
       */
      this.sys = world.scene.sys;
    },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#rectangle
   * @since 3.0.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   * @param {number} width - [description]
   * @param {number} height - [description]
   * @param {object} options - [description]
   *
   * @return {MatterJS.Body} A Matter JS Body.
   */
  rectangle: function(x, y, width, height, options) {
    var body = Bodies.rectangle(x, y, width, height, options);

    this.world.add(body);

    return body;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#trapezoid
   * @since 3.0.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   * @param {number} width - [description]
   * @param {number} height - [description]
   * @param {number} slope - [description]
   * @param {object} options - [description]
   *
   * @return {MatterJS.Body} A Matter JS Body.
   */
  trapezoid: function(x, y, width, height, slope, options) {
    var body = Bodies.trapezoid(x, y, width, height, slope, options);

    this.world.add(body);

    return body;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#circle
   * @since 3.0.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   * @param {number} radius - [description]
   * @param {object} options - [description]
   * @param {number} maxSides - [description]
   *
   * @return {MatterJS.Body} A Matter JS Body.
   */
  circle: function(x, y, radius, options, maxSides) {
    var body = Bodies.circle(x, y, radius, options, maxSides);

    this.world.add(body);

    return body;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#polygon
   * @since 3.0.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   * @param {number} sides - [description]
   * @param {number} radius - [description]
   * @param {object} options - [description]
   *
   * @return {MatterJS.Body} A Matter JS Body.
   */
  polygon: function(x, y, sides, radius, options) {
    var body = Bodies.polygon(x, y, sides, radius, options);

    this.world.add(body);

    return body;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#fromVertices
   * @since 3.0.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   * @param {array} vertexSets - [description]
   * @param {object} options - [description]
   * @param {boolean} flagInternal - [description]
   * @param {boolean} removeCollinear - [description]
   * @param {number} minimumArea - [description]
   *
   * @return {MatterJS.Body} A Matter JS Body.
   */
  fromVertices: function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
    var body = Bodies.fromVertices(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea);

    this.world.add(body);

    return body;
  },

  /**
   * [description]
   *
   * @method Phaser.Physics.Matter.Factory#image
   * @since 3.0.0
   *
   * @param {number} x - The horizontal position of this Game Object in the world.
   * @param {number} y - The vertical position of this Game Object in the world.
   * @param {string} key - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
   * @param {(string|integer)} [frame] - An optional frame from the Texture this Game Object is rendering with. Set to `null` to skip this value.
   * @param {object} [options={}] - [description]
   *
   * @return {Phaser.Physics.Matter.Image} [description]
   */
  image: function(x, y, key, frame, options) {
    var image = new P2Image(this.world, x, y, key, frame, options);

    this.sys.displayList.add(image);

    return image;
  },

  /**
   * Destroys this Factory.
   *
   * @method Phaser.Physics.Matter.Factory#destroy
   * @since 3.5.0
   */
  destroy: function() {
    this.world = null;
    this.scene = null;
    this.sys = null;
  }
});

module.exports = Factory;
