let gBall;
let paddle1, paddle2, paddle1Mind, paddle2Mind, player1 = 0, player2 = 0;

let pingSound, bgMusic;
let gameStarted = false; 
let gameOver = false;
let frameGlow = 0;
let glowDir = 1;

function preload() {
  pingSound = loadSound("sound/2.mp3");
  bgMusic = loadSound("sound/2_long.mp3");
}

function setup() {
  createCanvas(1000, 800);
  gBall = new Ball(width / 2, height / 2, 5, 5);

  let pWidth = 15, pHeight = 80;
  let pIColor = color(245, 60, 90, 40);
  let pColor = color(60, 250, 210);

  paddle1 = new Paddle(50, height / 2 - pHeight / 2, pWidth, pHeight, 10, pColor);
  paddle1Mind = new Paddle(30, height / 2 - pHeight / 2, pWidth - 7, pHeight, 2, pIColor);

  paddle2 = new Paddle(width - pWidth - 50, height / 2 - pHeight / 2, pWidth, pHeight, 10, pColor);
  paddle2Mind = new Paddle(width - pWidth - 30, height / 2 - pHeight / 2, pWidth - 7, pHeight, 2, pIColor);
}

function draw() {
  drawBg();
  drawFrame();

 
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255, 230, 250);
    text(winnerText, width / 2, height / 2 - 40);
    textSize(24);
    text("Press ENTER to Restart", width / 2, height / 2 + 20);
    return;
  }

 
  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255, 230, 250);
    text("Press ENTER to Start", width / 2, height / 2);
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

  paddle1Mind.moveTo(paddle1.y);
  paddle2Mind.moveTo(paddle2.y);

  paddle1.show();
  paddle1Mind.show();
  paddle2.show();
  paddle2Mind.show();

  gBall.move();
  gBall.checkCollisionPaddle(paddle1Mind);
  gBall.checkCollisionPaddle(paddle2Mind);
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

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameOver) {
      player1 = 0;
      player2 = 0;
      gameOver = false;
      gBall.reset();
    }
    gameStarted = true; 
    if (!bgMusic.isPlaying()) {
      bgMusic.loop(); 
    }
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
