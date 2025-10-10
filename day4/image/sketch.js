// let size=40;
let genImg=[]; noImg=4;

function preload() {
  for(let i=0;i<noImg;i++){
    let name= "Sprite-000"+i+".png";
    genImg[i]= loadImage(name);
  }
  // img0 = loadImage('Sprite-0001.png');
  // img1 = loadImage('Sprite-0002.png');
  // img2 = loadImage('Sprite-0003.png');
  // img3 = loadImage('Sprite-0004.png');
}

function setup() {
  createCanvas(400, 400);
  frameRate(5);
}

function draw() {
  background(220);
  drawRect();
}
function drawRect() {

  for (let i = 0; i < width; i = i + 50) {
    for (let j = 0; j < height; j = j + 50) {
      let choice = floor(random(0, noImg));
      image(genImg[choice],i,j);

      // if (choice == 1) {
      //   image(img1, i, j);
      // }
      // else if (choice == 2) {
      //   image(img2, i, j);
      // }
      // else if (choice == 3) {
      //   image(img3, i, j);
      // }
      // else {
      //   image(img0, i, j);
      // }
    }
  }
}
