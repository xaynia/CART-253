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
 * - Press 'R' to restart the same variation
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Global variables
let font; // Loaded font
let currentConfig; // Currently selected variation configuration
let game; // Instance of the Game class
let titleScreen; // Instance of TitleScreen for the menu
let state = 'title'; // Current game state: 'title' or 'game'
let streak = 0; // Keeps track of consecutive wins without refresh

// Sound variables
let titleMusic;
let featherMusic;
let skullMusic;
let snowflakeMusic;
let landed_feather_sound;
let landed_skull_sound;
let landed_snowflake_sound;
let laughSound;

function preload() {
  font = loadFont('assets/pixel_font.ttf');

  // Load sounds
  titleMusic = loadSound('assets/background/title_screen.mp3');
  featherMusic = loadSound('assets/background/feather.mp3');
  skullMusic = loadSound('assets/background/skull.mp3');
  snowflakeMusic = loadSound('assets/background/snowflake.mp3');

  landed_feather_sound = loadSound('assets/landed_feather.mp3');
  landed_skull_sound = loadSound('assets/landed_skull.mp3');
  landed_snowflake_sound = loadSound('assets/landed_snowflake.wav');

  laughSound = loadSound('assets/laugh.wav');
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

  // Start the title music in a loop
  titleMusic.loop();
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

function keyPressed() {
  if (state === 'title') {
    let chosenConfig = titleScreen.keyPressed(keyCode);
    if (chosenConfig) {
      startGame(chosenConfig);
    }
  } else if (state === 'game') {
    if (keyCode === ESCAPE) {
      // Return to title
      state = 'title';
      // Stop current game music and return to title music
      featherMusic.stop();
      snowflakeMusic.stop();
      skullMusic.stop();
      titleMusic.loop();
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

  // Stop all background musics before starting a new one
  titleMusic.stop();
  featherMusic.stop();
  snowflakeMusic.stop();
  skullMusic.stop();

  // Reset backgrounds for a fresh experience
  resetFeatherfall();
  resetSnowflakeSizzle();
  resetSkull();
  game = new Game(currentConfig, onGameEnd);
  state = 'game';

  // Start appropriate background music
  if (currentConfig.name === "Feather Fall") {
    featherMusic.loop();
  } else if (currentConfig.name === "Snowflake Sizzle") {
    snowflakeMusic.loop();
  } else if (currentConfig.name === "Laughing Skull") {
    skullMusic.loop();
  }
}

// Callback for when the game ends (to update streak).
function onGameEnd(result) {
  // result is 'success' or 'fail'
  if (result === 'success') {
    streak++;
    // Play landed sound based on current variation
    if (currentConfig.name === "Feather Fall") {
      landed_feather_sound.play();
    } else if (currentConfig.name === "Snowflake Sizzle") {
      landed_snowflake_sound.play();
    } else if (currentConfig.name === "Laughing Skull") {
      landed_skull_sound.play();
    }
  } else {
    streak = 0;
  }
}
