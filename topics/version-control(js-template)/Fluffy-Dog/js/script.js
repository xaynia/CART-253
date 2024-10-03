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
 * Draws the dogs two eyes
 */
function drawEyes() {
    // Left dog eye
    push();
    fill(255);
    ellipse(150, 350, 30);
    fill(0);
    ellipse(150, 350, 25);
    pop();

    // Right dog eye
    push();
    fill(255);
    ellipse(250, 350, 30);
    fill(0);
    ellipse(250, 350, 25);
    pop();
}

/**
 * Draws the dog's nose
 */
function drawNose() {
    // dog nose
    push();
    fill(0);
    triangle(190, 340, 210, 340, 200, 360);
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