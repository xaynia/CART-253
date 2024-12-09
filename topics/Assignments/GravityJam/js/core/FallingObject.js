/**
 * Represents a single falling object subject to forces and gravity.
 * It's displayed with a sprite and can be nudged by player input.
 */

"use strict";

class FallingObject {
  /**
   * Creates the falling object with position and sprite.
   * @param {number} x The initial x-position.
   * @param {number} y The initial y-position.
   * @param {p5.Image} sprite The image for the object.
   */
  constructor(x, y, sprite) {
    // Position and movement vectors
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    // Sprite for the object
    this.sprite = sprite;

    // Physical attributes
    this.mass = 1;
    this.size = 32;
  }

  /**
   * Applies a force to the object that affects its acceleration.
   * @param {p5.Vector} force The force vector.
   */
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  /**
   * Updates the object's position and velocity based on acceleration.
   */
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  /**
   * Draws the object at its current position.
   */
  display() {
    image(this.sprite, this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
  }

  /**
   * Checks if the object's bottom edge is within the target area.
   * @param {number} targetX Target area's x position.
   * @param {number} targetY Target area's y position.
   * @param {number} targetW Target area's width.
   * @param {number} targetH Target area's height.
   * @returns {boolean} True if landed on target.
   */
  isLanded(targetX, targetY, targetW, targetH) {
    let bottom = this.position.y + this.size / 2;
    let withinX = this.position.x > targetX && this.position.x < targetX + targetW;
    let withinY = bottom >= targetY && bottom <= targetY + targetH;
    return withinX && withinY;
  }
}
