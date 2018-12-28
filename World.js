var EventEmitter = require('eventemitter3');
var p2 = require('p2');
var Body = p2.Body;
var P2World = p2.World;
var Capsule = p2.Capsule;
var Circle = p2.Circle;
var GetValue = Phaser.Utils.Objects.GetValue;

/**
 * @classdesc
 * [description]
 *
 * @class World
 * @extends Phaser.Events.EventEmitter
 * @memberOf Phaser.Physics.Matter
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - [description]
 * @param {object} config - [description]
 */
var World = new Phaser.Class({

  Extends: EventEmitter,
  initialize:
    function World(scene, config) {
      EventEmitter.call(this);

      this.scene = scene;
      this.world = new P2World;

      var gravity = GetValue(config, 'gravity', null);

      if (gravity) {
        this.setGravity(gravity.x, gravity.y);
      }

      this.enabled = GetValue(config, 'enabled', true);

      /**
       * Automatically call Engine.update every time the game steps.
       * If you disable this then you are responsible for calling `World.step` directly from your game.
       * If you call `set60Hz` or `set30Hz` then `autoUpdate` is reset to `true`.
       */
      this.autoUpdate = GetValue(config, 'autoUpdate', false);
      this.drawDebug = GetValue(config, 'debug', false);
      this.debugGraphic;
      this.defaults = {
        debugShowBody: GetValue(config, 'debugShowBody', true),
        debugShowStaticBody: GetValue(config, 'debugShowStaticBody', true),
        debugShowVelocity: GetValue(config, 'debugShowVelocity', true),
        bodyDebugColor: GetValue(config, 'debugBodyColor', 0xff00ff),
        staticBodyDebugColor: GetValue(config, 'debugBodyColor', 0x0000ff),
        velocityDebugColor: GetValue(config, 'debugVelocityColor', 0x00ff00),
        debugShowJoint: GetValue(config, 'debugShowJoint', true),
        jointDebugColor: GetValue(config, 'debugJointColor', 0x000000)
      };

      if (this.drawDebug) {
        this.createDebugGraphic();
      }

      this.setEventsProxy();
    },

  /**
   * Setup events from P2 back to Phaser.
   */
  setEventsProxy: function() {
    var self = this;

    this.world.on('postStep', function(event) {
      self.emit('afterupdate', event);
    });

    this.world.on('beginContact', function(event) {
      var bodyA = event.bodyA;
      var bodyB = event.bodyB;

      var objectA = bodyA.gameObject ? bodyA.gameObject : bodyA;
      var objectB = bodyB.gameObject ? bodyB.gameObject : bodyB;

      self.emit('collisionstart', event, objectA, objectB);
      if(bodyA.gameObject) {
        bodyA.gameObject.emit('collisionstart', objectB, objectA);
      }
      if(bodyB.gameObject) {
        bodyB.gameObject.emit('collisionstart', objectA, objectB);
      }
    });

    this.world.on('endContact', function(event) {
      var bodyA = event.bodyA;
      var bodyB = event.bodyB;

      var objectA = bodyA.gameObject ? bodyA.gameObject : bodyA;
      var objectB = bodyB.gameObject ? bodyB.gameObject : bodyB;

      self.emit('collisionend', event, objectA, objectB);
      if(bodyA.gameObject) {
        bodyA.gameObject.emit('collisionend', objectA, objectB);
      }
      if(bodyB.gameObject) {
        bodyB.gameObject.emit('collisionend', objectB, objectA);
      }
    });
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#createDebugGraphic
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.Graphics} [description]
     */
  createDebugGraphic: function() {
    var graphic = this.scene.sys.add.graphics({x: 0, y: 0});

    graphic.setDepth(Number.MAX_VALUE);

    this.debugGraphic = graphic;

    this.drawDebug = true;

    return graphic;
  },

  /**
     * [description]
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  disableGravity: function() {
    this.world.gravity[0] = 0;
    this.world.gravity[1] = 0;

    return this;
  },

  /**
     * [description]
     * @param {number} [x=0] - [description]
     * @param {number} [y=1] - [description]
     *
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  setGravity: function(x, y) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 1;
    }

    this.world.gravity[0] = x;
    this.world.gravity[1] = y;

    return this;
  },

  /**
     * [description]
     * @param {number} x - [description]
     * @param {number} y - [description]
     * @param {number} width - [description]
     * @param {number} height - [description]
     * @param {object} options - [description]
     *
     * @return {MatterJS.Body} [description]
     */
  create: function(x, y, width, height, options) {
    var body = new Body({
      position: [x,y]
    });

    this.world.add(body);

    return body;
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#add
     * @since 3.0.0
     *
     * @param {(object|object[])} object - Can be single or an array, and can be a body, composite or constraint
     *
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  add: function(object) {
    this.world.addBody(object);

    return this;
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#remove
     * @since 3.0.0
     *
     * @param {object} object - The object to be removed from the world.
     * @param {boolean} deep - [description]
     *
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  remove: function(object, deep) {
    var body = (object.body) ? object.body : object;

    this.world.removeBody(body);

    return this;
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#pause
     * @since 3.0.0
     *
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  pause: function() {
    this.enabled = false;

    this.emit('pause');

    return this;
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#resume
     * @since 3.0.0
     *
     * @return {Phaser.Physics.Matter.World} This Matter World object.
     */
  resume: function() {
    this.enabled = true;

    this.emit('resume');

    return this;
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#update
     * @since 3.0.0
     *
     * @param {number} time - [description]
     * @param {number} delta - [description]
     */
  update: function(time, delta) {
    if (this.enabled && this.autoUpdate) {
      this.world.step(1/60);
    }
  },

  /**
     * Manually advances the physics simulation by one iteration.
     *
     * You can optionally pass in the `delta` and `correction` values to be used by Engine.update.
     * If undefined they use the Matter defaults of 60Hz and no correction.
     *
     * Calling `step` directly bypasses any checks of `enabled` or `autoUpdate`.
     *
     * It also ignores any custom `getDelta` functions, as you should be passing the delta
     * value in to this call.
     *
     * You can adjust the number of iterations that Engine.update performs internally.
     * Use the Scene Matter Physics config object to set the following properties:
     *
     * positionIterations (defaults to 6)
     * velocityIterations (defaults to 4)
     * constraintIterations (defaults to 2)
     *
     * Adjusting these values can help performance in certain situations, depending on the physics requirements
     * of your game.
     *
     * @method Phaser.Physics.Matter.World#step
     * @since 3.4.0
     *
     * @param {number} [delta=16.666] - [description]
     * @param {number} [correction=1] - [description]
     */
  step: function(delta, timeSinceLastUpdate, maxSubSteps) {
    this.world.step(delta, timeSinceLastUpdate, maxSubSteps);
  },

  /**
    * Convert p2 physics value (meters) to pixel scale and inverses it.
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#mpxi
    * @param {number} v - The value to convert.
    * @return {number} The scaled value.
    */
  mpxi: function(v) {
    return v *= -20;
  },

  /**
    * Convert pixel value to p2 physics scale (meters) and inverses it.
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#pxmi
    * @param {number} v - The value to convert.
    * @return {number} The scaled value.
    */
  pxmi: function(v) {
    return v * -0.05;
  },

  drawCapsule: function(g, x, y, angle, len, radius) {

    // Draw circles at ends
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    // g.beginFill(fillColor, 1);
    g.strokeCircle(-len / 2 * c + x, -len / 2 * s + y, -radius * 2);
    g.strokeCircle(len / 2 * c + x, len / 2 * s + y, -radius * 2);
    // g.endFill();

    // Draw rectangle
    // g.beginFill(fillColor, 1);
    g.moveTo(-len / 2 * c + radius * s + x, -len / 2 * s + radius * c + y);
    g.lineTo(len / 2 * c + radius * s + x, len / 2 * s + radius * c + y);
    g.lineTo(len / 2 * c - radius * s + x, len / 2 * s - radius * c + y);
    g.lineTo(-len / 2 * c - radius * s + x, -len / 2 * s - radius * c + y);
    // g.endFill();

    // Draw lines in between
    g.moveTo(-len / 2 * c + radius * s + x, -len / 2 * s + radius * c + y);
    g.lineTo(len / 2 * c + radius * s + x, len / 2 * s + radius * c + y);
    g.moveTo(-len / 2 * c - radius * s + x, -len / 2 * s - radius * c + y);
    g.lineTo(len / 2 * c - radius * s + x, len / 2 * s - radius * c + y);
    g.strokePath();

  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#postUpdate
     * @since 3.0.0
     */
  postUpdate: function() {
    if (!this.drawDebug) {
      return;
    }
    if (!this.debugGraphic) {
      this.createDebugGraphic();
    }

    var graphics = this.debugGraphic;
    var bodies = this.world.bodies;

    graphics.clear();
    graphics.lineStyle(1, this.defaults.bodyDebugColor);
    graphics.beginPath();

    var i, j;

    for (i = 0; i < bodies.length; i++) {
      const curBody = bodies[i];
      const curGO = curBody.gameObject;
      if (!bodies[i].gameObject.visible) {
        continue;
      }

      // Handle polygons.
      if (bodies[i].concavePath) {
        var [x, y] = curBody.position;
        var xRot = Math.cos(curBody.angle);
        var yRot = Math.sin(curBody.angle);
        var vertices = bodies[i].concavePath;

        graphics.moveTo(x + ((vertices[0][0] * xRot) - (vertices[0][1] * yRot)), y + ((vertices[0][0] * yRot) + (vertices[0][1] * xRot)));

        for (var k = 1; k < vertices.length; k++) {
          graphics.lineTo(x + ((vertices[k][0] * xRot) - (vertices[k][1] * yRot)), y + ((vertices[k][0] * yRot) + (vertices[k][1] * xRot)));
        }

        graphics.lineTo(x + ((vertices[0][0] * xRot) - (vertices[0][1] * yRot)), y + ((vertices[0][0] * yRot) + (vertices[0][1] * xRot)));

        graphics.strokePath();

        continue;
      }

      // Handle drawing both single bodies and compound bodies. If compound, draw both the
      // convex hull (first part) and the rest of the bodies.
      for (j = 0; j < bodies[i].shapes.length; j++) {
        var shape = bodies[i].shapes[j];
        var [x, y] = curBody.position;

        // Draw capsules.
        if (shape instanceof Capsule) {
          this.drawCapsule(graphics, x + shape.position[0], y + shape.position[1], curBody.angle, 1, curGO.displayWidth / 2);
          continue;
        }

        // IS A CIRCLE, FIX DRAWING
        if (shape instanceof Circle) {
          graphics.strokeCircle(x + shape.position[0], y + shape.position[1], shape.radius);
          continue;
        }

        var vertices = shape.vertices.map(function(vert) {
          return [vert[0] + shape.position[0], vert[1] + shape.position[1]];
        });
        var xRot = Math.cos(curBody.angle);
        var yRot = Math.sin(curBody.angle);

        graphics.moveTo(x + ((vertices[0][0] * xRot) - (vertices[0][1] * yRot)), y + ((vertices[0][0] * yRot) + (vertices[0][1] * xRot)));

        for (var k = 1; k < vertices.length; k++) {
          graphics.lineTo(x + ((vertices[k][0] * xRot) - (vertices[k][1] * yRot)), y + ((vertices[k][0] * yRot) + (vertices[k][1] * xRot)));
        }

        graphics.lineTo(x + ((vertices[0][0] * xRot) - (vertices[0][1] * yRot)), y + ((vertices[0][0] * yRot) + (vertices[0][1] * xRot)));

        graphics.strokePath();
      }
    }

    graphics.closePath();

    // if (this.defaults.debugShowJoint)
    // {
    //     graphics.lineStyle(2, this.defaults.jointDebugColor);

    //     // Render constraints
    //     var constraints = Composite.allConstraints(this.world);

    //     for (i = 0; i < constraints.length; i++)
    //     {
    //         var constraint = constraints[i];

    //         if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
    //         {
    //             continue;
    //         }

    //         if (constraint.render.lineWidth)
    //         {
    //             graphics.lineStyle(constraint.render.lineWidth, Common.colorToNumber(constraint.render.strokeStyle));
    //         }

    //         var bodyA = constraint.bodyA;
    //         var bodyB = constraint.bodyB;
    //         var start;
    //         var end;

    //         if (bodyA)
    //         {
    //             start = Vector.add(bodyA.position, constraint.pointA);
    //         }
    //         else
    //         {
    //             start = constraint.pointA;
    //         }

    //         if (constraint.render.type === 'pin')
    //         {
    //             graphics.beginPath();
    //             graphics.arc(start.x, start.y, 3, 0, 2 * Math.PI);
    //             graphics.closePath();
    //         }
    //         else
    //         {
    //             if (bodyB)
    //             {
    //                 end = Vector.add(bodyB.position, constraint.pointB);
    //             }
    //             else
    //             {
    //                 end = constraint.pointB;
    //             }

    //             graphics.beginPath();
    //             graphics.moveTo(start.x, start.y);

    //             if (constraint.render.type === 'spring')
    //             {
    //                 var delta = Vector.sub(end, start);
    //                 var normal = Vector.perp(Vector.normalise(delta));
    //                 var coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20));
    //                 var offset;

    //                 for (j = 1; j < coils; j += 1)
    //                 {
    //                     offset = (j % 2 === 0) ? 1 : -1;

    //                     graphics.lineTo(
    //                         start.x + delta.x * (j / coils) + normal.x * offset * 4,
    //                         start.y + delta.y * (j / coils) + normal.y * offset * 4
    //                     );
    //                 }
    //             }

    //             graphics.lineTo(end.x, end.y);
    //         }

    //         if (constraint.render.lineWidth)
    //         {
    //             graphics.strokePath();
    //         }

    //         if (constraint.render.anchors)
    //         {
    //             graphics.fillStyle(Common.colorToNumber(constraint.render.strokeStyle));
    //             graphics.beginPath();
    //             graphics.arc(start.x, start.y, 6, 0, 2 * Math.PI);
    //             graphics.arc(end.x, end.y, 6, 0, 2 * Math.PI);
    //             graphics.closePath();
    //             graphics.fillPath();
    //         }
    //     }
    // }
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#shutdown
     * @since 3.0.0
     */
  shutdown: function() {
    // MatterEvents.off(this.engine);

    this.removeAllListeners();

    // MatterWorld.clear(this.world, false);

    // Engine.clear(this.engine);
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.World#destroy
     * @since 3.0.0
     */
  destroy: function() {
    this.shutdown();
  }

});

module.exports = World;
