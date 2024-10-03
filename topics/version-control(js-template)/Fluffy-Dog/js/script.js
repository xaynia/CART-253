/**
 * Dog
 * Acacia Williams
 *
 * Here is a fluffy dog
 */

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);

    // Set angle mode so that atan2() returns angles in degrees
    angleMode(DEGREES);
}

/**
 * Draws the dog
 */
function draw() {
    // Sky blue background
    background(135, 206, 235);

    // No stroke everywhere!
    noStroke();

    drawDog();
}

/**
 * Draws the dog using functions
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