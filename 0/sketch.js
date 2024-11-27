let song;
let fft;
let amplitude;
let angleOffset = 0;

function preload() {
  song = loadSound('PartA.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  song.loop();
}

function draw() {
  background(0, 30);

  let spectrum = fft.analyze();
  let vol = amplitude.getLevel();

  translate(width / 2, height / 2);

  // Central Circle
  for (let r = 200; r > 0; r -= 10) {
    let gradientColor = lerpColor(color('#ff007f'), color('#00ffff'), r / 200);
    fill(gradientColor);
    noStroke();
    ellipse(0, 0, vol * 300 + r);
  }

  // Waves Around the Circle
  noFill();
  strokeWeight(2);
  for (let i = 0; i < spectrum.length; i += 10) {
    let amp = spectrum[i];
    let waveRadius = map(amp, 0, 256, 250, 500);

    let x1 = waveRadius * cos(i + angleOffset);
    let y1 = waveRadius * sin(i + angleOffset);
    let x2 = waveRadius * cos(i + 15 + angleOffset);
    let y2 = waveRadius * sin(i + 15 + angleOffset);

    // Gradient-filled waves
    let col = lerpColor(color('#ff007f'), color('#33ccff'), amp / 256);
    stroke(col);
    bezier(
      cos(i) * 200, sin(i) * 200, 
      x1, y1,                     
      x2, y2,                     
      cos(i + 15) * 200, sin(i + 15) * 200 
    );
  }

  angleOffset += 0.5; // Create rotation effect
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
