class Ball {
    constructor(x, y, xspeed, yspeed, size) {
        this.x = x;
        this.y = y;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.size = 20;
    }
    show() {
        circle(this.x, this.y, this.size);
    }
    move(){
        this.y+=this.yspeed;
        this.x+=this.xspeed;
    }
reset() {
    this.x = width/2;
    this.y = height/2;
  }

  checkCollisionWall() {
    if(this.y <this.size/2 || this.y>height-this.size/2) {
      this.yspeed = -this.yspeed;
    }
  } 
  checkWinner() {
    if(this.x<0) {
      return 2;
    } else if(this.x>width) {
      return 1;
    } else {
      return 0;
    }
  }

  checkCollisionPaddle(paddle) {
     if(this.x<paddle.x+paddle.width &&
      this.x > paddle.x &&
      this.y<paddle.y + paddle.height &&
      this.y > paddle.y
    ) {
      console.log("BAM!!");
      this.xspeed = -this.xspeed*1.2;
    }
  }
}
