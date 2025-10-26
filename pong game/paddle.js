class Paddle {
  constructor(x, y, w, h, speed,color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.color=color;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  moveUp() {
    this.y -= this.speed;
    this.y = max(0, this.y); 
  }

  moveDown() {
    this.y += this.speed;
    this.y = min(height - this.h, this.y); 
  }

  moveTo(targetY) {
    let dy = targetY - this.y;
    this.y += dy * 0.09;
    this.y = constrain(this.y, 0, height - this.h); 
  }
}
