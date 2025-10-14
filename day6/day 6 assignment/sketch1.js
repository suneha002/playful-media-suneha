let flowers = [];
let noPetal = 0;
let noFlowers = 3;

function setup() {
  createCanvas(innerWidth, innerHeight);

}

function draw() {
  background(220);
  for (let i = 0; i < flowers.length; i++) {
    
    //check if mouse is one the flower
    flowers[i].changeColor(mouseX,mouseY);

    //moves and draws flowers
    flowers[i].move();
    flowers[i].drawFlower();

  }
}

function mousePressed() {
  let tempFlower = new Flower(random(width), random(height), random(10, 20), random(0, 5), random(5, 0));
  flowers.push(tempFlower);

}
