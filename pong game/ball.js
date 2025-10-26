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

  checkCollisionPaddle(paddle) {
    // Check horizontal overlap
    if (
      this.x - this.r < paddle.x + paddle.w &&
      this.x + this.r > paddle.x &&
      this.y + this.r > paddle.y &&
      this.y - this.r < paddle.y + paddle.h
    ) {
      this.vx *= -1;

      // Optional: add slight vertical variation based on paddle movement
      this.vy += random(-1, 1);

      // Prevent sticking by nudging ball away from paddle
      if (this.vx > 0) {
        this.x = paddle.x + paddle.w + this.r;
      } else {
        this.x = paddle.x - this.r;
      }

      pingSound.play();
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
