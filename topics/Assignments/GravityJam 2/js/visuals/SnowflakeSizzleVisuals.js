/**
 * Handles drawing for the Snowflake Sizzle variation.
 * Shows a gradient sky, snow, trees, and a candle on a platform.
 */

"use strict";

let snowTreesGenerated = false;
let snowTrees = [];

/**
 * Resets snowflake sizzle visuals for a fresh start each time.
 */
function resetSnowflakeSizzle() {
    snowTreesGenerated = false;
    snowTrees = [];
}

/**
 * Generates some pine trees in the snow.
 */
function generateSnowTrees() {
    snowTrees = [];
    for (let i = 0; i < 5; i++) {
        let tx = random(50, width - 50);
        let treeHeight = random(60, 100);
        snowTrees.push({ x: tx, h: treeHeight });
    }
    snowTreesGenerated = true;
}

/**
 * Draws the pine trees at the bottom.
 */
function drawSnowTrees() {
    fill(0, 100, 0);
    noStroke();
    for (let t of snowTrees) {
        triangle(t.x, height - t.h, t.x - t.h / 2, height, t.x + t.h / 2, height);
        triangle(t.x, height - (t.h * 0.7), t.x - t.h * 0.3, height - t.h * 0.3, t.x + t.h * 0.3, height - t.h * 0.3);
        triangle(t.x, height - (t.h * 0.4), t.x - t.h * 0.2, height - t.h * 0.6, t.x + t.h * 0.2, height - t.h * 0.6);
    }
}

/**
 * Draws the snowflake background as a gradient sky and snow ground.
 */
function drawSnowflakeBackground() {
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(180, 200, 220), color(100, 120, 160), inter);
        stroke(c);
        line(0, i, width, i);
    }
    stroke(255);
    for (let i = 0; i < 20; i++) {
        point(random(width), random(height));
    }
    if (!snowTreesGenerated) {
        generateSnowTrees();
    }
    fill(240);
    noStroke();
    rect(0, height - 50, width, 50);
    drawSnowTrees();
}

/**
 * Draws the snowflake object.
 */
function drawSnowflake(x, y, size, mouthOpen = 0) {
    push();
    translate(x, y);
    noStroke();
    fill(255);
    ellipse(0, 0, size * 0.1, size * 0.1);
    stroke(255);
    strokeWeight(2);
    for (let angle = 0; angle < 360; angle += 60) {
        push();
        rotate(radians(angle));
        line(0, 0, 0, -size * 0.4);
        line(0, -size * 0.2, -size * 0.1, -size * 0.3);
        line(0, -size * 0.2, size * 0.1, -size * 0.3);
        pop();
    }
    pop();
}

/**
 * Draws the candle on a small platform
 */
function drawCandle(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();

    // Darker wax color for better contrast
    fill(200);
    rect(0, 0, w, h * 0.8, 5);
    let flicker = sin(frameCount * 0.2) * 3;
    fill(255, 165, 0);
    ellipse(w / 2, -h * 0.1 - flicker, w * 0.3, w * 0.3);
    fill(255, 255, 0);
    ellipse(w / 2, -h * 0.15 - flicker, w * 0.2, w * 0.2);
    fill(100, 100, 100, 150);
    ellipse(w / 2 + random(-2, 2), -h * 0.3 - flicker * 0.5, w * 0.1, w * 0.1);

    fill(150);
    noStroke();
    rect(-w * 0.5, h * 0.8, w * 2, 10);
    pop();
}
