//html elements
const numClicksText = document.getElementById("numClicks");
const numRightClicksText = document.getElementById("numRightClicks");
const msPassedText = document.getElementById("msPassed");
const numDoubleClicksText = document.getElementById("numDoubleClicks");

const leftDoubleClicksText = document.getElementById("leftDoubleClicks");
const rightDoubleClicksText = document.getElementById("rightDoubleClicks");
const msPassedRightText = document.getElementById("msPassedRight");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const clickWindowTxt = document.getElementById("clickWindowTxt");

const consoleBox = document.getElementById("console-box");
//consoleBox.value = "";
consoleBox.textContent = "";

//left clicks
let numClicks = 0;
let timeInterval;
let msCount = 0;
let leftDoubleClicks = 0;
document.addEventListener("click", handleMouseClick);
let lastTime = 0; //stores the last date in ms for a click

function handleMouseClick(event) {
  /* console.log(numClicks); */
  if (numClicks > 0) {
    msCount = Date.now() - lastTime; //update msCount here so that the second click isn't incorrectly reported
    checkDoubleClick(0);
  }
  numClicks++;
  updateNumClicksText();

  restartTimer();
  lastTime = Date.now();
}

function restartTimer() {
  clearInterval(timeInterval);
  msCount = 0;
  msPassedText.textContent = msCount.toString().padStart(4, "0");

  //set time interval to 1 ms; this is just used to update the timer display
  timeInterval = setInterval(() => {
    //msCount++;
    let msCountTemp = Date.now() - lastTime;
    msPassedText.textContent = msCountTemp.toString().padStart(4, "0");
  }, 1);
  msCount = Date.now() - lastTime;
}

function updateNumClicksText() {
  numClicksText.textContent = numClicks.toString().padStart(4, "0");
}

//right clicks
let numRightClicks = 0;
let timeIntervalRight;
let msCountRight = 0;
let rightDoubleClicks = 0;
/* window.oncontextmenu = (e) => {
  e.preventDefault();
  console.log("right clicked");
};
 */

/* document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  console.log("right click detected!");
}); */

document.addEventListener("contextmenu", handleRightMouseClicks);
let lastTimeRight = 0;

function handleRightMouseClicks(event) {
  event.preventDefault(); //prevents context menu from showing up
  if (numRightClicks > 0) {
    msCountRight = Date.now() - lastTimeRight;
    checkDoubleClick(1);
  }
  numRightClicks++;
  numRightClicksText.textContent = numRightClicks.toString().padStart(4, "0");

  restartTimerRight();
  lastTimeRight = Date.now();
}

function restartTimerRight() {
  clearInterval(timeIntervalRight);
  msCountRight = 0;
  msPassedRightText.textContent = msCountRight.toString().padStart(4, "0");

  //set time interval to 1 ms
  timeIntervalRight = setInterval(() => {
    //msCountRight++;
    let msCountTemp = Date.now() - lastTimeRight;
    msPassedRightText.textContent = msCountTemp.toString().padStart(4, "0");
  }, 1);

  msCountRight = Date.now() - lastTimeRight;
}

let numDoubleClicks = 0; //the total number of double clicks between right and left clicks
let doubleClickWindow = 80; //defines the time window for two consecutive clicks to be considered a double click in ms
clickWindowTxt.textContent = doubleClickWindow;

//checks for double clicks, mousebutton param determines whether it checks for left(0) or right(1) clicks
function checkDoubleClick(mousebutton) {
  if (mousebutton == 0) {
    console.log("mscount: " + msCount);
    //consoleBox.value += "\n " + msCount + " ";
    consoleBox.textContent += "Left Click: " + msCount + " ms\n";
    //consoleBox.scrollTop = consoleBox.scrollHeight;
    if (msCount < doubleClickWindow) {
      numDoubleClicks++;
      numDoubleClicksText.textContent = numDoubleClicks
        .toString()
        .padStart(4, "0");

      if (mousebutton == 0) {
        leftDoubleClicks++;
        leftDoubleClicksText.textContent = leftDoubleClicks
          .toString()
          .padStart(4, "0");
      } else if (mousebutton == 1) {
        rightDoubleClicks++;
        rightDoubleClicksText.textContent = rightDoubleClicks
          .toString()
          .padStart(4, "0");
      }

      consoleBox.textContent += "Left Mouse Button Double Click Detected!\n";
    }
  } else if (mousebutton == 1) {
    console.log("msCountRight: " + msCountRight);
    consoleBox.textContent += "Right Click: " + msCountRight + " ms\n";
    //consoleBox.scrollTop = consoleBox.scrollHeight;
    if (msCountRight < doubleClickWindow) {
      numDoubleClicks++;
      numDoubleClicksText.textContent = numDoubleClicks
        .toString()
        .padStart(4, "0");

      rightDoubleClicks++;
      rightDoubleClicksText.textContent = rightDoubleClicks
        .toString()
        .padStart(4, "0");

      consoleBox.textContent += "Right Mouse Button Double Click Detected!\n";
    }
  }
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

inputBtn.addEventListener("click", function () {
  console.log("input button clicked!");
  if (inputEl.value != "") {
    console.log("input field isnt empty");
    doubleClickWindow = inputEl.value;
    clickWindowTxt.textContent = doubleClickWindow;
    console.log("doubleClickWindow: " + doubleClickWindow);
  }
});
