let input;

function setup() {
  createCanvas(400, 400);
  background(220);
  input = createInput();
  input.position(20, 65);
  
}

function mouseClicked() {


  if (mouseX > 200 && mouseX < 250 &&
    mouseY > 200 && mouseY < 250) {
    fill("black");
    rect(200, 200, 150, 150);  
    console.log("button clicked");
    //background("red");
  }
}



function draw() {
  fill("blue");
  rect(200, 200, 50, 50);

}

function sendUserData(userId, score) {
  fetch('https://yourserver.com/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, score })
  });
}
