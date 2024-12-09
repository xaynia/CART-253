/**
 * Manages a single play session of the chosen variation.
 * Handles gravity, motion, and landing checks.
 * Draws everything and shows messages at the end.
 */

"use strict";

class Game {
  /**
   * Creates a game session with the given config and end callback.
   * @param {object} config The variation config.
   * @param {function} endCallback Called when the game ends.
   */
  constructor(config, endCallback) {
    this.config = config;
    this.endCallback = endCallback;

    // Gravity
    this.gravity = createVector(this.config.gravity.x, this.config.gravity.y);

    // Falling object setup
    this.fallingObject = {
      position: createVector(width / 2, 50),
      velocity: createVector(0, 0),
      acceleration: createVector(0, 0),
      mass: this.config.objectMass,
      size: 32
    };

    // Randomize target position at bottom
    this.config.targetX = random(50, width - this.config.targetWidth - 50);
    this.config.targetY = height - 50;

    this.gameOver = false;
    this.gameResult = null;
    this.windEffects = [];
    this.skullMouthOpen = 0;
  }

  /**
   * Applies a force to the falling object.
   * @param {p5.Vector} force The force vector.
   */
  applyForce(force) {
    let f = p5.Vector.div(force, this.fallingObject.mass);
    this.fallingObject.acceleration.add(f);
  }

  /**
   * Updates the game each frame if it's not over.
   */
  update() {
    if (this.gameOver) return;

    this.applyForce(this.gravity);
    this.fallingObject.velocity.add(this.fallingObject.acceleration);
    this.fallingObject.position.add(this.fallingObject.velocity);
    this.fallingObject.acceleration.mult(0);

    if (this.isLanded()) {
      this.gameOver = true;
      this.gameResult = 'success';
      this.endCallback(this.gameResult);
    } else if (this.isOutOfBounds()) {
      this.gameOver = true;
      this.gameResult = 'fail';
      this.endCallback(this.gameResult);
    }

    this.updateWindEffects();

    if (this.config.name === "Laughing Skull" && this.skullMouthOpen > 0) {
      this.skullMouthOpen -= 0.02;
      if (this.skullMouthOpen < 0) this.skullMouthOpen = 0;
    }
  }

  /**
   * Draws the game elements each frame.
   */
  display() {
    push();
    this.config.backgroundDraw();
    this.config.targetDraw(this.config.targetX, this.config.targetY, this.config.targetWidth, this.config.targetHeight);
    this.config.objectDraw(this.fallingObject.position.x, this.fallingObject.position.y, this.fallingObject.size, this.skullMouthOpen);
    this.displayWindEffects();
    if (this.gameOver) {
      this.displayEndMessage();
    }
    pop();
  }

  /**
   * Checks if the object has landed on the target.
   */
  isLanded() {
    // Make target height smaller for precise landing
    // Adjusting the landing zone for accuracy
    let targetTop = this.config.targetY;
    let targetBottom = this.config.targetY + this.config.targetHeight;
    let x = this.fallingObject.position.x;
    let bottom = this.fallingObject.position.y + (this.fallingObject.size / 2);

    let withinX = x > this.config.targetX && x < this.config.targetX + this.config.targetWidth;
    let withinY = bottom >= targetTop && bottom <= targetBottom;
    return withinX && withinY;
  }

  /**
   * Checks if the object fell off the bottom of the screen.
   */
  isOutOfBounds() {
    let y = this.fallingObject.position.y;
    let size = this.fallingObject.size;
    return (y - size / 2 > height + 50);
  }

  /**
   * Displays the end message at top and instructions at bottom.
   */
  displayEndMessage() {
    textAlign(CENTER, TOP);
    textSize(40);
    if (this.config.name === "Laughing Skull") {
      fill(255, 255, 0);
    } else {
      fill(0);
    }
    let resultText = this.gameResult === 'success' ? "SUCCESS!" : "FAILURE!";
    text(resultText, width / 2, 50);

    textSize(20);
    if (this.config.name === "Laughing Skull") {
      fill(255, 255, 0);
    } else {
      fill(0);
    }
    textAlign(CENTER, BOTTOM);
    text("Press ESC to return to menu or 'r' to retry", width / 2, height - 30);
  }

  /**
   * Applies input force when player clicks, strength varies by distance.
   * @param {number} mx Mouse x.
   * @param {number} my Mouse y.
   */
  applyInputForce(mx, my) {
    if (this.gameOver) return;

    let distToObj = dist(mx, my, this.fallingObject.position.x, this.fallingObject.position.y);
    let strength = this.config.inputForceMagnitude;
    let forceScale = 50 / (distToObj + 50);
    let finalForce = strength * forceScale;

    let dir = p5.Vector.sub(this.fallingObject.position, createVector(mx, my));
    dir.normalize();
    dir.mult(finalForce);
    this.applyForce(dir);

    this.createWindEffect(mx, my);

    // If it's Laughing Skull variation, open mouth and play laugh sound
    if (this.config.name === "Laughing Skull") {
      this.skullMouthOpen = 1.0;
      laughSound.play();

      for (let i = 0; i < 3; i++) {
        let lx = this.fallingObject.position.x + random(-20, 20);
        let ly = this.fallingObject.position.y + random(-20, 20);
        this.windEffects.push({ x: lx, y: ly, life: 30, type: 'laugh' });
      }
    }
  }

  /**
   * Creates a wind effect at the click location.
   * @param {number} mx Mouse x.
   * @param {number} my Mouse y.
   */
  createWindEffect(mx, my) {
    for (let i = 0; i < 10; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 5);
      this.windEffects.push({
        x: mx,
        y: my,
        vx: cos(angle) * speed,
        vy: sin(angle) * speed,
        life: 20,
        type: 'wind'
      });
    }
  }

  /**
   * Updates the wind effects each frame.
   */
  updateWindEffects() {
    for (let i = this.windEffects.length - 1; i >= 0; i--) {
      let p = this.windEffects[i];
      p.x += p.vx || 0;
      p.y += p.vy || 0;
      p.life--;
      if (p.life < 0) {
        this.windEffects.splice(i, 1);
      }
    }
  }

  /**
   * Draws the wind and laugh effects on the screen.
   */
  displayWindEffects() {
    noStroke();
    for (let p of this.windEffects) {
      if (p.type === 'wind') {
        fill(255, 255, 255, map(p.life, 0, 20, 0, 255));
        ellipse(p.x, p.y, 4, 4);
      } else if (p.type === 'laugh') {
        fill(255, 0, 0, map(p.life, 0, 30, 0, 255));
        textSize(30);
        textAlign(CENTER, CENTER);
        text(random(['HA', 'AH', 'HEH', 'HAH']), p.x, p.y);
      }
    }
  }
}
