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

// Placeholder configurations for other variations
const snowflakeVariation = {
  name: "Snowflake Sizzle",
  config: null // Not yet implemented
};

const skullVariation = {
  name: "Laughing Skull",
  config: null // Not yet implemented
};