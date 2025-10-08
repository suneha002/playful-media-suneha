function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {

}

function mouseClicked(){
  if(mouseX<width/2 && mouseY<height/2){
    fill("yellow");
    ellipse(mouseX,mouseY,20);
  }
  else if(mouseX>width/2 && mouseY<height/2)
    {
    fill("red");
    rect(mouseX,mouseY,40,20);
  }
  else if(mouseX>width/2 && mouseY>height/2)
    {
    fill("blue");
    rect(mouseX,mouseY,40,20);
  }
  else{
    fill("green");
    ellipse(mouseX,mouseY,30);
  }
}
