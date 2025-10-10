let angle=0;
function setup() {
  createCanvas(500, 600);
  
  }

function draw() {
  background("#F289A8");
  noStroke();
  fill("black");
  rect(5,5,490,590);
  radialGradient(
  width/2,height/2,0,
  width/2,height/2,500,
  color("#df5780ff"),
  color("#e4b551ff"),
  );
  push();
  translate(width/2, height/2);
  angle += radians(2);
  rotate(angle);
  
  rectMode(CENTER);
  ellipse(30, 30, sin(frameCount/100)*200);
  pop();
  for (let a=0; a<radians(360); a+=radians(30)) {
    push();3
    translate(width/2, height/2);   
    rotate(a);                      
    translate(0, 200);              
    rotate(-angle);                 
    rectMode(CENTER);
    fill("#fcea76ff");
    ellipse(20, 20, 20);
    pop();

  
  }
  
}

function radialGradient(sX,sY,sR,eX,eY,eR,colorS,colorE){
  let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.fillStyle = gradient;
}