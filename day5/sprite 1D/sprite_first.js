let spritImg; let sX = 4, sY = 8;
let sprites = [];
let count=0;
function preload() {
  spriteImg = loadImage("sprite/explosionFull.png");
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  let sWidth = spriteImg.width / sY;
  let sHeight = spriteImg.height / sX;
  for (let i = 0; i < sX; i = i + 1) {
    for (let j = 0; j < sY; j = j + 1) {
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);


    }
  }
  console.log(sprites);


}

function draw() {
  background(20);
  // let totalFrame= sX*sY;
  // image(sprites[frameCount%(sprites.length)], 0, 0);

  if(isKeyPressed){
    count++;
    }
    image(sprites[count%sprites.length],0,0);
  

}

// function keyPressed(){
//   if(keyCode==32){

//   }
// }
