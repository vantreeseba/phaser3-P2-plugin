var p2 = require('p2');

var Body = p2.Body;
var Box = p2.Box;
var Circle = p2.Circle;
var Capsule = p2.Capsule;
/**
 * [description]
 */
var SetBody = {

  //  Calling any of these methods resets previous properties you may have set on the body, including plugins, mass, etc

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.Components.SetBody#setRectangle
     * @since 3.0.0
     *
     * @param {number} width - [description]
     * @param {number} height - [description]
     * @param {object} options - [description]
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
  setRectangle: function(width, height, options) {
    this.clearShapes();
    return this.setBody({type: 'rectangle', width: width, height: height}, options);
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.Components.SetBody#setCircle
     * @since 3.0.0
     *
     * @param {number} radius - [description]
     * @param {object} options - [description]
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
  setCircle: function(radius, options) {
    this.clearShapes();
    return this.setBody({type: 'circle', radius}, options);
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.Components.SetBody#setPolygon
     * @since 3.0.0
     *
     * @param {number} radius - [description]
     * @param {number} sides - [description]
     * @param {object} options - [description]
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
  setVerts: function(verts, options) {
    this.clearShapes();
    return this.setBody({type: 'fromVerts', verts}, options);
  },

  /**
     * [description]
     *
     * @method Phaser.Physics.Matter.Components.SetBody#setExistingBody
     * @since 3.0.0
     *
     * @param {MatterJS.Body} body - [description]
     * @param {boolean} [addToWorld=true] - [description]
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
  setExistingBody: function(shape, type) {
    if(!this.body) {
      this.body = new Body({
        mass: 1,
      });

      this.world.world.addBody(this.body);
    }

    this.body.gameObject = this;
    if(type !== 'fromVerts') {
      this.body.addShape(shape);
    }

    return this;
  },

  clearShapes: function(){
    if(!this.body) {
      return;
    }

    var i = this.body.shapes.length;

    while (i--) {
      this.body.removeShape(this.body.shapes[i]);
    }
  },
  addRectangle: function(width, height, offsetX, offsetY) {
    var shape = new Box({width, height});

    this.body.addShape(shape, [offsetX, offsetY], 0);

    return shape;
  },
  addCircle: function(radius, offsetX, offsetY) {
    var shape = new Circle({radius});

    this.body.addShape(shape, [offsetX, offsetY], 0);

    return shape;
  },
  addCapsule: function(width, height, offsetX, offsetY) {
    var shape = new Capsule({width, height});

    this.body.addShape(shape, [offsetX, offsetY], 0);

    return shape;
  },

  /**
   * [description]
   * @param {object} config - [description]
   * @param {object} options - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setBody: function(config, options) {
    if (!config) {
      return this;
    }

    var shape;

    //  Allow them to do: shape: 'circle' instead of shape: { type: 'circle' }
    if (typeof config === 'string'){
      config = {type: config};
    }

    var type = config.type || 'rectangle';
    var x = config.x || 0;
    var y = config.y || 0;
    var width = config.width || this.width;
    var height = config.height || this.height;

    switch (type) {
      // case 'fromVerts':
      case 'rectangle':
        shape = new Box({width, height});
        break;

      case 'capsule':
        shape = new Capsule({width, height});
        break;

      case 'circle':
        var radius = GetFastValue(config, 'radius', Math.max(width, height) / 2);
        shape = new Circle({radius});
        break;

        // case 'trapezoid':
        //     var slope = GetFastValue(config, 'slope', 0.5);
        //     body = Bodies.trapezoid(bodyX, bodyY, bodyWidth, bodyHeight, slope, options);
        //     break;

        // case 'polygon':
        //     var sides = GetFastValue(config, 'sides', 5);
        //     var pradius = GetFastValue(config, 'radius', Math.max(bodyWidth, bodyHeight) / 2);
        //     body = Bodies.polygon(bodyX, bodyY, sides, pradius, options);
        //     break;

        // case 'fromVertices':
      case 'fromVerts':
        var verts = GetFastValue(config, 'verts', []);

        if (this.body) {
          var created = this.body.fromPolygon(verts);
          shape = this.body.shapes[0];
        }
        // else
        // {
        // var flagInternal = GetFastValue(config, 'flagInternal', false);
        // var removeCollinear = GetFastValue(config, 'removeCollinear', 0.01);
        // var minimumArea = GetFastValue(config, 'minimumArea', 10);
        // body = Bodies.fromVertices(bodyX, bodyY, verts, options, flagInternal, removeCollinear, minimumArea);
        // }
        break;

            // case 'fromPhysicsEditor':
            //     body = PhysicsEditorParser.parseBody(bodyX, bodyY, bodyWidth, bodyHeight, config);
            //     break;
    }


    shape.position[0] = x;
    shape.position[1] = y;
    this.setExistingBody(shape, type);

    return this;
  }

};

module.exports = SetBody;
