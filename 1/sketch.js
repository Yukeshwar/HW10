let song;
let peaks = [];

function preload() {
  song = loadSound('PartB.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  peaks = song.getPeaks(5 * width);
  noLoop();
}

function draw() {
  drawGradientBackground(); // Enhanced background gradient
  drawPeaks();
  drawDetailedCircle();
  drawPosterText();
}

function drawGradientBackground() {
  push();
  noStroke();

  // Create a vertical gradient
  for (let y = 0; y < height; y++) {
    let gradientColor = lerpColor(color('#001f3f'), color('#0074D9'), y / height);
    stroke(gradientColor);
    line(0, y, width, y);
  }

  // Add subtle glowing radial gradient
  for (let r = width * 1.5; r > 0; r -= 20) {
    let radialColor = lerpColor(color('#001f3f'), color('#7FDBFF'), r / (width * 1.5));
    fill(radialColor, 10); // Add transparency
    ellipse(width / 2, height / 2, r, r);
  }

  pop();
}

function drawPeaks() {
  let centerY = height / 2;
  strokeWeight(2);
  for (let i = 0; i < peaks.length; i++) {
    let x = map(i, 0, peaks.length, 0, width);
    let y = map(peaks[i], -1, 1, -height / 3, height / 3);

    let col = lerpColor(color('#ff6b6b'), color('#ffe66d'), peaks[i] * 0.5 + 0.5);
    stroke(col);

    noFill();
    beginShape();
    curveVertex(x, centerY);
    curveVertex(x, centerY - y * 0.6);
    curveVertex(x, centerY - y);
    curveVertex(x, centerY);
    endShape(CLOSE);

    beginShape();
    curveVertex(x, centerY);
    curveVertex(x, centerY + y * 0.6);
    curveVertex(x, centerY + y);
    curveVertex(x, centerY);
    endShape(CLOSE);
  }
}

function drawDetailedCircle() {
  push();
  noStroke();
  let centerX = width / 2;
  let centerY = height / 2;
  let maxRadius = min(width, height) / 4;

  for (let i = maxRadius; i > 0; i -= 5) {
    let t = map(i, 0, maxRadius, 0, 1);
    let gradientColor = lerpColor(color('#FF4500'), color('#320a59'), t);
    fill(gradientColor);
    ellipse(centerX, centerY, i * 2, i * 2);
  }

  pop();
}

function drawPosterText() {
  push();
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  fill(255);
  textSize(48);
  text("Static Sound Visualization", width / 2, height / 6);

  fill(200);
  textSize(24);
  text("Album Art ", width / 2, height / 6 + 50);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
