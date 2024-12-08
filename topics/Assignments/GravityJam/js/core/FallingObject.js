/**
 * FallingObject
 * 
 * Represents a single falling object subject to forces and gravity.
 * It's displayed with a sprite and can be nudged by player input.
 */

"use strict";

class FallingObject {
  /**
   * @param {number} x - Initial x-position of the object
   * @param {number} y - Initial y-position of the object
   * @param {p5.Image} sprite - The image representing this object visually
   */
  constructor(x, y, sprite) {
    // Position and movement vectors
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    // Sprite for drawing the object
    this.sprite = sprite;

    // Physical attributes
    this.mass = 1;   // Default mass
    this.size = 32;  // Default size (in pixels)
  }

  /**
   * Applies a given force vector to the object, adjusting its acceleration.
   * @param {p5.Vector} force - The force to apply
   */
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  /**
   * Updates the object's velocity and position based on acceleration,
   * then resets acceleration to 0 for the next frame.
   */
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
  }

  /**
   * Draws the object at its current position with its sprite centered.
   */
  display() {
    image(this.sprite, this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
  }

  /**
   * Checks if the object's bottom edge is within the target area bounds.
   * @param {number} targetX - X position of target area
   * @param {number} targetY - Y position of target area
   * @param {number} targetW - Width of target area
   * @param {number} targetH - Height of target area
   * @returns {boolean} - True if landed, false otherwise
   */
  isLanded(targetX, targetY, targetW, targetH) {
    let bottom = this.position.y + this.size / 2;
    let withinX = this.position.x > targetX && this.position.x < targetX + targetW;
    let withinY = bottom >= targetY && bottom <= targetY + targetH;
    return withinX && withinY;
  }
}
