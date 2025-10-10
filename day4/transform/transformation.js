let noPetal = 0; x = 0; y = 0;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawPetal(16, 100, 200);
  drawPetal(8, 50, 0);

}

function drawPetal(noPetal, x, y) {
  push();
  translate(x, y);
  rotate(frameCount);
  for (let i = 0; i < noPetal; i++) {
    fill("red");
    ellipse(80, 0, 150, 50);
    rotate(360 / noPetal);
  }
  fill("yellow");
  ellipse(0, 0, 60);
  pop();
}

