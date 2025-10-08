function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  let noiseLevel = 255;
  let noiseScale = 0.008;
  for(let i=0; i<width; i=i+1){
    for(let j=0; j<height; j=j+1){
      let nX= noiseScale*i;
      let nY= noiseScale*j;
      let nT= noiseScale * frameCount;
      let c= noiseLevel*noise(nX,nY);
    
      
      stroke(c);
      
      point(i,j);
    }
  }
  
}
