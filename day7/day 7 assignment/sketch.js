let flowers = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(220);

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].mouseMove(mouseX, mouseY);
    flowers[i].swayFlower();
    flowers[i].grow();
    flowers[i].drawFlower();

  }
}

function mousePressed() {
  let tempFlower = new Flower(mouseX,mouseY, 1, 1);
  flowers.push(tempFlower);


}
