/**
 * Component controlling the bodies sleep settings.
 * @name Phaser.Physics.Matter.Components.Sleep
 * @since 3.0.0
 */
var Sleep = {
  /**
   * [description]
   * @param {boolean} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setSleepStartEvent: function(value) {
    if (value) {
      this.body.on('sleep', value);
    }

    return this;
  },
  /**
   * [description]
   * @param {boolean} value - [description]
   *
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setSleepEndEvent: function(value) {
    if (value) {
      this.body.on('wakeup', value);
    }

    return this;
  },
  /**
   * Set the sleep time limit.
   * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
   * @param {number} [value=1] - sleepTimeLimit in seconds.
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setSleepTimeLimit: function(value) {
    if (value === undefined) {
      value = 1;
    }

    this.body.sleepTimeLimit = value;

    return this;
  },
  /**
   * Set the sleep speed limit.
   * If the speed (the norm of the velocity) is smaller than this value,
   * the body is considered sleepy.
   * @param {number} [value=0.2] The sleep speed limit.
   * @return {Phaser.GameObjects.GameObject} This Game Object.
   */
  setSleepSpeedLimit: function(value) {
    if (value === undefined) {
      value = 0.2;
    }

    this.body.sleepSpeedLimit = value;

    return this;
  },
  /**
   * Get the sleep state of the body.
   * @return {Boolean} Is the body sleeping.
   */
  isSleeping: function() {
    return this.body.sleepState === this.body.SLEEPING;
  },
  /**
   * Get the sleep state of the body.
   * @return {Boolean} Is the body sleeping.
   */
  isSleepy: function() {
    return this.body.sleepState === this.body.SLEEPY;
  }
};

module.exports = Sleep;
