let objectCreated = [false, false, false];
let objectClicked = [false, false, false];

let touchCount = 0;
let yesButton = false;
let yesClicked = false;
let wishClicked = false;

let realCat = null;
let showRealCat = false;

let fairyImage = null;
let showFairy = false;

let showWish = false;
let wishChosen = false;

let bgImages = [];
let numImages = 5;
let currentIndex = 0;
let interval = 30;

let bgMusic;
let tapSound;
let fairySound;

let segment = 0;
let line = 0;
let interaction = false;

let gameFont;

let dialogue = [
  ["....", "I'm at the beach", "the wind is soothing", "now i can-", "?", "is that something sparkling over there?"],
  ["[you obtained: A Magic Wand]", "? what could this possibly be? a toy?", "i see something else already"],
  ["[you obtained: Starry Headband]", "??", "More weird things keep showing up"],
  ["?!?!?!?", "what the hell is that?!", "thing: 'im a fairy'", "it's talking?!", "fairy(?): have you seen my wand and headband?", "you mean these? [magical wand & starry headband]",
    "fairy(surely): you're a kind person", "fairy(surely): i can fulfill one wish for you", "really?", "fairy(surely):really!", "fairy: so whats your wish?", "fairy:excellent", "fairy: now take these wings and fly far away", "fairy: you will be free."]
];

let objectImages = [];
let objectData = [
  { imageIndex: 0, vnObject: null },
  { imageIndex: 1, vnObject: null },
  { imageIndex: 2, vnObject: null }
];

let startScene = true;


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
  fairySound = loadSound("sound/Dreamy.mp3")
  tapSound = loadSound("sound/Tap.mp3");
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
  scene2 = loadImage("images/scene2.jpg");
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
  if (startScene) {
    drawStartScene();
    return;
  }

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
    interaction && touchCount < 3
      ? "[touch it?]"
      : dialogue[segment][line]
  );

  if (yesButton) {
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

  if (showWish && !wishChosen) {
    drawWishOptions();
  }
}

function drawStartScene() {
  background(0);
  fill(255);
  textFont(gameFont);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("【 Do you believe in fairies? 】", width / 2, height / 2 - 100);

  textSize(30);
  text("Click to read dialogues.....", width / 2, height / 2 + 50);
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
      if (wingUp < -120) {
        showEnd = true;
      }
    }
  } else {

    background(0);

    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("- for you who wish to stay a child a little longer", width / 2, height / 2);
  }
}
function mousePressed() {
  if (tapSound && tapSound.isLoaded()) {
    tapSound.play();
  }
  if (startScene) {
    startScene = false;
    return;
  }
  if (wishClicked && showWish && !wishChosen) {
    let bx = width / 2 - 50;
    let by = height / 2 + 400;
    let bw = 150;
    let bh = 40;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      console.log("Wish chosen: to be free");
      wishChosen = true;
      wishClicked = false;
      showWish = false;
      line++;


      if (dialogue[segment][line] === "fairy: you will be free.") {
        endingScene = true;
      }
    }
    return;
  }

  if (yesClicked && yesButton) {
    let bx = width / 2 - 50;
    let by = height / 2 + 400;
    let bw = 100;
    let bh = 40;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      console.log("Yes button clicked!");
      yesButton = false;
      yesClicked = false;
      showFairy = true;
      if (fairySound && fairySound.isLoaded()) {
        setTimeout(() => fairySound.play(), 500);
      }
      line++;
    }
    return;
  }

  if (interaction) {
    for (let i = 0; i < objectData.length; i++) {
      if (objectCreated[i] && !objectClicked[i]) {
        let obj = objectData[i].vnObject;
        if (obj.isClicked(mouseX, mouseY)) {
          obj.activate();
          objectClicked[i] = true;
          touchCount++;
          interaction = false;
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
      yesButton = true;
      yesClicked = true;
    }

    if (currentLineText.includes("so whats your wish")) {
      showWish = true;
      wishClicked = true;
    }

    if (currentLineText.includes("you will be free")) {

      setTimeout(() => {
        endingScene = true;
      }, 600);
    }
    if (line >= dialogue[segment].length) {
      line = 0;
      interaction = true;

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
  rect(width / 2, height - 100, width - 100, 100);

  fill(255);
  text(textContent, width / 2, height - 100, width - 40, 80);
}

function drawYesButton() {
  fill(255);
  stroke(0);
  rect(width / 2, height / 2 + 400, 100, 40, 10);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Yes", width / 2, height / 2 + 400);
}

function drawWishOptions() {
  // let bx = width / 2 - 50;
  // let by = height / 2 + 100;
  fill(255);
  stroke(0);
  rect(width / 2, height / 2 + 400, 150, 40, 10);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("to be free", width / 2, height / 2 + 400);
}