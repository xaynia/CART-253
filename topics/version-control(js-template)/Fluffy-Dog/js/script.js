/**
 * Dog
 * Acacia Williams
 *
 * Here is a fluffy dog
 */

// Custom variable for x coordinate of clouds - so they move!
let cloudOneX = 50;

// Custom variable for moving shooting stars
let lineXone = 0;
let lineYone = 0;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);

    // Set angle mode so that atan2() returns angles in degrees
    angleMode(DEGREES);
}

/**
 * Draw background
 */
function draw() {
    // Midnight blue background
    background(25, 25, 112);

    // Moon (cream)
    fill(255, 253, 208);
    circle(350, 50, 100);
    // Overlap with midnight blue sky color to create crescent moon
    stroke(25, 25, 112);
    fill(25, 25, 112);
    circle(320, 50, 100);

    // Grey mountains
    stroke(80);
    fill(80);
    triangle(-40, 300, 75, 100, 250, 300);
    triangle(100, 300, 300, 100, 500, 300);

    // Grass (hunter green)
    stroke(53, 94, 59);
    fill(53, 94, 59);
    rect(0, 300, 400, 100);

    // Clouds (white)
    stroke(255);
    fill(255);
    // Cloud 1: left cloud
    ellipse(cloudOneX, 50, 80, 40);
    // More clouds!!!
    ellipse(cloudOneX - 5, 40, 60, 40);

    ellipse(cloudOneX - 30, 90, 50, 10);
    ellipse(cloudOneX - 40, 100, 70, 20);
    ellipse(cloudOneX - 50, 110, 50, 20);

    ellipse(cloudOneX + 120, 80, 40, 10);
    ellipse(cloudOneX + 140, 80, 50, 14);

    // big cloud (right)
    ellipse(cloudOneX + 300, 30, 130, 19);
    ellipse(cloudOneX + 320, 20, 125, 30);
    ellipse(cloudOneX + 280, 30, 130, 25);
    ellipse(cloudOneX + 330, 20, 135, 20);

    ellipse(cloudOneX - 200, 50, 90, 60);
    ellipse(cloudOneX - 220, 50, 110, 65);
    ellipse(cloudOneX - 280, 50, 100, 62);


    // This makes clouds move!!! Woot
    // Set the x coordinate to the frame count
    // Resets at the left edge
    cloudOneX = frameCount % width
    // set shooting star to random location
    lineXone = random(0, width);
    lineYone = random(0, height / 2);

    // Trees

    // Different frame rate for trees and shooting stars 
    frameRate(15); //set frame rate to 15

    // Tree 1
    // trunk(dark brown)
    stroke(92, 64, 51);
    fill(92, 64, 51);
    rect(40, 270, 15, 50);
    // leaves (forest green)
    stroke(34, 139, 34);
    fill(34, 139, 34);
    // trees grow vertically via frame count
    triangle(25, 270, 45, 240 - frameCount % 2900, 70, 270);

    // Tree 2
    // trunk(dark brown)
    stroke(92, 64, 51);
    fill(92, 64, 51);
    rect(340, 330, 15, 50);
    // leaves (forest green)
    stroke(34, 139, 34);
    fill(34, 139, 34);
    triangle(325, 330, 345, 240 - frameCount % 290, 370, 330);

    //shooting star
    stroke("yellow");
    line(lineXone, lineYone, lineXone + 30, lineYone - 30);


    // No stroke everywhere!
    noStroke();
    drawDog();
}

/**
 * Draws the dog
 */
function drawDog() {
    drawHead();
    drawEyes();
    drawNose();
    drawMouth();
}

/**
 * Draws the dog's head (including its ears)
 */
function drawHead() {

    // dog head
    push();
    fill(210, 125, 45);
    ellipse(200, 350, 250);
    pop();

    // dog ears (truly hellish to find the numbers for these)
    push();
    fill(210, 125, 45);
    triangle(110, 290, 170, 260, 120, 230);
    triangle(230, 260, 290, 290, 280, 230);
    pop();
}

/**
 * Draws the dogs eyes, which follow the cursor
 */
function drawEyes() {
    // Draw left eye
    let leftEyeX = 150;
    let leftEyeY = 350;

    // Calculate angle between left eye and mouse
    let leftAngle = atan2(mouseY - leftEyeY, mouseX - leftEyeX);

    push();
    translate(leftEyeX, leftEyeY);
    // Eye white
    fill(255);
    ellipse(0, 0, 40);
    rotate(leftAngle);
    // Pupil
    fill(0);
    ellipse(10, 0, 25);
    pop();

    // Draw right eye
    let rightEyeX = 250;
    let rightEyeY = 350;

    // Calculate angle betwen right eye and mouse
    let rightAngle = atan2(mouseY - rightEyeY, mouseX - rightEyeX);

    push();
    translate(rightEyeX, rightEyeY);
    fill(255);
    // Eye white
    ellipse(0, 0, 40);
    rotate(rightAngle);
    //Pupil
    fill(0);
    ellipse(10, 0, 25);
    pop();
}

/**
 * Draws the dog's nose
 */
function drawNose() {
    // dog nose
    push();
    fill(0);
    triangle(190, 350, 210, 350, 200, 360);
    pop();
}

/**
 * Draws the dog's mouth
 */
function drawMouth() {
    // dog mouth
    push();
    strokeWeight(2);
    stroke(0);

    line(200, 360, 190, 370);
    line(200, 360, 210, 370);
    pop();
}