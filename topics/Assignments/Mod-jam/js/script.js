/**
 * Froggy Feast
 * Acacia Williams
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

// Starting parameters (starting screen, lives, high score, sounds, etc )
let pixelFont; // Font
let slurpSound; // Sounds
let backgroundMusic;
let gameState = "start"; // Start Screen
let lives = 3;          // Starting lives
let score = 0; // Score variable
let highScore = 0;      // Initial high score
let gameOver = false;   // Game state to check if the game is over
let isMuted = false; // Track mute status
let clouds = []; // List to store cloud objects
let cloudSpawnRate = 200; // Spawn rate in frames (e.g., one cloud every 200 frames)
let cloudTimer = 0; // Timer to keep track of spawning new clouds

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

// Buttons
const muteButton = document.getElementById("muteButton");
const resetButton = document.getElementById("resetButton");
const redCircleButton = document.getElementById("redCircleButton");

// Fly
// Has a position, size, and speed of horizontal movement
const baseSpeed = 3;     // Starting speed of the fly
const speedIncrement = 0.5; // Increase in speed for every few points

const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    state: 'flying',
    type: 'normal' // property to indicate fly type ('normal' or 'golden')
};

// for padding
const padding = 20; // Padding from the edge of the canvas
const xPadding = 30;  // Extra padding specifically for the x-position
const yPadding = 20;  // Standard padding for the y-position

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
    canvas.parent('gameContainer'); // Attach canvas to the arcade-container
    canvas.id('gameCanvas');
    populateInitialClouds();
    if (pixelFont) {
        textFont(pixelFont);
    } else {
        console.warn("Font loading failed");
    }
    textSize(32);
    textAlign(CENTER, CENTER);

    // Background music
    backgroundMusic.loop();
    if (isMuted) {
        backgroundMusic.setVolume(0);
    }
    // louder slurp function
    slurpSound.setVolume(2); // Adjust this value to control volume
    cursor(CROSS); // crosshair cursor
}


/**
 * Arcade Style Start Screen
 * Click to start 
 */
function displayStartScreen() {
    textSize(48);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Froggy Feast", width / 2, height / 3); // Title text

    textSize(24);
    text("Click to Start", width / 2, height / 2); // Start instructions
    text("Move with your mouse, click to catch flies!", width / 2, height / 2 + 40); // Game instructions

    // Play background music only once on the title screen
    if (!isMuted && !backgroundMusic.isPlaying()) {
        backgroundMusic.play();
    }
}

function draw() {
    background("#87ceeb");

    // Update and draw clouds
    updateAndDrawClouds();

    // Increment cloud timer
    cloudTimer++;
    if (cloudTimer > cloudSpawnRate) {
        spawnCloud();
        cloudTimer = 0;
    }


    if (gameState === "start") {
        displayStartScreen(); // Display start screen
    }
    else if (gameState === "playing") {
        displayLives();
        displayScore();
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
 * Populate the initial list with random clouds to avoid a blank screen
 */
function populateInitialClouds() {
    for (let i = 0; i < 5; i++) {
        clouds.push(createCloud(random(width), random(20, 100), random(50, 120), random(20, 60)));
    }
}

/**
 * Create a cloud object with random properties
 */
function createCloud(x, y, w, h) {
    return { x, y, width: w, height: h, speed: random(0.3, 2) }; // Each cloud has a slight random speed
}

/**
 * Spawn a new cloud at the left side of the screen
 */
function spawnCloud() {
    clouds.push(createCloud(-60, random(20, 100), random(50, 120), random(20, 60)));
}

/**
 * Update cloud positions and draw them
 */
function updateAndDrawClouds() {
    for (let i = clouds.length - 1; i >= 0; i--) {
        let cloud = clouds[i];
        cloud.x += cloud.speed; // Move cloud to the right

        // Draw cloud 
        fill(255);
        noStroke();
        rect(cloud.x, cloud.y, cloud.width, cloud.height);

        // Remove cloud if it goes off the right side of the screen
        if (cloud.x > width + cloud.width) {
            clouds.splice(i, 1);
        }
    }
}

/**
 * Draws Lives 
 * as 8 bit Hearts
 */
function displayLives() {
    for (let i = 0; i < lives; i++) {
        // Set up the starting position for each heart
        let x = width - padding - i * 26 - (i * 1);
        let y = padding;

        // Draw the solid 8-bit heart shape
        fill("#ff0000"); // Red hearts
        noStroke();

        // Middle heart
        rect(x - 5, y + 5, 15, 10);
        rect(x, y + 15, 5, 5);
        // Left side of heart
        rect(x - 5, y, 5, 5);
        rect(x - 10, y + 5, 5, 5);
        rect(x - 10, y + 10, 5, 5);
        rect(x - 5, y + 15, 5, 5);
        rect(x, y + 20, 5, 5);
        // Right side of heart
        rect(x + 5, y, 5, 5);
        rect(x + 10, y + 5, 5, 5);
        rect(x + 10, y + 10, 5, 5);
        rect(x + 5, y + 15, 5, 5);
        rect(x, y + 20, 5, 5);
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
    if (fly.state === 'flying') {
        fly.speed = baseSpeed + Math.floor(score / 5) * speedIncrement; // Calculate progressive speed based on score

        // Move fly differently if it's golden
        if (fly.type === 'golden') {
            // Add random movement on x and y axes for a "buzzy" effect
            fly.x += fly.speed + random(-5, 5); // buzzy horizontal movement
            fly.y += random(-5, 5);            // buzzy vertical movement

            // Keep the fly within the vertical boundaries
            if (fly.y < 0) fly.y = 0;
            if (fly.y > height - fly.size) fly.y = height - fly.size;
        } else {
            // Normal fly: less movement
            fly.x += fly.speed + random(-1, 1); // buzzy horizontal movement
            fly.y += random(-1, 1);            // buzzy vertical movement
        }

        // Handle fly going off canvas
        if (fly.x > width) {
            resetFly();
            lives--; // Deduct a life if fly is missed
            if (lives <= 0) {
                gameOver = true;
                if (score > highScore) {
                    highScore = score; // Update high score if new score is higher
                }
            }
        }
    } else if (fly.state === 'caught') {
        // Make the fly follow the tip of the tongue
        fly.x = frog.tongue.x;
        fly.y = frog.tongue.y;
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    if (fly.state === 'flying' || fly.state === 'caught') {
        push();
        noStroke();

        // Set color based on fly type
        fill(fly.type === 'golden' ? "#FFD700" : "#000000"); // Golden color if golden fly
        rectMode(CENTER);
        rect(fly.x, fly.y, fly.size, fly.size);
        // Wings
        const wingOffsetX = fly.size * 0.5; // Horizontal spacing from body
        const wingOffsetY = fly.size * 0.5; // Wing height (Larger number: move wings higher)
        rect(fly.x - wingOffsetX, fly.y - wingOffsetY, fly.size * 0.6, fly.size * 0.4); // left wing
        rect(fly.x + wingOffsetX, fly.y - wingOffsetY, fly.size * 0.6, fly.size * 0.4); // right wing
        pop();
    }
}


/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.state = 'flying'; // Ensure the fly state is reset

    // 10% chance to create a golden fly
    if (random(1) < 0.1) {
        fly.type = 'golden';
        fly.size = 8; // 
    } else {
        fly.type = 'normal';
        fly.size = 10; // Default size for regular flies
    }
}


/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX - 160; // subtract width of border to center frog with mouse
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    frog.tongue.x = frog.body.x;
    if (frog.tongue.state === "idle") {
        // Do nothing
    } else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    } else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        if (frog.tongue.y >= height) {
            frog.tongue.y = height;
            frog.tongue.state = "idle";
            if (fly.state === 'caught') {
                resetFly();
            }
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
    if (fly.state === 'flying') {
        const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y); // Get distance from tongue to fly
        const eaten = (d < frog.tongue.size / 2 + fly.size / 2); // Check if it's an overlap
        if (eaten) {
            fly.state = 'caught'; // Set fly state to 'caught'
            frog.tongue.state = "inbound"; // Bring back the tongue
            slurpSound.play(); // Play slurp sound effect

            // Add points based on fly type
            if (fly.type === 'golden') {
                score += 3;
            } else {
                score += 1;
            }
        }
    }
}



/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (gameState === "start") {
        // Start the game from the start screen
        gameState = "playing";
        score = 0; // Reset score when the game starts
        resetFly(); // Position the fly for a new game
    } else if (gameState === "playing" && frog.tongue.state === "idle") {
        // Launch the tongue if the game is not over
        frog.tongue.state = "outbound";
    } else if (gameState === "gameOver") {
        // Restart the game from the game over screen
        lives = 3;
        score = 0;
        gameOver = false;
        gameState = "start"; // Go back to the start screen
    }
}

// Mute Button Functionality
muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    backgroundMusic.setVolume(isMuted ? 0 : 1);
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
});

// Reset Button Functionality
resetButton.addEventListener("click", () => {
    gameState = "start";
    score = 0;
    lives = 3;
    gameOver = false;
    if (!isMuted) {
        backgroundMusic.setVolume(1);
    }
});


/**
 * Display Game Over 
 * final score, high score, restart
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

    // Stop background music on game over
    backgroundMusic.stop();
}


// Red Circle Button Functionality
redCircleButton.addEventListener("click", () => {
    console.log("Red Circle Button Clicked!");
});