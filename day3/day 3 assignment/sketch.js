let i, j, size, choice;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  
  size=20;
  frameRate(5);
}

function draw() {
  background(220);
  for (let i = 0; i < width; i = i + size) {
      for (let j = 0; j < height; j = j + size) {
     fill(random(0,255),random(0,255),random(0));
      let choice=random(0,4); 
      push();
      translate(i+size/2,j+size/2);
      rotate(floor(random(2))*45);
      if (choice<1){
        ellipse(size/2,size/2,size/2,size/2);
      }
      else if (choice<2){
        rect(0,0,size,size/2);
      }
      else if (choice<3){
        rect(size/2,-size/2,size,size);
      }
      else if (choice<4){
        rect(0,0,size*1.5,size*1.5);
      }
      pop();
  
}
  }

}