let objectCreated = [false, false, false];
let objectClicked = [false, false, false];

let touchPromptCount = 0;
let showYesButton = false;
let waitingForYesClick = false;
let waitingForWishClick = false;

let realCat = null;
let showRealCat = false;

let fairyImage = null;
let showFairy = false;

let showWishOptions = false;
let wishChosen = false;

let bgImages = [];
let numImages = 5;
let currentIndex = 0;
let interval = 30;

let bgMusic;

let segment = 0;
let line = 0;
let waitingForInteraction = false;

let gameFont;

let dialogue = [
  ["....", "I'm at the beach", "the wind is smoothing", "now i can-", "?", "is that something sparkling over there?"],
  ["[you obtained: A Magic Wand]", "? what could this possibly be? a toy?", "i see something else already"],
  ["[you obtained: Starry Headband]", "??", "More weird things keep showing up"],
  ["?!?!?!?", "what the hell is that?!", "thing: 'im a fairy'", "it's talking?!", "fairy(?): have you seen my wand and headband?", "you mean these? [magical wand & starry headband]",
    "fairy(surely): you're a kind person", "fairy(surely): i can fulfill one wish for you", "really?", "fairy(surely):really!", "fairy: so whats your wish? choose wisely", "fairy:excellent", "fairy: now take these wings and fly far away", "fairy: you will be free."]
];

let objectImages = [];
let objectData = [
  { imageIndex: 0, vnObject: null },
  { imageIndex: 1, vnObject: null },
  { imageIndex: 2, vnObject: null }
];


let endingScene = false;
let wingUp;
let wingSprite;
let wFrame = 0;
let wCount = 6;
let wInterval = 10;
let wWidth = 352;
let wHeight = 255;
let showEnd = false;

function preload() {

  bgMusic = loadSound("sound/bg.mp3");
  for (let f = 0; f < numImages; f++) {
    let name = "images/Assets-sea-" + f + ".jpg";
    bgImages[f] = loadImage(name);
  }

  objectImages[0] = [loadImage("images/wand2.png")];
  objectImages[1] = [loadImage("images/band2.png")];
  objectImages[2] = [loadImage("images/butt2.png")];

  realCat = loadImage("images/realCat.png");
  fairyImage = loadImage("images/fairy.png");

  wingSprite = loadImage("images/wing.png"); 
  scene2=loadImage("images/scene2.jpg");
  gameFont = loadFont("font/GomePixel.otf");
}

function setup() {
  createCanvas(1400, 1200);
  textFont(gameFont);
  textSize(30);
  textAlign(CENTER, TOP);
  bgMusic.loop();
  wingUp = height - 100;
}

function draw() {
  if (endingScene) {
    drawEndingScene();
    return;
  }

  imageMode(CORNER);
  image(bgImages[currentIndex], 0, 0, width, height);
  if (frameCount % interval === 0) {
    currentIndex = (currentIndex + 1) % bgImages.length;
  }

  for (let i = 0; i < objectData.length; i++) {
    if (objectCreated[i] && !objectClicked[i]) {
      objectData[i].vnObject.display();
    }
  }

  drawDialogueBox(
    waitingForInteraction && touchPromptCount < 3
      ? "[touch it?]"
      : dialogue[segment][line]
  );

  if (showYesButton) {
    drawYesButton();
  }

  if (showRealCat && realCat && !showFairy) {
    imageMode(CENTER);
    image(realCat, width / 2, height / 2 - 50, realCat.width, realCat.height);
    imageMode(CORNER);
  }

  if (showFairy && fairyImage) {
    imageMode(CENTER);
    image(fairyImage, width / 2, height / 2 - 50, fairyImage.width, fairyImage.height);
    imageMode(CORNER);
  }

  if (showWishOptions && !wishChosen) {
    drawWishOptions();
  }
}

function drawEndingScene() {
  if (!showEnd) {
    image(scene2, 0, 0, width, height);

    let sx = wFrame * wWidth;
    let sy = 0;
    image(
      wingSprite,
      width / 2 - 120, wingUp,
      wWidth, wHeight,
      sx, sy,
      wWidth, wHeight
    );

    if (frameCount % wInterval === 0) {
      wFrame = (wFrame + 1) % wCount;
    }

    if (keyIsDown(87)) {
      wingUp -= 5;
      if (wingUp < -60) {
        showEnd = true;
      }
    }
  } else {
    // 🖤 Fade to black
    background(0);

    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("You are free.", width / 2, height / 2);
  }
}
function mousePressed() {
  if (waitingForWishClick && showWishOptions && !wishChosen) {
    let bx = width / 2;
    let by = height / 2 + 180;
    let bw = 150;
    let bh = 40;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      console.log("Wish chosen: to be free");
      wishChosen = true;
      waitingForWishClick = false;
      showWishOptions = false;
      line++;


      if (dialogue[segment][line] === "fairy: you will be free.") {
        endingScene = true;
      }
    }
    return;
  }

  if (waitingForYesClick && showYesButton) {
    let bx = width / 2;
    let by = height / 2 + 180;
    let bw = 100;
    let bh = 40;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      console.log("Yes button clicked!");
      showYesButton = false;
      waitingForYesClick = false;
      showFairy = true;
      line++;
    }
    return;
  }

  if (waitingForInteraction) {
    for (let i = 0; i < objectData.length; i++) {
      if (objectCreated[i] && !objectClicked[i]) {
        let obj = objectData[i].vnObject;
        if (obj.isClicked(mouseX, mouseY)) {
          obj.activate();
          objectClicked[i] = true;
          touchPromptCount++;
          waitingForInteraction = false;
          nextSegment();

          if (i === 2) {
            showRealCat = true;
          }
          break;
        }
      }
    }
  } else {
    line++;
    let currentLineText = dialogue[segment][line] || "";

    if (currentLineText.includes("you mean these?")) {
      showYesButton = true;
      waitingForYesClick = true;
    }

    if (currentLineText.includes("so whats your wish")) {
      showWishOptions = true;
      waitingForWishClick = true;
    }

    if (currentLineText.includes("you will be free")) {
      endingScene = true;
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
        objectData[segment].vnObject = new VNObject(random(420, 1200), random(420, 600), 170, imgPair);
        objectCreated[segment] = true;
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
  rectMode(CENTER);
  rect(width / 2, height - 120, width - 100, 100);

  fill(255);
  text(textContent, width / 2, height - 100, width - 40, 80);
}

function drawYesButton() {
  fill(255);
  stroke(0);
  rect(width / 2, height / 2 + 180, 100, 40, 10);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Yes", width / 2, height / 2 + 180);
}

function drawWishOptions() {
  // let bx = width / 2 - 50;
  // let by = height / 2 + 100;
  fill(255);
  stroke(0);
  rect(width / 2, height / 2 + 180, 150, 40, 10);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("to be free", width / 2, height / 2 + 180);
}