function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function draw() {


}
 function mousePressed(){
  let ears;
  ears=random(100,50);
  drawMouse(mouseX,mouseY, ears);
 }

function drawMouse(x,y, ear){

  fill(random(100,250),(50,70),0);
  noStroke();
  ellipse(x+ear/2,y-ear/2,ear);
  ellipse(x-ear/2,y-ear/2,ear);
  fill("pink");
  ellipse(x,y, ear*2);
  
}
