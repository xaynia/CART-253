/**
 * Gravity Jam
 * Acacia Williams
 * 
 * A small game where you guide a falling object to land on a target area.
 * 
 * Instructions:
 * - On the title screen: Use UP/DOWN to highlight a variation and ENTER to start
 * - In the game: Click to apply a force that nudges the falling object toward the target
 * - Press ESC after landing to return to the title screen
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

// Preloads assets like fonts before setup() runs.
function preload() {
  font = loadFont('assets/pixel_font.ttf');
}

// Sets up the canvas, text, and initializes the title screen with variations.
function setup() {
  createCanvas(640, 480); // Adjusted to 640x480
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
  }
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
  game = new Game(currentConfig);
  state = 'game';
}
