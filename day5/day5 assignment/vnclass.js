class VNObject {
  constructor(x, y, r, imgPair) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.imgPair = imgPair;
    this.clicked = false;
  }
  display() {
    imageMode(CENTER);
    let img;
    if (this.clicked) {
      img = this.imgPair[1];
    } else {
      img = this.imgPair[0];
    }
    image(img, this.x, this.y, this.r, this.r);
    imageMode(CORNER);
  }
  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r / 2;
  }
  activate() {
    this.clicked = true;
  }
}