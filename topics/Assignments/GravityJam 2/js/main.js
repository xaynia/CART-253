/**
 * Gravity Jam
 * Acacia Williams
 * 
 * A small game where you guide a falling object to land on a target area.
 * 
 * Instructions:
 * - On the title screen: Use UP/DOWN to highlight a variation and ENTER to start
 * - In the game: Click to apply a force that nudges the falling object toward the target
 * - Press ESC to return to the title screen
 * - Press 'r' to restart the same variation
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Global variables
let font; // Loaded font
let currentConfig; // Holds the currently selected variation configuration
let game; // Instance of the Game class for the chosen variation
let titleScreen; // Instance of TitleScreen for the menu
let state = 'title'; // Current game state: 'title' or 'game'
let streak = 0; // Keeps track of consecutive wins without refresh

// Preloads assets like fonts before setup() runs.
function preload() {
  font = loadFont('assets/pixel_font.ttf');
}

// Sets up the canvas, text, and initializes the title screen with variations.
function setup() {
  createCanvas(640, 480);
  if (font) {
    textFont(font);
  } else {
    console.warn("Font loading failed. Using default font.");
  }
  let variations = [
    { name: featherVariation.name, config: featherVariation },
    { name: snowflakeVariation.name, config: snowflakeVariation },
    { name: skullVariation.name, config: skullVariation }
  ];
  titleScreen = new TitleScreen(variations);
}

// The main draw loop.
function draw() {
  if (state === 'title') {
    titleScreen.update();
    titleScreen.display();
  } else if (state === 'game') {
    game.update();
    game.display();
    displayStreak();
  }
}

// Displays the current streak in the top-left corner.
function displayStreak() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Streak: ${streak}`, 10, 10);
}

// Handles keyboard input. Used for menu navigation and returning to title.
function keyPressed() {
  if (state === 'title') {
    let chosenConfig = titleScreen.keyPressed(keyCode);
    if (chosenConfig) {
      startGame(chosenConfig);
    }
  } else if (state === 'game') {
    if (keyCode === ESCAPE) {
      state = 'title';
    }
    // Press 'r' (lowercase) to restart
    if (key === 'r') {
      startGame(currentConfig);
    }
  }
}

// Handles mouse clicks to either select menu items or apply force in-game.
function mousePressed() {
  if (state === 'title') {
    let chosenConfig = titleScreen.mousePressed(mouseX, mouseY);
    if (chosenConfig) {
      startGame(chosenConfig);
    }
  } else if (state === 'game') {
    game.applyInputForce(mouseX, mouseY);
  }
}

// Begins a new game with the chosen variation configuration.
function startGame(config) {
  currentConfig = config;
  // Reset backgrounds for a fresh experience
  resetFeatherfall();
  resetSnowflakeSizzle();
  resetSkull();
  game = new Game(currentConfig, onGameEnd);
  state = 'game';
}

// Callback for when the game ends (to update streak).
function onGameEnd(result) {
  // result is 'success' or 'fail'
  if (result === 'success') {
    streak++;
  } else {
    streak = 0;
  }
}
