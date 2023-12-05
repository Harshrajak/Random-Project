const bgmButton = document.querySelector("#bgmbtn");
const musicIcon = document.querySelector("#musicicon");
const bgm = document.querySelector("#bgm");
bgm.volume = 0.4;

const soundButton = document.querySelector("#soundbtn");
const rightSound = document.querySelector("#rightsound");
const wrongSound = document.querySelector("#wrongsound");
const startSound = document.querySelector("#startsound");
const gameoverSound = document.querySelector("#gameoversound");
rightSound.volume = 0;
wrongSound.volume = 0;
startSound.volume = 0;
gameoverSound.volume = 0;

var timeInterval;
var timer = 60;
var score = 0;
var hitrandom = 0;
var wrongClickCount = 0;
var bubbleCount = 119;

function startGame() {
  var startButton = document.querySelector(".startbtn");

  startButton.addEventListener("click", function () {
    startSound.play();
    var overlay = document.querySelector(".start-overlay");
    overlay.classList.add("hide");
    setTimer();
    makeBubble();
    getNewHit();
  });
}
startGame();

function restartGame() {
  var restartButton = document.querySelector(".endbtn");

  restartButton.addEventListener("click", function () {
    startSound.play();
    var overlay = document.querySelector(".end-overlay");
    overlay.classList.remove("expose");
    timer = 60;
    setTimer();
    resetScore();
    resetCross();
    wrongClickCount = 0;
    makeBubble();
    getNewHit();
  });
}
restartGame();

function gameOver() {
  var endOverlay = document.querySelector(".end-overlay");
  endOverlay.classList.add("expose");
  var finalscore = document.querySelector("#scorevalue").textContent;
  document.querySelector("#digit").textContent = finalscore;
}

function getNewHit() {
  hitrandom = Math.floor(Math.random() * 10);
  document.querySelector("#pressvalue").textContent = hitrandom;
}
getNewHit();

function utilityFunction() {
  var panelbottom = document.querySelector(".panelbottom");
  panelbottom.addEventListener("click", function (details) {
    var clickedNumber = Number(details.target.textContent);
    if (clickedNumber === hitrandom) {
      rightSound.play();
      updateScore();
      getNewHit();
      makeBubble();
    } else {
      wrongSound.play();
      getNewHit();
      makeBubble();

      var cross1 = document.querySelector("#cross1");
      var cross2 = document.querySelector("#cross2");
      var cross3 = document.querySelector("#cross3");

      wrongClickCount++;

      if (wrongClickCount === 1) {
        cross1.classList.add("active");
      } else if (wrongClickCount === 2) {
        cross2.classList.add("active");
      } else if (wrongClickCount === 3) {
        cross3.classList.add("active");
        clearInterval(timeInterval);
        setTimeout(() => {
          gameoverSound.play();
          gameOver();
        }, 1000);
      }
    }
  });
}
utilityFunction();

function makeBubble() {
  var clutter = "";
  for (var i = 1; i <= bubbleCount; i++) {
    var randomValue = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${randomValue}</div>`;
  }
  document.querySelector(".panelbottom").innerHTML = clutter;
}
makeBubble();

function updateScore() {
  score += 10;
  document.querySelector("#scorevalue").textContent = score;
}

function setTimer() {
  timeInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.querySelector("#timervalue").innerHTML = timer;
    } else {
      clearInterval(timeInterval);  
      gameoverSound.play();
      gameOver();
    }
  }, 1000);
}

function resetScore() {
  score = 0;
  document.querySelector("#scorevalue").textContent = score;
}

function resetCross() {
  var cross1 = document.querySelector("#cross1");
  var cross2 = document.querySelector("#cross2");
  var cross3 = document.querySelector("#cross3");

  cross1.classList.remove("active");
  cross2.classList.remove("active");
  cross3.classList.remove("active");
}

function toggleBGM() {
  if (bgm.paused) {
    bgm.play();
    musicIcon.src = "music_on.png";
  } else {
    bgm.pause();
    musicIcon.src = "music_off.png";
  }
}

function toggleSound() {
  if (rightSound.volume === 0) {
    rightSound.volume = 1;
    wrongSound.volume = 1;
    startSound.volume = 1;
    gameoverSound.volume = 1;
    soundButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  } else {
    rightSound.volume = 0;
    wrongSound.volume = 0;
    startSound.volume = 0;
    gameoverSound.volume = 0;
    soundButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  }
}

function visibilityCheckForMusic() {
  if(document.visibilityState) {
    document.addEventListener("visibilitychange", () => {
      if(!bgm.paused && document.visibilityState === "hidden") {
        toggleBGM();
      }
      if(rightSound.volume === 1 && document.visibilityState === "hidden") {
        toggleSound();
      }
    });
  }
} visibilityCheckForMusic();