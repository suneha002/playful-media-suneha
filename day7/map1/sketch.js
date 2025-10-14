function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  let c = map(mouseX, 0, width, 0, 255);
  background(c);
}
