/**

 * Handles drawing for the Feather Fall variation.
 * Shows sky, mountains, fewer trees, clouds, feather, and nest on top of the tree.
 */

"use strict";

// State variables for feather fall visuals
let clouds = [];
let cloudSpawnRate = 300;
let cloudTimer = 0;
let spawnedClouds = false;

let nestSticks = [];
let generatedNestSticks = false;
let mountainsGenerated = false;
let mountainPeaks = [];

let treesGenerated = false;
let trees = [];

/**
 * Resets the feather fall background so each game is unique.
 */
function resetFeatherfall() {
    clouds = [];
    cloudTimer = 0;
    spawnedClouds = false;
    nestSticks = [];
    generatedNestSticks = false;
    mountainsGenerated = false;
    mountainPeaks = [];
    treesGenerated = false;
    trees = [];
}

/**
 * Creates initial clouds before the game starts.
 */
function populateInitialClouds() {
    for (let i = 0; i < 8; i++) {
        let startX = random(-100, width);
        let startY = random(20, 100);
        let w = random(50, 120);
        let h = random(20, 60);
        clouds.push(createCloud(startX, startY, w, h));
    }
}

/**
 * Creates a single cloud object.
 * @param {number} x x-position of cloud
 * @param {number} y y-position of cloud
 * @param {number} w width of cloud
 * @param {number} h height of cloud
 */
function createCloud(x, y, w, h) {
    return {
        x: x,
        y: y,
        width: w,
        height: h,
        speed: random(0.05, 0.2)
    };
}

/**
 * Spawns a new cloud occasionally.
 */
function spawnCloud() {
    clouds.push(createCloud(-100, random(20, 100), random(50, 120), random(20, 60)));
}

/**
 * Updates and draws clouds each frame.
 */
function updateAndDrawClouds() {
    for (let i = clouds.length - 1; i >= 0; i--) {
        let c = clouds[i];
        c.x += c.speed;
        fill(255, 200);
        noStroke();
        rect(c.x, c.y, c.width, c.height, 10);
        if (c.x > width + c.width) {
            clouds.splice(i, 1);
        }
    }
}

/**
 * Generates sticks for the nest so it doesn't change every frame.
 */
function generateNestSticks(w, h) {
    nestSticks = [];
    for (let i = 0; i < 10; i++) {
        let nx = random(w * 0.2, w * 0.8);
        let ny = random(h * 0.2, h * 0.8);
        let x2 = nx + random(-10, 10);
        let y2 = ny + random(-10, 10);
        nestSticks.push({ x1: nx, y1: ny, x2: x2, y2: y2 });
    }
    generatedNestSticks = true;
}

/**
 * Generates random mountains in the background.
 */
function generateMountains() {
    mountainPeaks = [];
    let numPeaks = 3;
    for (let i = 0; i < numPeaks; i++) {
        let peakX = random(width * 0.1, width * 0.9);
        let peakY = random(height * 0.5, height * 0.7);
        mountainPeaks.push({ x: peakX, y: peakY });
    }
    mountainsGenerated = true;
}

/**
 * Draws the mountains behind everything else.
 */
function drawMountains() {
    fill(100, 100, 120);
    noStroke();
    for (let peak of mountainPeaks) {
        let baseWidth = 200;
        triangle(peak.x, peak.y, peak.x - baseWidth, height, peak.x + baseWidth, height);
    }
}

/**
 * Generates some trees at the bottom.
 */
function generateTrees() {
    trees = [];
    // Fewer trees now, let's say 2
    for (let i = 0; i < 2; i++) {
        let tx = random(100, width - 100);
        let treeHeight = 150;
        trees.push({ x: tx, h: treeHeight });
    }
    treesGenerated = true;
}

/**
 * Draws the trees on the ground.
 */
function drawTrees() {
    fill(101, 67, 33);
    noStroke();
    for (let t of trees) {
        rect(t.x - 20, height - t.h, 40, t.h);
        fill(34, 139, 34);
        ellipse(t.x, height - t.h - 30, 200, 100);
        fill(101, 67, 33);
    }
}

/**
 * Draws the entire background for Feather Fall.
 */
function drawFeatherfallBackground() {
    background(135, 206, 235);
    if (!mountainsGenerated) {
        generateMountains();
    }
    drawMountains();

    if (!treesGenerated) {
        generateTrees();
    }
    drawTrees();

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

/**
 * Draws the feather object.
 */
function drawFeather(x, y, size, mouthOpen = 0) {
    push();
    translate(x, y);
    noStroke();
    fill(255, 250, 240);
    rectMode(CENTER);
    rect(0, 0, size * 0.8, size * 0.05, 2);
    stroke(245);
    strokeWeight(1);
    for (let i = -size * 0.4; i < size * 0.4; i += size * 0.1) {
        line(i, 0, i - size * 0.05, -size * 0.1);
        line(i, 0, i - size * 0.05, size * 0.1);
    }
    noStroke();
    fill(230, 220, 200);
    ellipse(-size * 0.4, 0, size * 0.1, size * 0.2);
    pop();
}

/**
 * Draws the nest on top of a tree trunk/foliage.
 * The order is changed so nest is on top now.
 */
function drawNest(x, y, w, h) {
    // Draw the trunk and leaves first
    let nestCenterX = x + w / 2;
    fill(101, 67, 33);
    noStroke();
    rect(nestCenterX - 20, height - 150, 40, 150);
    fill(34, 139, 34);
    ellipse(nestCenterX, height - 180, 200, 100);

    if (!generatedNestSticks) {
        generateNestSticks(w, h);
    }
    // Now draw the nest on top
    push();
    translate(x, y);
    noStroke();
    fill(139, 69, 19);
    ellipse(w / 2, h / 2, w, h);

    stroke(160, 82, 45);
    strokeWeight(2);
    for (let s of nestSticks) {
        line(s.x1, s.y1, s.x2, s.y2);
    }
    pop();
}
