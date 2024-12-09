/**
 * Handles drawing for the Laughing Skull variation.
 * Shows a psychedelic background with pillars and shapes, and a skull with a throne.
 */

"use strict";

let skullPillarsGenerated = false;
let pillarPositions = [];

/**
 * Resets the skull background so we get a new experience each time.
 */
function resetSkull() {
    skullPillarsGenerated = false;
    pillarPositions = [];
}

/**
 * Generates positions for pillars in the background.
 */
function generatePillars() {
    pillarPositions = [
        { x: 80, y: 0, w: 80, h: height },
        { x: width - 160, y: 0, w: 80, h: height }
    ];
    skullPillarsGenerated = true;
}

/**
 * Draws the skull background with shifting colors and psychedelic shapes.
 */
function drawSkullBackground() {
    background(0, 0, 0);
    let t = frameCount * 0.02;
    for (let i = 0; i < width; i += 10) {
        let c = color((sin(t + i * 0.1) * 127 + 128),
            (cos(t + i * 0.12) * 127 + 128),
            (sin(t + i * 0.15) * 127 + 128));
        stroke(c);
        line(i, 0, i, height);
    }

    if (!skullPillarsGenerated) {
        generatePillars();
    }
    noStroke();

    // Draw the pillars with inner stripes
    for (let p of pillarPositions) {
        fill(255, 215, 0, 200);
        rect(p.x, p.y, p.w, p.h);
        fill(0, 0, 0, 50);
        for (let sx = p.x + 10; sx < p.x + p.w; sx += 10) {
            rect(sx, p.y, 2, p.h);
        }
    }

    // Additional shapes to vary the pattern each frame
    fill(random(255), random(255), random(255), 100);
    ellipse(width / 2, height / 2, 200 + sin(t) * 50, 200 + cos(t) * 50);

    fill(random(255), random(255), random(255), 100);
    let rx = width / 2 - 50 + sin(t) * 40;
    let ry = height / 2 - 50 + cos(t) * 40;
    rect(rx, ry, 100, 100);

    fill(random(255), random(255), random(255), 100);
    triangle(width / 2, height / 2 - 100,
        width / 2 - 50 + sin(t) * 20, height / 2 - 150,
        width / 2 + 50 - cos(t) * 20, height / 2 - 150);
}

/**
 * Draws the skull object.
 */
function drawSkull(x, y, size, mouthOpen = 0) {
    push();
    translate(x, y);
    noStroke();
    fill(255);
    ellipse(0, -size * 0.1, size, size);
    rect(-size * 0.5, -size * 0.1, size, size * 0.6, 20);
    fill(0);
    ellipse(-size * 0.2, -size * 0.2, size * 0.2, size * 0.2);
    ellipse(size * 0.2, -size * 0.2, size * 0.2, size * 0.2);
    triangle(-size * 0.05, -size * 0.05, size * 0.05, -size * 0.05, 0, 0);
    fill(255);
    rect(-size * 0.2, size * 0.1, size * 0.4, size * 0.2);
    fill(0);
    let openAmt = size * 0.1 * mouthOpen;
    rect(-size * 0.2, size * 0.1 + openAmt, size * 0.4, size * 0.05 + openAmt);

    stroke(0);
    strokeWeight(1);
    line(-size * 0.3, -size * 0.3, -size * 0.2, -size * 0.2);
    line(size * 0.3, -size * 0.3, size * 0.25, -size * 0.2);
    pop();
}

/**
 * Draws the throne beneath the skull.
 */
function drawThrone(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill(200, 0, 0);
    rect(0, 0, w, h * 0.6, 10);
    rect(0, h * 0.6, w, h * 0.4, 10);

    fill(255, 215, 0);
    rect(w * 0.1, h * 0.2, w * 0.8, h * 0.05);
    rect(w * 0.25, 0, w * 0.1, h * 0.6);
    rect(w * 0.65, 0, w * 0.1, h * 0.6);

    fill(0, 255, 255);
    ellipse(w / 2, h * 0.2, w * 0.2, h * 0.2);

    fill(255, 0, 255, 100);
    ellipse(w / 2, h * 0.5, w * 0.5, h * 0.2);
    pop();
}
