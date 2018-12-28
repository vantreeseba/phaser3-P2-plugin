var Components = require('./components');

var Class = Phaser.Class;
var GameObject = Phaser.GameObjects.GameObject;
var Image = Phaser.GameObjects.Image;
var Pipeline = Phaser.GameObjects.Components.Pipeline;

/**
 * @classdesc
 * A P2 Physics Image Game Object.
 *
 * An Image is a light-weight Game Object useful for the display of static images in your game,
 * such as logos, backgrounds, scenery or other non-animated elements. Images can have input
 * events and physics bodies, or be tweened, tinted or scrolled. The main difference between an
 * Image and a Sprite is that you cannot animate an Image as they do not have the Animation component.
 *
 * @extends Phaser.Physics.Matter.Components.Bounce
 * @extends Phaser.Physics.Matter.Components.Collision
 * @extends Phaser.Physics.Matter.Components.Force
 * @extends Phaser.Physics.Matter.Components.Friction
 * @extends Phaser.Physics.Matter.Components.Gravity
 * @extends Phaser.Physics.Matter.Components.Mass
 * @extends Phaser.Physics.Matter.Components.Sensor
 * @extends Phaser.Physics.Matter.Components.SetBody
 * @extends Phaser.Physics.Matter.Components.Sleep
 * @extends Phaser.Physics.Matter.Components.Static
 * @extends Phaser.Physics.Matter.Components.Transform
 * @extends Phaser.Physics.Matter.Components.Velocity
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Size
 * @extends Phaser.GameObjects.Components.Texture
 * @extends Phaser.GameObjects.Components.Tint
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Physics.Matter.World} world - [description]
 * @param {number} x - The horizontal position of this Game Object in the world.
 * @param {number} y - The vertical position of this Game Object in the world.
 * @param {string} texture - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param {(string|integer)} [frame] - An optional frame from the Texture this Game Object is rendering with.
 * @param {object} [options={}] - Matter.js configuration object.
 */
var P2Image = new Class({
  Extends: Image,
  Mixins: [
    Components.Bounce,
    Components.Collision,
    Components.Force,
    Components.Friction,
    Components.Gravity,
    Components.Mass,
    Components.Sensor,
    Components.SetBody,
    Components.Sleep,
    Components.Static,
    Components.Transform,
    Components.Velocity,
    Pipeline
  ],
  initialize:
    function P2Image(world, x, y, texture, frame, options) {
      GameObject.call(this, world.scene, 'Image');

      this.setTexture(texture, frame);
      this.setSizeToFrame();
      this.setOrigin();

      this.world = world;

      var shape = options && options.shape || null;

      if (shape) {
        this.setBody(shape, options);
      } else {
        this.setRectangle(this.width, this.height, options);
      }

      this.setPosition(x, y);

      this.initPipeline('TextureTintPipeline');
    }

});

module.exports = P2Image;