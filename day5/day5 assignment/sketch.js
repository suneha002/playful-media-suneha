let objectCreated = [false, false, false]; 
let touchPromptCount = 0;
let showYesButton = false;
let fairyImage = null;
let showFairy = false;
let showWishOptions = false;
let wishChosen = false;

let objectJustClicked = false;
let bgImages = [];
let numImages = 5;
let currentIndex = 0;
let interval = 30;

let segment = 0;
let line = 0;
let waitingForInteraction = false;
let currentObject = null;
let chosenObject = null;

let objectClicked = [false, false, false];

let dialogue = [
  ["....", "I'm at the beach", "the wind is smoothing" , "now i can-", "?", "is that something sparkling over there?"],
  ["[you obtained: A Magic Wand]", "? what could this possibly be? a toy?", "i see something else already"],
  ["[you obtained: Starry Headband]", "??" ,"More weird things keep showing up"],
  ["?!?!?!?", "what the hell is that?!", "thing: 'im a fairy'", "it's talking?!", "fairy(?): have you seen my wand and headband?", "you mean these?",
   "fairy(surely):yes!", "fairy(surely): you're a kind person", "fairy(surely): i can fulfill one wish for you", "really?", "fairy:really!", "fairy: so whats your wish? choose wisely", "fairy:excellent"]
];

let objectImages = [];
let objectData = [
  { imageIndex: 0 },
  { imageIndex: 1 },
  { imageIndex: 2 }
];

function preload() {
  for (let f = 0; f < numImages; f++) {
    let name = "images/Assets-sea-" + f + ".jpg";
    bgImages[f] = loadImage(name);
  }

  objectImages[0] = [loadImage("images/wand.png"), loadImage("images/Water.png")];
  objectImages[1] = [loadImage("images/band.png"), loadImage("images/parrot.png")];
  objectImages[2] = [loadImage("images/butt.png"), loadImage("images/realCat.png")];

  fairyImage = loadImage("images/fairy.png");
}

function setup() {
  createCanvas(600, 400);
  textSize(18);
  textAlign(LEFT, TOP);
}

function draw() {
  imageMode(CORNER);
  image(bgImages[currentIndex], 0, 0, width, height);
  if (frameCount % interval === 0) {
    currentIndex = (currentIndex + 1) % bgImages.length;
  }

  if (segment === dialogue.length - 1 && chosenObject && !showFairy) {
    chosenObject.display();
  }

  drawDialogueBox(
    waitingForInteraction && touchPromptCount < 3
      ? "[touch it?]"
      : dialogue[segment][line]
  );

  if (currentObject !== null) {
    currentObject.display();
  }

  if (showYesButton) {
    drawYesButton();
  }

  if (showFairy && fairyImage) {
    imageMode(CENTER);
    image(fairyImage, width / 2, height / 2-50, fairyImage.width/2.5, fairyImage.height/2.5);
    imageMode(CORNER);
  }

  if (showWishOptions && !wishChosen) {
    drawWishOptions();
  }
}

function mousePressed() {
  if (showWishOptions && !wishChosen) {
    for (let i = 0; i < 3; i++) {
      let bx = width / 2 - 150 + i * 110;
      let by = height / 2 + 100;
      let bw = 100;
      let bh = 40;
      if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
        console.log("Wish chosen: to be free");
        wishChosen = true;
        line++;
        return;
      }
    }
  }

  if (showYesButton) {
    let bx = width / 2 - 50;
    let by = height / 2 + 100;
    let bw = 100;
    let bh = 40;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      console.log("Yes button clicked!");
      showYesButton = false;
  showFairy = true;
  line++; 
  return;
    }
  }

  if (waitingForInteraction && currentObject !== null) {
    if (currentObject.isClicked(mouseX, mouseY)) {
      currentObject.activate();
      chosenObject = currentObject;
      objectClicked[segment] = true;
      currentObject = null;
      waitingForInteraction = false;
      touchPromptCount++;
      nextSegment();
    }
  } else {
    line++;
    if (dialogue[segment][line] === "you mean these?") {
      showYesButton = true;
    }
    if (dialogue[segment][line] === "fairy(surely): so whats your wish? choose wisely") {
      showWishOptions = true;
    }

    if (line >= dialogue[segment].length) {
      line = 0;
      waitingForInteraction = true;

      if (
        segment < objectData.length &&
        !objectClicked[segment] &&
        !objectCreated[segment]
      ) {
        let imgPair = objectImages[objectData[segment].imageIndex];
        currentObject = new VNObject(width / 2, height / 2, 500, imgPair);
        objectCreated[segment] = true;
      } else {
        currentObject = null;
      }
    }
  }
}

function nextSegment() {
  segment++;
  if (segment >= dialogue.length) {
    segment = dialogue.length - 1;
    line = 0;
  }
}

function drawDialogueBox(textContent) {
  fill(0, 150);
  rect(0, height - 100, width, 100);
  fill(255);
  text(textContent, 20, height - 80, width - 40, 80);
}

function drawYesButton() {
  fill(255);
  stroke(0);
  rect(width / 2 - 50, height / 2 + 100, 100, 40, 140);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("give them?", width / 2, height / 2 + 120);
}

function drawWishOptions() {
  let labels = ["to be free", "to be free", "to be free"];
  for (let i = 0; i < labels.length; i++) {
    let bx = width / 2 - 150 + i * 110;
    let by = height / 2 + 100;
    fill(255);
    stroke(0);
    rect(bx, by, 100, 40, 10);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(labels[i], bx + 50, by + 20);
  }
}

class VNObject {
  constructor(x, y, r, imgPair) {
    Object.assign(this, { x, y, r, imgPair, clicked: false });
  }
  display() {
    imageMode(CENTER);
    let img = this.clicked ? this.imgPair[1] : this.imgPair[0];
    image(img, this.x, this.y, this.r, this.r);
    imageMode(CORNER);
  }
  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r / 2;
  }
  activate() {
    this.clicked = true;
  }
}