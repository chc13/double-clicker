//html elements
const numClicksText = document.getElementById("numClicks");
const numRightClicksText = document.getElementById("numRightClicks");
const msPassedText = document.getElementById("msPassed");
const numDoubleClicksText = document.getElementById("numDoubleClicks");

const leftDoubleClicksText = document.getElementById("leftDoubleClicks");
const rightDoubleClicksText = document.getElementById("rightDoubleClicks");
const msPassedRightText = document.getElementById("msPassedRight");

let numClicks = 0;
document.addEventListener("click", handleMouseClick);

function handleMouseClick(event) {
  /* console.log(numClicks); */
  if (numClicks > 0) {
    checkDoubleClick(0);
  }
  numClicks++;
  updateNumClicksText();

  restartTimer();
}

function updateNumClicksText() {
  numClicksText.textContent = numClicks.toString().padStart(4, "0");
}

let numRightClicks = 0;
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

function handleRightMouseClicks(event) {
  event.preventDefault(); //prevents context menu from showing up
  //console.log("right click detected!");
  if (numRightClicks > 0) {
    checkDoubleClick(1);
  }
  numRightClicks++;
  numRightClicksText.textContent = numRightClicks.toString().padStart(4, "0");

  restartTimerRight();
}

let timeInterval;
let timeIntervalRight;
let msCount = 0;
let msCountRight = 0;

function restartTimer() {
  clearInterval(timeInterval);
  msCount = 0;
  msPassedText.textContent = msCount.toString().padStart(4, "0");

  //set time interval to 1 ms
  timeInterval = setInterval(() => {
    msCount++;
    msPassedText.textContent = msCount.toString().padStart(4, "0");
  }, 1);
  //NOTE: setInterval is INACCURATE, find another solution
}

function restartTimerRight() {
  clearInterval(timeIntervalRight);
  msCountRight = 0;
  msPassedRightText.textContent = msCountRight.toString().padStart(4, "0");

  //set time interval to 1 ms
  timeIntervalRight = setInterval(() => {
    msCountRight++;
    msPassedRightText.textContent = msCountRight.toString().padStart(4, "0");
  }, 1);
}

let numDoubleClicks = 0;
const doubleClickWindow = 8;

let leftDoubleClicks = 0;
let rightDoubleClicks = 0;

function checkDoubleClick(mousebutton) {
  if (mousebutton == 0) {
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
    }
  } else if (mousebutton == 1) {
    if (msCountRight < doubleClickWindow) {
      numDoubleClicks++;
      numDoubleClicksText.textContent = numDoubleClicks
        .toString()
        .padStart(4, "0");

      rightDoubleClicks++;
      rightDoubleClicksText.textContent = rightDoubleClicks
        .toString()
        .padStart(4, "0");
    }
  }
}
