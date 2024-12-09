/**
 * Drawing functions for the Laughing Skull variation.
 */

"use strict";

function drawSkullBackground() {
    background(0, 0, 0)
    let t = frameCount * 0.02;
    for (let i = 0; i < width; i += 10) {
        let c = color((sin(t + i * 0.1) * 127 + 128), (cos(t + i * 0.12) * 127 + 128), (sin(t + i * 0.15) * 127 + 128));
        stroke(c);
        line(i, 0, i, height);
    }
}

// Draws a simple skull shape.
function drawSkull(x, y, size) {
    push();
    translate(x, y);
    noStroke();
    fill(255);
    rect(-size / 2, -size / 2, size, size);
    fill(0);
    rect(-size * 0.2, -size * 0.2, size * 0.15, size * 0.15);
    rect(size * 0.05, -size * 0.2, size * 0.15, size * 0.15);
    rect(-size * 0.2, size * 0.1, size * 0.4, size * 0.05);
    pop();
}

// Draws a simple throne centered at bottom.
// For example call drawThrone(width/2 - w/2, height-100, w, h) for center.
function drawThrone(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill(200, 0, 0);
    rect(0, 0, w, h * 0.6);
    rect(0, h * 0.6, w, h * 0.4);
    fill(255, 215, 0);
    rect(-w * 0.1, h * 0.3, w * 1.2, h * 0.1);
    pop();
}
