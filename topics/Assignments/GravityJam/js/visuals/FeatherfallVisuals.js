/**
 * Drawing functions for the Feather Fall variation of Gravity Jam
 */

"use strict";

let clouds = [];
let cloudSpawnRate = 300;
let cloudTimer = 0;
let spawnedClouds = false;

function populateInitialClouds() {
    for (let i = 0; i < 8; i++) {
        let startX = random(-100, width);
        let startY = random(20, 100);
        let w = random(50, 120);
        let h = random(20, 60);
        clouds.push(createCloud(startX, startY, w, h));
    }
}

// Creates a slow-moving cloud.
function createCloud(x, y, w, h) {
    return {
        x: x,
        y: y,
        width: w,
        height: h,
        speed: random(0.05, 0.2)
    };
}

// Spawns new clouds occasionally.
function spawnCloud() {
    clouds.push(createCloud(-100, random(20, 100), random(50, 120), random(20, 60)));
}

// Updates and draws clouds.
function updateAndDrawClouds() {
    for (let i = clouds.length - 1; i >= 0; i--) {
        let c = clouds[i];
        c.x += c.speed;
        fill(255, 200);
        noStroke();
        rect(c.x, c.y, c.width, c.height);
        if (c.x > width + c.width) {
            clouds.splice(i, 1);
        }
    }
}

// Draws sky and manages clouds.
function drawFeatherfallBackground() {
    background(135, 206, 235);
    if (!spawnedClouds) {
        populateInitialClouds();
        spawnedClouds = true;
    }
    updateAndDrawClouds();
    cloudTimer++;
    if (cloudTimer > cloudSpawnRate) {
        spawnCloud();
        cloudTimer = 0;
    }
}

// Draws a more detailed horizontal feather.
function drawFeather(x, y, size) {
    push();
    translate(x, y);
    noStroke();
    let thickness = size / 8;
    fill(220);
    rectMode(CENTER);
    rect(0, 0, size, thickness / 4);
    fill(255);
    rect(0, 0, size * 0.8, thickness);
    triangle(-size * 0.4, -thickness / 2, -size / 2, 0, -size * 0.4, thickness / 2);
    triangle(size * 0.4, -thickness / 2, size / 2, 0, size * 0.4, thickness / 2);
    fill(245);
    rect(-size * 0.1, -thickness / 2 - 2, 4, 2);
    rect(size * 0.1, thickness / 2 + 2, 4, 2);
    pop();
}

// Draws a wider, centered nest at bottom.
// Centered for 640x480: let's say we want it at bottom center.
// For example call drawNest(width/2-75, height-60, 150, 40) in the config or game.
function drawNest(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill(139, 69, 19);
    ellipse(w / 2, h / 2, w, h);
    stroke(160, 82, 45);
    pop();
}
