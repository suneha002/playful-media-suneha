let flowers=[];
let noFlowers=3;

function setup() {
  createCanvas(innerWidth,innerHeight);
  for(let i=0;i<noFlowers;i+=1){
    let tempFlower=new Flower(random(0,width), random(0,height), 50,3);
    flowers.push(tempFlower);
  }
}

function draw() {
  background(220);
  for (let i=0;i<flowers.length; i++){
    flowers[i].show();
    flowers[i].move();
    flowers[i].grow();
  }
}
