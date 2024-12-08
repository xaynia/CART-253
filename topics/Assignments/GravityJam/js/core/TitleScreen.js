/**
 * Displays the Gravity Jam title and a menu of variations.
 * Player can navigate using UP/DOWN and ENTER,
 * Returns the chosen variation config to start the game.
 */

"use strict";

class TitleScreen {
  /**
   * @param {Array} variations - An array of {name: string, config: object} for each variation
   */
  constructor(variations) {
    this.variations = variations;
    this.selectedIndex = 0; // Highlighted variation index

    // Title and instructions text
    this.title = "GRAVITY JAM";
    this.instruction = "Use UP/DOWN to select and ENTER to start,\n or CLICK a variation.";
  }

  /**
   * Currently no dynamic logic needed
   */
  update() {
  }

  /**
   * Draws the black background, the title, instructions, and the variation list.
   * Highlights the currently selected variation.
   */
  display() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text(this.title, width / 2, 60);

    textSize(22);
    text(this.instruction, width / 2, 110);

    textSize(22);
    let startY = 200;
    let spacing = 75;
    for (let i = 0; i < this.variations.length; i++) {
      let v = this.variations[i];
      if (i === this.selectedIndex) {
        fill(255, 255, 0);
      } else {
        fill(200);
      }
      text(v.name, width / 2, startY + i * spacing);
    }
  }

  /**
   * Handles UP/DOWN and ENTER keys to select a variation.
   * @param {number} keyCode - The code of the key pressed
   * @returns {object|null} The chosen config if ENTER pressed, else null
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
   * Checks if user clicked on a variation line.
   * Uses bounding boxes around each menu line to detect clicks.
   * @param {number} mx - mouse x
   * @param {number} my - mouse y
   * @returns {object|null} chosen config if clicked, else null
   */
  mousePressed(mx, my) {
    let startY = 200;
    let spacing = 75;
    let textWidthEstimate = 200;
    let textHeightEstimate = 30;
    for (let i = 0; i < this.variations.length; i++) {
      let lineY = startY + i * spacing;
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
