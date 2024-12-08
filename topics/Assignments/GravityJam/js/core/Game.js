/**
 * Manages a single play session of a chosen variation from Gravity Jam.
 * Handles gravity, object motion, landing detection, and drawing the scenario.
 * Shows a success message when the object lands.
 */

"use strict";

class Game {
  /**
   * @param {object} config - Variation configuration (gravity, draw functions, target info, etc.)
   */
  constructor(config) {
    this.config = config; // Store the chosen variation's config

    // Gravity vector from config
    this.gravity = createVector(this.config.gravity.x, this.config.gravity.y);

    // Represent the falling object as a literal (since we rely on config drawing)
    this.fallingObject = {
      position: createVector(width / 2, 50),
      velocity: createVector(0, 0),
      acceleration: createVector(0, 0),
      mass: this.config.objectMass,
      size: 32 // fixed size for drawing
    };

    this.gameOver = false; // Flag to indicate if the object has landed
  }

  /**
   * Applies a given force vector to the falling object.
   * @param {p5.Vector} force - The force to apply
   */
  applyForce(force) {
    let f = p5.Vector.div(force, this.fallingObject.mass);
    this.fallingObject.acceleration.add(f);
  }

  /**
   * Called every frame (in draw) to update the object motion if game not over.
   * Integrates gravity and checks landing conditions.
   */
  update() {
    if (this.gameOver) return; // Don't update if already landed

    // Apply gravity each frame
    this.applyForce(this.gravity);

    // Update object motion
    this.fallingObject.velocity.add(this.fallingObject.acceleration);
    this.fallingObject.position.add(this.fallingObject.velocity);
    this.fallingObject.acceleration.mult(0);

    // Check if landed
    if (this.isLanded()) {
      this.gameOver = true;
    }
  }

  /**
   * Draws the background, target, and object based on config functions.
   * If landed, shows a success message.
   */
  display() {
    this.config.backgroundDraw();
    this.config.targetDraw(this.config.targetX, this.config.targetY, this.config.targetWidth, this.config.targetHeight);
    this.config.objectDraw(this.fallingObject.position.x, this.fallingObject.position.y, this.fallingObject.size);

    if (this.gameOver) {
      this.displaySuccessMessage();
    }
  }

  /**
   * Checks if the falling object's bottom is within the target area.
   * @returns {boolean} True if landed on target
   */
  isLanded() {
    let x = this.fallingObject.position.x;
    let y = this.fallingObject.position.y;
    let size = this.fallingObject.size;
    let bottom = y + size / 2;

    let withinX = x > this.config.targetX && x < this.config.targetX + this.config.targetWidth;
    let withinY = bottom >= this.config.targetY && bottom <= this.config.targetY + this.config.targetHeight;

    return withinX && withinY;
  }

  /**
   * Shows a message telling the player they succeeded and how to return to the menu.
   */
  displaySuccessMessage() {
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(`${this.config.name} - Landed Successfully!`, width / 2, this.config.targetY - 10);
    text("Press ESC to return to menu", width / 2, this.config.targetY + 10);
  }

  /**
   * Called when the player clicks in the game state.
   * Calculates a force from the object's position toward the mouse, applying it to nudge the object.
   * @param {number} mx - Mouse X position
   * @param {number} my - Mouse Y position
   */
  applyInputForce(mx, my) {
    if (this.gameOver) return; // No input if game ended

    let dir = p5.Vector.sub(createVector(mx, my), this.fallingObject.position);
    dir.normalize();
    dir.mult(this.config.inputForceMagnitude);
    this.applyForce(dir);
  }
}
