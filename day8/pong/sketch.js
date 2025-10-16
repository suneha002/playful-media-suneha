let gBall;
let paddle1, paddle2, player1=0,player2=0;

let pingSound,bgMusic;
function preload(){
  pingSound=loadSound("sound/2.mp3");
  bgMusic=loadSound("sound/2_long.mp3");
}

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 5, 5);
  let pWidth = 10, pHeight = 40;
  paddle1 = new Paddle(0, height / 2 - pHeight / 2, pWidth, pHeight, 10);
  paddle2 = new Paddle(width - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 5);
}

function draw() {
  background(220);

  //ball
  gBall.move();
  gBall.checkCollisionPaddle(paddle1);
  gBall.checkCollisionPaddle(paddle2);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if(point == 1) {
    player1++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  } else if(point ==2 ) {
    player2++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }




  //paddle
  paddle1.show();
  paddle2.show();


  if (keyIsDown(UP_ARROW)) {
    paddle2.moveUp();
  }
  else if (keyIsDown(DOWN_ARROW)) {
    paddle2.moveDown();
  }

  if (keyIsDown(87)) {
    paddle1.moveUp();
  }
  else if (keyIsDown(83)) {
    paddle1.moveDown();
  }

}
