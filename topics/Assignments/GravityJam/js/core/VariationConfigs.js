/**
 * Defines configuration objects for each variation:
 * - Feather Fall
 * - Snowflake Sizzle
 * - Laughing Skull
 * 
 * Each config references backgroundDraw, objectDraw, targetDraw functions,
 * gravity, objectMass, target area info, and inputForceMagnitude.
 */

"use strict";

// Feather Variation Configuration
// A gentle feather drifting down to a nest
const featherVariation = {
  name: "Feather Fall",
  backgroundDraw: drawFeatherfallBackground,
  objectDraw: drawFeather,
  targetDraw: drawNest,
  objectMass: 0.5,
  gravity: { x: 0, y: 0.005 },
  targetX: 280,
  targetY: 425,
  targetWidth: 80,
  targetHeight: 20,
  inputForceMagnitude: 0.5
};

// Snowflake Variation Configuration
// A snowflake falling onto a candle flame
const snowflakeVariation = {
  name: "Snowflake Sizzle",
  backgroundDraw: drawSnowflakeBackground,
  objectDraw: drawSnowflake,
  targetDraw: drawCandle,
  objectMass: 0.8,
  gravity: { x: 0, y: 0.015 },
  targetX: 310,
  targetY: 400,
  targetWidth: 20,
  targetHeight: 50,
  inputForceMagnitude: 0.3
};

// Skull Variation Configuration
// A laughing skull descending onto a throne in a psychedelic background
const skullVariation = {
  name: "Laughing Skull",
  backgroundDraw: drawSkullBackground,
  objectDraw: drawSkull,
  targetDraw: drawThrone,
  objectMass: 1.2,
  gravity: { x: 0, y: 0.025 },
  targetX: 290,
  targetY: 400,
  targetWidth: 60,
  targetHeight: 60,
  inputForceMagnitude: 0.7
};