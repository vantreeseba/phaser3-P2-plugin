var World = require('./World');
var Factory = require('./Factory');

/**
 * P2PhysicsPlugin
 * @memberOf Phaser.Physics
 */
class P2PhysicsPlugin {
  /**
   * Setup the P2Physics plugin.
   * @param {Phaser.Scene} scene The scene the plugin is attached to.
   */
  constructor(scene){
    this.scene = scene;
    this.systems = scene.sys;
    this.config = this.getConfig();
    this.world;
    this.add;

    scene.sys.events.once('boot', this.boot, this);
    scene.sys.events.on('start', this.start, this);
  }

  /**
   * This method is called automatically, only once, when the Scene is first created.
   * Do not invoke it directly.
   *
   * @private
   */
  boot() {
    this.world = new World(this.scene, this.config);
    this.add = new Factory(this.world);

    this.systems.events.once('destroy', this.destroy, this);
  }

  /**
   * This method is called automatically by the Scene when it is starting up.
   * It is responsible for creating local systems, properties and listening for Scene events.
   * Do not invoke it directly.
   *
   * @private
   */
  start() {
    if (!this.world) {
      this.world = new World(this.scene, this.config);
      this.add = new Factory(this.world);
    }

    var eventEmitter = this.systems.events;

    eventEmitter.on('update', this.world.update, this.world);
    eventEmitter.on('postupdate', this.world.postUpdate, this.world);
    eventEmitter.once('shutdown', this.shutdown, this);
  }

  /**
   * Get the configuration for this plugin.
   * @return {Object} The configuration object.
   */
  getConfig() {
    var gameConfig = this.systems.game.config.physics;
    var sceneConfig = this.systems.settings.physics;

    return Object.assign({}, sceneConfig.p2 || {}, gameConfig.p2 || {});
  }

  /**
   * Pause the physics simulation.
   */
  pause() {
    return this.world.pause();
  }

  /**
   * Resume the physics simulation.
   */
  resume() {
    return this.world.resume();
  }

  /**
   * Manually advances the physics simulation by one iteration.
   */
  step(delta, timeSinceLastUpdate, maxSubSteps) {
    this.world.step(delta, timeSinceLastUpdate, maxSubSteps);
  }

  /**
   * The Scene that owns this plugin is shutting down.
   * We need to kill and reset all internal properties as well as stop listening to Scene events.
   * @private
   */
  shutdown() {
    var eventEmitter = this.systems.events;

    eventEmitter.off('update', this.world.update, this.world);
    eventEmitter.off('postupdate', this.world.postUpdate, this.world);
    eventEmitter.off('shutdown', this.shutdown, this);

    this.add.destroy();
    this.world.destroy();

    this.add = null;
    this.world = null;
  }

  /**
   * The Scene that owns this plugin is being destroyed.
   * We need to shutdown and then kill off all external references.
   * @private
   */
  destroy() {
    this.shutdown();

    this.scene.sys.events.off('start', this.start, this);

    this.scene = null;
    this.systems = null;
  }

}

module.exports = P2PhysicsPlugin;
