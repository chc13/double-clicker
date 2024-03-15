//html elements
const numClicksText = document.getElementById("numClicks");
const numRightClicksText = document.getElementById("numRightClicks");
const msPassedText = document.getElementById("msPassed");
const numDoubleClicksText = document.getElementById("numDoubleClicks");

let numClicks = 0;
document.addEventListener("click", handleMouseClick);

function handleMouseClick(event) {
  /* console.log(numClicks); */
  if (numClicks > 0) {
    checkDoubleClick();
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
  //event.preventDefault(); //prevents context menu from showing up
  console.log("right click detected!");
  if (numRightClicks > 0) {
    checkDoubleClick();
  }
  numRightClicks++;
  numRightClicksText.textContent = numRightClicks.toString().padStart(4, "0");

  restartTimer();
}

let timeInterval;
let msCount = 0;

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

let numDoubleClicks = 0;
const doubleClickWindow = 8;

function checkDoubleClick() {
  if (msCount < doubleClickWindow) {
    numDoubleClicks++;
    numDoubleClicksText.textContent = numDoubleClicks
      .toString()
      .padStart(4, "0");
  }
}
