// let myCar, myCar2;
let cars=[];
let noCars=20;

function setup() {
  createCanvas(innerWidth,innerHeight);
  // myCar= new Car(20,300,40,10);
  // myCar2= new Car(200,200,60,2);

  for(let i=0;i<noCars;i+= 1){
    let tempCar=new Car(random(0,width), random(0,height), 50,3);
    cars.push(tempCar);
  }
}

function draw() {
  background(220);
  for(let i=0; i<cars.length;i++){
    cars[i].show(mouseX/4);
    cars[i].move();
    cars[i].grow();
    
  }


//   tempCar[].show();
//   tempCar.move();
}