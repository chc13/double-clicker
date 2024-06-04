//html elements
const numLeftClicksText = document.getElementById("numClicks");
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

const resetBtn = document.getElementById("reset-btn");

const contextCheckbox = document.getElementById("contextCheckbox");

const doubleclickCountEl = document.getElementById("dblCount");
const clickstatsLeftEl = document.getElementById("clickstatsLeft");
const clickstatsRightEl = document.getElementById("clickstatsRight");

//dark mode toggle stuff
const cssroot = document.querySelector(":root");
let localColors = JSON.parse(localStorage.getItem("localColors"));
const radioDark = document.getElementById("dark");
const radioLight = document.getElementById("light");

//event listeners to change color scheme on the toggle, will save settings in localstorage
radioLight.addEventListener("click", function () {
  document.documentElement.setAttribute("color-scheme", "light");
  localStorage.setItem("localColors", JSON.stringify("light"));
  localColors = "light";
});

radioDark.addEventListener("click", function () {
  document.documentElement.setAttribute("color-scheme", "dark");
  localStorage.setItem("localColors", JSON.stringify("dark"));
  localColors = "dark";
});

//this determines whether or not the color scheme will switch on system preference change
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (localColors) {
      console.log("local storage detected, no change will occur");
    } else {
      if (event.matches) {
        console.log("switched to dark mode on system prefs detected");
        document.documentElement.setAttribute("color-scheme", "dark");
        radioDark.checked = true;
      } else {
        console.log("switched to light mode on system prefs detected");
        document.documentElement.setAttribute("color-scheme", "light");
        radioLight.checked = true;
      }
    }
  });

//this will set the page's color scheme on load
function initLoadColorScheme() {
  let radioCheck = "dark";

  if (localColors) {
    document.documentElement.setAttribute("color-scheme", localColors);
    radioCheck = localColors;
  } else {
    radioCheck = getCSSVariable("--COLOR-MODE");
    document.documentElement.setAttribute("color-scheme", radioCheck);
  }

  //precheck the correct toggle for the light toggle
  if (radioCheck == "light") {
    radioLight.checked = true;
  } else {
    radioDark.checked = true;
  }
}

//gets the css variable in root's property, using this to grab --COLOR-MODE from css root
function getCSSVariable(cssvar) {
  let rs = getComputedStyle(cssroot);
  console.log("The value of " + cssvar + " is: " + rs.getPropertyValue(cssvar));

  return rs.getPropertyValue(cssvar);
}

//code to make sure page is fully loaded before doing anything
window.addEventListener("load", function () {
  console.log("page is fully loaded, now apply functions");
  // startup code stuff here
  initLoadColorScheme();
  consoleBox.textContent = "";
  inputEl.value = 80;
});

//resets console box
resetBtn.addEventListener("click", function () {
  consoleBox.textContent = "";
});

//left clicks
let numLeftClicks = 0;
let timeIntervalLeft;
let msCountLeft = 0;
let leftDoubleClicks = 0;
let lastTimeLeft = 0; //stores the last date in ms for a click

document.addEventListener("click", function () {
  if (numLeftClicks > 0) {
    msCountLeft = Date.now() - lastTimeLeft; //update msCountLeft here so that the second click isn't incorrectly reported
    checkDoubleClick(0);
  }
  numLeftClicks++;

  numLeftClicksText.textContent = numLeftClicks.toString().padStart(4, "0"); //updates text for number of left clicks

  restartTimerLeft();
  lastTimeLeft = Date.now();
});

//restarts the interval timer for left mouse clicks
function restartTimerLeft() {
  clearInterval(timeIntervalLeft);
  msCountLeft = 0;
  msPassedText.textContent = msCountLeft.toString().padStart(4, "0");

  //set time interval to 1 ms; this is just used to update the timer display
  timeIntervalLeft = setInterval(() => {
    let msCountTemp = Date.now() - lastTimeLeft;
    msPassedText.textContent = msCountTemp.toString().padStart(4, "0");
  }, 1);
  msCountLeft = Date.now() - lastTimeLeft;
}

//right clicks
let numRightClicks = 0;
let timeIntervalRight;
let msCountRight = 0;
let rightDoubleClicks = 0;

let lastTimeRight = 0;

document.addEventListener("contextmenu", function (event) {
  //prevents context menu from showing up if context menu checkbox is checked
  if (contextCheckbox.checked) {
    event.preventDefault();
  }

  if (numRightClicks > 0) {
    msCountRight = Date.now() - lastTimeRight;
    checkDoubleClick(1);
  }
  numRightClicks++;
  numRightClicksText.textContent = numRightClicks.toString().padStart(4, "0");

  restartTimerRight();
  lastTimeRight = Date.now();
});

function restartTimerRight() {
  clearInterval(timeIntervalRight);
  msCountRight = 0;
  msPassedRightText.textContent = msCountRight.toString().padStart(4, "0");

  //set time interval to 1 ms
  timeIntervalRight = setInterval(() => {
    let msCountTemp = Date.now() - lastTimeRight;
    msPassedRightText.textContent = msCountTemp.toString().padStart(4, "0");
  }, 1);

  msCountRight = Date.now() - lastTimeRight;
}

let numDoubleClicks = 0; //the total number of double clicks between right and left clicks
let doubleClickWindow = 80; //defines the time window for two consecutive clicks to be considered a double click in ms
clickWindowTxt.textContent = doubleClickWindow;

let timeIntervalAlert;

//starts a 2000ms timer that resets the click stats elements classes
function restartAlertTimer() {
  clearInterval(timeIntervalAlert);

  timeIntervalAlert = setInterval(() => {
    //reset colors after 2000ms
    doubleclickCountEl.className = "doubleclick";
    clickstatsLeftEl.classList = "clickstats clickstats--left";
    clickstatsRightEl.classList = "clickstats clickstats--right";
    clearInterval(timeIntervalAlert);
  }, 2000);
}

//checks for double clicks, mousebutton param determines whether it checks for left(0) or right(1) clicks
function checkDoubleClick(mousebutton) {
  if (mousebutton == 0) {
    //consoleBox.textContent += "Left Click: " + msCountLeft + " ms\n";
    newConsoleMsg("Left Click: " + msCountLeft + " ms");

    if (msCountLeft < doubleClickWindow) {
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

      //consoleBox.textContent += "Left Mouse Button Double Click Detected!\n";
      newConsoleMsg("Left Mouse Button Double Click Detected!");

      //change double click element color to alert
      if (doubleclickCountEl.className == "doubleclick") {
        doubleclickCountEl.className += " doubleclick--alert";
      }
      if (clickstatsLeftEl.classList == "clickstats clickstats--left") {
        clickstatsLeftEl.classList += " clickstats--alert";
      }
      restartAlertTimer();
    }
  } else if (mousebutton == 1) {
    //consoleBox.textContent += "Right Click: " + msCountRight + " ms\n";
    newConsoleMsg("Right Click: " + msCountRight + " ms");

    if (msCountRight < doubleClickWindow) {
      numDoubleClicks++;
      numDoubleClicksText.textContent = numDoubleClicks
        .toString()
        .padStart(4, "0");

      rightDoubleClicks++;
      rightDoubleClicksText.textContent = rightDoubleClicks
        .toString()
        .padStart(4, "0");

      //consoleBox.textContent += "Right Mouse Button Double Click Detected!\n";
      newConsoleMsg("Right Mouse Button Double Click Detected!");

      //change double click element color to alert
      if (doubleclickCountEl.className == "doubleclick") {
        doubleclickCountEl.className += " doubleclick--alert";
      }
      if (clickstatsRightEl.classList == "clickstats clickstats--right") {
        clickstatsRightEl.classList += " clickstats--alert";
      }

      restartAlertTimer();
    }
  }
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

//changes double click window on button click
inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    doubleClickWindow = inputEl.value;
    clickWindowTxt.textContent = doubleClickWindow;
    newConsoleMsg("Time Window changed to " + inputEl.value + " ms");
  }
});

//displays messages in the console box
function newConsoleMsg(msg) {
  consoleBox.textContent += msg + "\n";
  consoleBox.scrollTop = consoleBox.scrollHeight;
}
