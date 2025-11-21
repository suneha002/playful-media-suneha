class Paddle {
  constructor(x, y, w, h, speed, color, side="left") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.color = color;
    this.side = side;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h, 6);
  }

  moveUp() {
    this.y -= this.speed;
    this.y = max(0, this.y);
  }

  moveDown() {
    this.y += this.speed;
    this.y = min(height - this.h, this.y);
  }
}

class MindPaddle {
  constructor(x, y, w, h, speed, color, outerPaddle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.color = color;
    this.outer = outerPaddle;
  }

  moveTo() {
    let targetY = this.outer.y;
    let dy = targetY - this.y;

    this.y += dy * 0.08 + sin(frameCount * 0.02) * 0.4;

    if (random() < 0.01) {
      this.y += random(-8, 8);
    }

    this.y = constrain(this.y, 0, height - this.h);
  }

  show() {
    push();
    drawingContext.filter = "blur(4px)";
    fill(this.color);
    rect(this.x, this.y, this.w, this.h, 6);
    drawingContext.filter = "none";
    pop();

    fill(red(this.color), green(this.color), blue(this.color), 120);
    rect(this.x, this.y, this.w, this.h, 6);
  }
}

class Ball {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = 12;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    fill(220);
    ellipse(this.x, this.y, this.r * 2);
  }

  checkCollisionWall() {
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.vy *= -1;
    }
  }

  checkCollisionPaddleInfluence(outer, mind) {
    if (
      this.x - this.r < mind.x + mind.w &&
      this.x + this.r > mind.x &&
      this.y + this.r > mind.y &&
      this.y - this.r < mind.y + mind.h
    ) {
      let diff = abs(outer.y - mind.y);
      let align = 1 - constrain(diff / 300, 0, 1);
      let strength = map(align, 0, 1, 0.6, 1.3);

      this.vx = -this.vx * strength;

      let paddleCenter = mind.y + mind.h / 2;
      let rel = (this.y - paddleCenter) / (mind.h / 2);
      this.vy += rel * (2 + (1 - align) * 3);

      if (outer.side === "left") {
        this.x = mind.x + mind.w + this.r;
      } else {
        this.x = mind.x - this.r;
      }

      try { pingSound.play(); } catch(e){}
    }
  }

  checkWinner() {
    if (this.x < 0) return 2;
    if (this.x > width) return 1;
    return 0;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random([-5, 5]);
    this.vy = random([-3, 3]);
  }
}

let gBall;
let paddle1, paddle2, paddle1Mind, paddle2Mind, player1 = 0, player2 = 0;

let pingSound, bgMusic;
let gameStarted = false;
let gameOver = false;
let frameGlow = 0;
let glowDir = 1;
let winnerText = "";

function preload() {
  pingSound = loadSound("sound/2.mp3");
  bgMusic = loadSound("sound/2_long.mp3");
}

function setup() {
  createCanvas(1000, 800);
  gBall = new Ball(width / 2, height / 2, 5, 5);

  let pWidth = 15, pHeight = 80;

  let outerColor = color(245, 110, 80);
  let innerColor = color(80, 200, 255);

  paddle1 = new Paddle(50, height/2 - pHeight/2, pWidth, pHeight, 10, outerColor, "left");
  paddle1Mind = new MindPaddle(30, height/2 - pHeight/2, pWidth - 7, pHeight, 2, innerColor, paddle1);

  paddle2 = new Paddle(width - pWidth - 50, height/2 - pHeight/2, pWidth, pHeight, 10, outerColor, "right");
  paddle2Mind = new MindPaddle(width - pWidth - 30, height/2 - pHeight/2, pWidth - 7, pHeight, 2, innerColor, paddle2);
}

function draw() {
  drawBg();
  drawFrame();

  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255, 230, 250);
    text(winnerText, width/2, height/2 - 40);
    textSize(24);
    text("Press ENTER to Restart", width/2, height/2 + 20);
    return;
  }

  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255, 230, 250);
    text("Press ENTER to Start", width/2, height/2);
    return;
  }

  stroke(255, 180);
  strokeWeight(2);
  drawingContext.setLineDash([15, 15]);
  line(width / 2, 0, width / 2, height);
  drawingContext.setLineDash([]);

  noStroke();
  textAlign(CENTER, CENTER);

  textSize(18);
  fill(180, 220, 255, 200);
  text("PLAYER 1", width / 4, 45);
  text("PLAYER 2", 3 * width / 4, 45);

  textSize(40);
  fill(60, 230, 230);
  text(player1, width / 4, 80);

  fill(255, 100, 150);
  text(player2, 3 * width / 4, 80);

  if (keyIsDown(UP_ARROW)) paddle2.moveUp();
  else if (keyIsDown(DOWN_ARROW)) paddle2.moveDown();

  if (keyIsDown(87)) paddle1.moveUp();
  else if (keyIsDown(83)) paddle1.moveDown();

  paddle1Mind.moveTo();
  paddle2Mind.moveTo();

  paddle1Mind.show();
  paddle2Mind.show();
  paddle1.show();
  paddle2.show();

  drawMismatchBeam(paddle1, paddle1Mind);
  drawMismatchBeam(paddle2, paddle2Mind);

  gBall.move();
  gBall.checkCollisionPaddleInfluence(paddle1, paddle1Mind);
  gBall.checkCollisionPaddleInfluence(paddle2, paddle2Mind);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if (point == 1) {
    player1++;
    gBall.reset();
  } else if (point == 2) {
    player2++;
    gBall.reset();
  }

  if (player1 >= 10 || player2 >= 10) {
    gameOver = true;
    gameStarted = false;
    winnerText = player1 >= 10 ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
    bgMusic.stop();
  }
}

function drawMismatchBeam(outer, mind) {
  let diff = abs(outer.y - mind.y);
  let t = constrain(diff / 150, 0, 1);
  let c = lerpColor(color(100,200,255), color(255,120,150), t);

  stroke(red(c), green(c), blue(c), 180);
  strokeWeight(2);
  drawingContext.setLineDash([6,6]);
  line(
    outer.x + outer.w/2, outer.y + outer.h/2,
    mind.x + mind.w/2, mind.y + mind.h/2
  );
  drawingContext.setLineDash([]);
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameOver) {
      player1 = 0;
      player2 = 0;
      gameOver = false;
      gBall.reset();
    }
    gameStarted = true;
    if (!bgMusic.isPlaying()) bgMusic.loop();
  }
}

function drawBg() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(10, 10, 30), color(30, 10, 50), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawFrame() {
  frameGlow += glowDir * 0.7;
  if (frameGlow > 60 || frameGlow < 0) glowDir *= -1;

  noFill();
  stroke(100 + frameGlow * 2, 250, 250, 200);
  strokeWeight(4);
  rect(20, 20, width - 40, height - 40, 20);
}
