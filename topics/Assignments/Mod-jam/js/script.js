/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";


// Font
let pixelFont;
// Sounds
let slurpSound;
let backgroundMusic;


// Start Screen
let gameState = "start";

// Starting parameters (starting lives, high score, )
let lives = 3;          // Starting lives
let score = 0; // Score variable
let highScore = 0;      // Initial high score
let gameOver = false;   // Game state to check if the game is over


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 490,
        size: 110,
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
};


// Our fly
// Has a position, size, and speed of horizontal movement
const baseSpeed = 3;     // Starting speed of the fly
const speedIncrement = 0.5; // Increase in speed for every few points

const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3

};

// for padding
const padding = 20; // Padding from the edge of the canvas
const xPadding = 30;  // Extra padding specifically for the x-position
const yPadding = 20;  // Standard padding for the y-position

/**
 * Arcade Style Start Screen
 * Press enter to start 
 */
function displayStartScreen() {
    textSize(48);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Frogfrogfrog", width / 2, height / 3); // Title text

    textSize(24);
    text("Press Enter to Start", width / 2, height / 2); // Start instructions
    text("Move with your mouse, click to catch flies!", width / 2, height / 2 + 40); // Game instructions
}

/**
 * Start Screen Transition: Pressing Enter only starts the game if the gameState is "start"
 */
function keyPressed() {
    if (gameState === "start" && keyCode === ENTER) {
        gameState = "playing";
        score = 0; // Reset score when the game starts
        resetFly(); // Position the fly for a new game
    }
}

// Load assets
function preload() {
    pixelFont = loadFont('assets/rainyhearts.ttf');
    slurpSound = loadSound('assets/sounds/slurp.wav');
    backgroundMusic = loadSound('assets/sounds/8-bit-loop.mp3');
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    let canvas = createCanvas(640, 480);
    canvas.id('gameCanvas');
    if (pixelFont) {
        textFont(pixelFont);
    } else {
        console.warn("Font loading failed");
    }
    textSize(32);
    textAlign(CENTER, CENTER);

    // Loop background music
    backgroundMusic.loop();
}



function draw() {
    background("#87ceeb");


    if (gameState === "start") {
        // Display start screen
        displayStartScreen();
    }
    else if (gameState === "playing") {
        // Display lives and score only during gameplay
        displayLives();
        displayScore();

        // Gameplay elements
        moveFly();
        drawFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();

        // Check for game over
        if (gameOver) {
            gameState = "gameOver"; // Transition to gameOver state
        }
    }
    else if (gameState === "gameOver") {
        // Display the game over screen
        displayGameOver();
    }
}

/**
 * Displays Lives (out of 3)
 */
function displayLives() {
    for (let i = 0; i < lives; i++) {
        fill("#ff0000"); // Red hearts
        noStroke();
        ellipse(width - padding - i * 25, padding, 15); // Display 3 hearts, top right corner
    }
}

/**
 * Displays score (per fly)
 */
function displayScore() {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP); // Align from the top-left corner of the text
    text(`Score: ${score}`, xPadding, yPadding); // display score, top left
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Calculate progressive speed based on score
    fly.speed = baseSpeed + Math.floor(score / 5) * speedIncrement;
    // Move the fly
    fly.x += fly.speed;
    // Handle fly going off canvas
    if (fly.x > width) {
        resetFly();
        lives--;          // Deduct a life if fly is missed
        if (lives <= 0) {
            gameOver = true;
            if (score > highScore) {
                highScore = score; // Update high score if new score is higher
            }
        }
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    // Draw the body as a square
    rectMode(CENTER); // Center the rectangles for easier positioning
    rect(fly.x, fly.y, fly.size, fly.size);

    // Wings
    fill("#000000");
    const wingOffsetX = fly.size * 0.5;  // Horizontal spacing from the body
    const wingOffsetY = fly.size * .5;  // Increase this value to move wings higher
    //left wing
    rect(fly.x - wingOffsetX, fly.y - wingOffsetY, fly.size * 0.6, fly.size * 0.4);

    // Draw right wing
    rect(fly.x + wingOffsetX, fly.y - wingOffsetY, fly.size * 0.6, fly.size * 0.4);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw tongue
    push();
    stroke("#FAA0A0");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the tongue tip
    push();
    fill("#DE3163");
    noStroke();
    rectMode(CENTER);
    rect(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    // ellipse(frog.body.x, frog.body.y, frog.body.size);
    rect(frog.body.x - frog.body.size / 2, frog.body.y - frog.body.size / 2, frog.body.size, frog.body.size);
    pop();

    // Draw frog eyes
    push();
    noStroke();
    fill("#000000"); // Color for the pupils
    // Calculate pupil positions
    const leftPupilX = frog.body.x - frog.body.size / 2;
    const rightPupilX = frog.body.x + frog.body.size / 3;
    const pupilY = frog.body.y - frog.body.size / 2.5;
    const pupilSize = frog.body.size / 6;
    // Draw pupils
    rect(leftPupilX, pupilY, pupilSize);
    rect(rightPupilX, pupilY, pupilSize);
    pop();

    // Draw frog nostrils
    push();
    noStroke();
    fill("#000000"); // Color for the nostrils
    // Calculate nostril positions
    const leftNostrilX = frog.body.x - frog.body.size / 9;
    const rightNostrilX = frog.body.x + frog.body.size / 10;
    const nostrilY = frog.body.y - frog.body.size / 2.2; // Vertical Nostril position (lower = higher)
    const nostrilSize = frog.body.size / 30; // Nostril size (higher = smaller)
    // Draw nostrils
    rect(leftNostrilX, nostrilY, nostrilSize);
    rect(rightNostrilX, nostrilY, nostrilSize);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Increment score on catch
        score++;
        // Bring back the tongue
        frog.tongue.state = "inbound";
        // Play slurp sound effect
        slurpSound.play();
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (gameState === "gameOver") {
        // Restart the game
        lives = 3;
        score = 0;
        gameOver = false;
        gameState = "start"; // Go back to the start screen
    } else if (gameState === "playing" && frog.tongue.state === "idle") {
        // Launch the tongue if the game is not over
        frog.tongue.state = "outbound";
    }
}

/**
 * Launch Game over screen (if no hearts): final score, high score, restart
 */
function displayGameOver() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2);
    text(`High Score: ${highScore}`, width / 2, height / 2 + 30);
    textSize(16);
    text("Click to Restart", width / 2, height / 2 + 80);
}
