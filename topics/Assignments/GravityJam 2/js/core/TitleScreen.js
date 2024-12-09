/**
 * Shows the title and the list of variations.
 * Lets the player pick which variation to play.
 * Also explains the basic gameplay objective.
 */

"use strict";

class TitleScreen {
  /**
   * Creates the title screen with a list of variations.
   * @param {Array} variations The variation configs.
   */
  constructor(variations) {
    this.variations = variations;
    this.selectedIndex = 0;
    this.startY = 240;
    this.spacing = 75;

    // Basic instructions about how to play
    this.title = "GRAVITY JAM";
    this.instruction1 = "Land the falling object on the target \nby clicking to create gusts of wind.";
    this.instruction2 = "Use UP/DOWN to select and ENTER to start, or CLICK a variation.\n" +
      "Press ESC to go back to the main menu.";
  }

  /**
   * Updates the title screen (nothing dynamic right now).
   */
  update() {
  }

  /**
   * Draws the title screen with the title, instructions, and variation list.
   */
  display() {
    push();
    background(0);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);


    textSize(70);
    text(this.title, width / 2, 55);

    textSize(22);
    text(this.instruction1, width / 2, 120);

    textSize(14);
    text(this.instruction2, width / 2, 170);

    textSize(26);
    for (let i = 0; i < this.variations.length; i++) {
      let v = this.variations[i];
      if (i === this.selectedIndex) {
        fill(255, 255, 0);
      } else {
        fill(200);
      }
      text(v.name, width / 2, this.startY + i * this.spacing);
    }
    pop();
  }

  /**
   * Handles keyboard for navigation and selecting a variation.
   * @param {number} keyCode The pressed key code.
   * @returns {object|null} config if chosen, else null.
   */
  keyPressed(keyCode) {
    if (keyCode === UP_ARROW) {
      this.selectedIndex = (this.selectedIndex - 1 + this.variations.length) % this.variations.length;
    } else if (keyCode === DOWN_ARROW) {
      this.selectedIndex = (this.selectedIndex + 1) % this.variations.length;
    } else if (keyCode === ENTER) {
      return this.variations[this.selectedIndex].config;
    }
    return null;
  }

  /**
   * Handles mouse clicking on a variation line.
   * @param {number} mx Mouse x.
   * @param {number} my Mouse y.
   * @returns {object|null} config if chosen, else null.
   */
  mousePressed(mx, my) {
    let textWidthEstimate = 200;
    let textHeightEstimate = 30;
    for (let i = 0; i < this.variations.length; i++) {
      let lineY = this.startY + i * this.spacing;
      let x1 = width / 2 - textWidthEstimate / 2;
      let y1 = lineY - textHeightEstimate / 2;
      if (mx > x1 && mx < x1 + textWidthEstimate && my > y1 && my < y1 + textHeightEstimate) {
        this.selectedIndex = i;
        return this.variations[i].config;
      }
    }
    return null;
  }
}
