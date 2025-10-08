let x, y, i, size, choice;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  x = 0; y = 0; size = 20;
}

function draw() {
background(220);

  for (let i = 0; i < width; i = i + size) {
      for (let j = 0; j < height; j = j + size) {
      let choice = random(0,1);
      if(choice<0.5){
        line(i,j, i+size, j+size);
      }
      else{
        line(i+size,j, i, j+size);
      }
  }
  }

}
