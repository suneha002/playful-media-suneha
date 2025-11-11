let bg, xPos = 0, xSpeed = 0;
let circleX = 245;
let trail = [];

let scene = 1;
let dragStage = 1;

let startPoint = { x: 400, y: 170 };
let endPoint = { x: 550, y: 190 };
let dragging = false;
let dragComplete = false;

let transitionStart = 0;
let frameDuration = 250;

let dFrames = [];
let eFrames = [];
let aFrames = [];
let kFrames = [];

let numD = 13;
let numE = 15;
let numA = 27;
let numK = 26;

let sound, audio1, audio2, audio3;
let soundPlaying = false;

let fadeAlpha = 0;
let fadeStart = 0;
let fadeDuration = 3000;

function preload() {
  bg1 = loadImage("images/main1.png");
  bg2 = loadImage("images/main2.png");
  bg3 = loadImage("images/main.png");
  bg = loadImage("images/bg1.png");

  for (let f = 0; f < numD; f++) dFrames[f] = loadImage("images/d" + f + ".png");
  for (let f = 0; f < numE; f++) eFrames[f] = loadImage("images/e" + f + ".png");
  for (let f = 0; f < numA; f++) aFrames[f] = loadImage("images/a" + f + ".png");
  for (let f = 0; f < numK; f++) kFrames[f] = loadImage("images/k" + f + ".png");

  audio1 = loadSound("audio/fuljhadi.mp3");
  audio2 = loadSound("audio/bomb.mp3");
  audio3 = loadSound("audio/finalone.mp3");
  sound = loadSound("audio/trail.mp3");
}

function setup() {
  createCanvas(1000, 500);
  if (bg && bg.width) bg.resize(7671, 500);
  textFont('Helvetica');
}

function getConstrainedMouse() {
  let maxMX = (bg1 && bg1.width) ? bg1.width : width;
  let maxMY = height;
  let mx = constrain(mouseX, 0, maxMX);
  let my = constrain(mouseY, 0, maxMY);
  return { x: mx, y: my };
}

function draw() {
  background(30);
  if (scene === 1) drawScene1();
  else if (scene === 2) drawScene2();
  else if (scene === 3) drawScene3();
  else if (scene === 4) drawScene4();
  else if (scene === 5) drawScene5();
}

function drawScene1() {
  if (dragStage === 1 && bg1) image(bg1, 0, 0);
  else if (dragStage === 2 && bg2) image(bg2, 0, 0);
  else if (dragStage === 3 && bg3) image(bg3, 0, 0);

  let glow = map(sin(frameCount * 0.05), -1, 1, 50, 255);
  stroke(255, glow);
  line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

  noStroke();
  fill(255, 40);
  circle(startPoint.x, startPoint.y, 40);
  fill(255);
  circle(startPoint.x, startPoint.y, 30);
  fill(255, 40);
  circle(endPoint.x, endPoint.y, 40);
  fill(255);
  circle(endPoint.x, endPoint.y, 30);

  if (dragging) {
    let m = getConstrainedMouse();
    stroke(200, 220, 255, 180);
    strokeWeight(1);
    line(startPoint.x, startPoint.y, m.x, m.y);
  }

  noStroke();
  fill(220);
  textAlign(CENTER);
  textSize(18);
  if (dragStage === 1) text("A dazzling fuljhari... drag to light it up →", width / 2, 100);
  else if (dragStage === 2) text("This makes some noise... but that's fine right? It's diwali →", width / 2, 100);
  else if (dragStage === 3) text("A big and loud firecracker. light it up too? →", width / 2, 100);

  if (dragComplete) {
    if (audio1 && audio1.isPlaying()) audio1.stop();
    if (audio2 && audio2.isPlaying()) audio2.stop();
    if (audio3 && audio3.isPlaying()) audio3.stop();

    if (dragStage === 1 && audio1 && audio1.isLoaded()) {
      audio1.play();
    } else if (dragStage === 2 && audio2 && audio2.isLoaded()) {
      audio2.play();
    } else if (dragStage === 3 && audio3 && audio3.isLoaded()) {
      audio3.rate(0.75);
      audio3.play();
    }

    dragComplete = false;
    scene = 2;
    transitionStart = millis();
  }
}

function drawScene2() {
  let elapsed = millis() - transitionStart;
  let frameIndex = floor(elapsed / frameDuration);

  if (dragStage === 1) {
    if (frameIndex < numD) {
      image(dFrames[frameIndex], 0, 0, width, height);
    } else {
      if (audio1 && audio1.isPlaying()) audio1.stop();
      dragStage = 2;
      scene = 1;
    }
  } else if (dragStage === 2) {
    if (frameIndex < numE) {
      image(eFrames[frameIndex], 0, 0, width, height);
    } else {
      if (audio2 && audio2.isPlaying()) audio2.stop();
      dragStage = 3;
      scene = 1;
    }
  } else if (dragStage === 3) {
    if (frameIndex < numA) {
      image(aFrames[frameIndex], 0, 0, width, height);
    } else {
      if (audio3 && audio3.isPlaying()) audio3.stop();
      scene = 3;
    }
  }
}

let kStartTime = 0;
let kPlaying = false;

function drawScene3() {
  let maxX = max(0, (bg && bg.width ? bg.width : width) - width);
  if (keyIsPressed) xPos += xSpeed;
  xPos = constrain(xPos, 0, maxX);

  if (bg && bg.width) {
    let bgnew = bg.get(xPos, 0, width, height);
    image(bgnew, 0, 0);
  } else {
    background(50, 60, 80);
  }

  let worldX = xPos + circleX;
  let circleY = pathFunction(worldX);

  stroke(255);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < trail.length; i++) vertex(trail[i].x - xPos, trail[i].y);
  endShape();

  fill(229, 184, 109);
  noStroke();
  rect(circleX, circleY, 20, 25);

  trail.push({ x: worldX, y: circleY });
  if (trail.length > 1000) trail.shift();

  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("→ Press RIGHT ARROW to move →", width / 2, 40);

  if (xPos >= maxX && !kPlaying) {
    kPlaying = true;
    kStartTime = millis();

    if (sound && sound.isPlaying()) {
      sound.stop();
      sound.setLoop(false);
      soundPlaying = false;
    }

    scene = 4;
  }
}

function drawScene4() {
  let elapsed = millis() - kStartTime;
  let frameIndex = floor(elapsed / frameDuration);

  if (frameIndex < numK) {
    image(kFrames[frameIndex], 0, 0, width, height);
  } else {
    image(kFrames[numK - 1], 0, 0, width, height);
    if (fadeStart === 0) fadeStart = millis();
    let fadeElapsed = millis() - fadeStart;
    fadeAlpha = constrain(map(fadeElapsed, 0, fadeDuration, 0, 255), 0, 255);
    noStroke();
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    if (fadeAlpha >= 255) {
      scene = 5;
    }
  }
}

function drawScene5() {
  background(10);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(" Happy Diwali ? ", width / 2, height / 2 - 20);
  textSize(14);
  text("Press R to restart", width / 2, height / 2 + 30);
}

function pathFunction(x) {
  if (x < 1060) return 350 - 90 * sin(map(x, 0, 500, 0, PI));
  else if (x < 1900) return 300 + 50 * sin(x * 0.015);
  else if (x < 2500) return 300 + 50 * sin(x * 0.025);
  else if (x < 3500) return 300 + 60 * sin(x * 0.04) + 20 * sin(x * 0.03);
  else if (x < 4000) return 300 + 60 * sin(x * 0.05) + 60 * sin(x * 0.05);
  else if (x < 5000) return 300 + 65 * sin(x * 0.07) + 30 * sin(x * 0.07);
  else if (x < 6000) return 300 + 90 * sin(x * 0.08) + 40 * sin(x * 0.08);
  else return 300 + 60 * sin(x * 0.02) + 20 * sin(x * 0.01) + 90 * sin(x * 0.02);
}

function mousePressed() {
  if (scene === 1) {
    let m = getConstrainedMouse();
    let d = dist(m.x, m.y, startPoint.x, startPoint.y);
    if (d < 30) dragging = true;
  }
}

function mouseReleased() {
  if (scene === 1 && dragging) {
    dragging = false;
    let m = getConstrainedMouse();
    let d = dist(m.x, m.y, endPoint.x, endPoint.y);
    if (d < 30) {
      dragComplete = true;
    }
  }
}

function keyPressed() {
  if (scene === 3 && keyCode === RIGHT_ARROW) {
    let maxX = max(0, (bg && bg.width ? bg.width : width) - width);
    if (xPos < maxX) xSpeed = 5;
    else xSpeed = 0;

    if (sound && sound.isLoaded()) {
      sound.setLoop(true);
      if (!sound.isPlaying()) {
        sound.play();
      }
      soundPlaying = true;
    }
  }

  if (scene === 4 && keyCode === ENTER) {
    kStartTime = millis() - numK * frameDuration;
  }

  if (scene === 5 && (key === 'r' || key === 'R')) {
    scene = 1;
    dragStage = 1;
    dragComplete = false;
    dragging = false;
    xPos = 0;
    xSpeed = 0;
    trail = [];
    kPlaying = false;
    fadeAlpha = 0;
    fadeStart = 0;
  }
}

function keyReleased() {
  if (scene === 3 && keyCode === RIGHT_ARROW) {
    xSpeed = 0;
    if (soundPlaying && sound) {
      sound.pause();
      soundPlaying = false;
    }
  }
}
