let x, y, size, choice;

function setup() {
  createCanvas(400, 400);
  background(220);
  x=0; y=0; size=20;
}

function draw() {
 

  //pick a random no between 0 and 1
  let choice=random(0,2);
  //if less than 0.5 draw / else draw \


  if(choice<0.5){
    
    stroke(random(0,255),random(0,255),random(0,255));
    line(x+size, y, x, y+size);
  }
  else if(choice>=0.5 && choice<1){
      stroke(random(0,255),random(0,255),random(0,255));
      line(x, y, x+size, y+size);
  }
  else if(choice>=1 && choice<1.5){
      fill("blue");
      ellipseMode(CORNER);
      ellipse(x, y, size,size);
  }
  else{
    fill("yellow");
    rect(x,y,size);
  }

  // move the point
  x=x+size;
  if(x>width){
    x=0; y=y+size;
  }



}
