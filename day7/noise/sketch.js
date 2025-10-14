function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,0,100);

  //perlin noise 1D

  // let noiseValue=noise(0.01*frameCount+1000);
  // let noiseMapped= map(noiseValue,0,1,10,200);
  // ellipse(width/2,height/2,noiseMapped);

  // perlin noise 2D
  for(let i=0; i<width;i+=2){
    for(let j=0;j<height;j+=2){

      let outputNoise=noise(0.005*(i+frameCount), 0.005*j);
      fill(outputNoise*255);
      noStroke();
      rect(i,j,2,2);
    }
  }

}
