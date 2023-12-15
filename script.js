//html elements
const numClicksText = document.getElementById("numClicks");
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

/* window.oncontextmenu = (e) => {
  e.preventDefault();
  console.log("right clicked");
};
 */

document.addEventListener("contextmenu", (event) => {
  console.log("right click detected!");
});

let timeInterval;
let msCount = 0;

function restartTimer() {
  clearInterval(timeInterval);
  msCount = 0;

  //set time interval to 1 ms
  timeInterval = setInterval(() => {
    msCount++;
    msPassedText.textContent = msCount.toString().padStart(4, "0");
  }, 1);
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
