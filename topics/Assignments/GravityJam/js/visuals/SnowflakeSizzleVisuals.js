/**
 * Drawing functions for the Snowflake Sizzle variation.
 */

"use strict";

function drawSnowflakeBackground() {
    background(180, 200, 220);
    stroke(255);
    for (let i = 0; i < 20; i++) {
        point(random(width), random(height));
    }
}

// Draws a simple cross-shaped snowflake.
function drawSnowflake(x, y, size) {
    push();
    translate(x, y);
    fill(255);
    noStroke();
    rect(-1, -size / 2, 2, size);
    rect(-size / 2, -1, size, 2);
    pop();
}

// Draw candle centered at bottom if needed.
// For example call drawCandle(width/2 - w/2, height-100, w, h).
function drawCandle(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill(230);
    rect(0, 0, w, h * 0.8);
    fill(255, 165, 0);
    ellipse(w / 2, -h * 0.1, w * 0.3, w * 0.3);
    fill(255, 255, 0);
    ellipse(w / 2, -h * 0.15, w * 0.2, w * 0.2);
    pop();
}
