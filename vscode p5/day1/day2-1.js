function setup() {
  createCanvas(500, 500);
  background(220);
}

function draw() {
  
  //line(mouseX,mouseY,10,10);
  fill(mouseX/2,mouseY/2,mouseX/4+mouseY/4);

  //follows the mouse
  rect(mouseX,mouseY,15,10);

  //mirrors the mouse along the x axis
  rect(width-mouseX,mouseY,15,10);

  //mirrors the mouse along the y axis
  rect(mouseX, height-mouseY,15,10);

  //mirros both
  rect(width-mouseX, height-mouseY,15,10);
}
