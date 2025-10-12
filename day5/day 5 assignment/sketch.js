let input;
  const firebaseConfig = {
    apiKey: "AIzaSyD8y1IAERiz0lCCvRR5CkEfEr-mY7dapBg",
    authDomain: "day5assignment-83a44.firebaseapp.com",
    projectId: "day5assignment-83a44",
    storageBucket: "day5assignment-83a44.firebasestorage.app",
    messagingSenderId: "34046351331",
    appId: "1:34046351331:web:4cd8266737e7232c74f2d6",
    measurementId: "G-GY7N3E0W18"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let nameInput, messageInput, submitButton;

function setup() {
  createCanvas(400, 300);
  textSize(16);

  nameInput = createInput();
  nameInput.position(20, 50);
  nameInput.attribute('placeholder', 'Your name');

  messageInput = createInput();
  messageInput.position(20, 90);
  messageInput.attribute('placeholder', 'Your message');

  submitButton = createButton('Submit');
  submitButton.position(20, 130);
  submitButton.mousePressed(submitData);
}

// function mouseClicked() {


//   if (mouseX > 200 && mouseX < 250 &&
//     mouseY > 200 && mouseY < 250) {
//     fill("black");
//     rect(200, 200, 150, 150);  
//     console.log("button clicked");
//     //background("red");
//   }
// }

function submitData() {
  const name = nameInput.value();
  const message = messageInput.value();

  if (name && message) {
    const userRef = database.ref('users').push(); // creates a unique ID
    userRef.set({
      name: name,
      message: message,
      timestamp: Date.now()
    });

    nameInput.value('');
    messageInput.value('');
  }
}

// function draw() {
//   fill("blue");
//   rect(200, 200, 50, 50);

// }


