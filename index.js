const startButton = document.querySelector(".startButton");
const startContainer = document.querySelector(".startContainer");
const storyContainer = document.querySelector(".storyContainer");
const gameContainer = document.querySelector(".gameContainer");
const endContainer = document.querySelector(".endContainer");
const jumpButton = document.querySelector(".jumpButton");
const runningRabbit = document.querySelector(".runningRabbit");
const runtimeImage1 = document.querySelector(".runtimeImage1");
const runtimeImage2 = document.querySelector(".runtimeImage2");
const runtimeImage3 = document.querySelector(".runtimeImage3");
const scoreDisplay = document.querySelector(".score");
const textContainer1 = document.querySelector(".textContainer1");
let score = 0;
let gameInterval, imageChangeInterval;

startButton.addEventListener("click", function () {
  startContainer.style.display = "none";
  storyContainer.style.display = "flex";
  setTimeout(function () {
    storyContainer.style.display = "none";
    gameContainer.style.display = "flex";
    imageChangeInterval = setInterval(changeImage, 2000);
    gameInterval = setInterval(gamePlay, 1000);
  }, 5000);
});

function changeImage() {
  if (gameContainer.style.display === "flex") {
    runtimeImage1.style.display = "none";
    runtimeImage2.style.display = "none";
    runtimeImage3.style.display = "none";
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
      runtimeImage1.style.display = "flex";
    } else if (randomNumber === 1) {
      runtimeImage2.style.display = "flex";
    } else if (randomNumber === 2) {
      runtimeImage3.style.display = "flex";
    }
  }
}

jumpButton.addEventListener("click", function () {
  runningRabbit.classList.add("jump");
  setTimeout(function () {
    runningRabbit.classList.remove("jump");
  }, 500);
});

function getElementCoordinates(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function checkCollision(element1, element2) {
  const rect1 = getElementCoordinates(element1);
  const rect2 = getElementCoordinates(element2);
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function gamePlay() {
  if (checkCollision(runningRabbit, runtimeImage2)) {
    score++;
    scoreDisplay.textContent = score;
  }
  if (checkCollision(runningRabbit, runtimeImage1) || checkCollision(runningRabbit, runtimeImage3)) {
    clearInterval(gameInterval);
    clearInterval(imageChangeInterval);
    startContainer.style.display = "none";
    gameContainer.style.display = "none";
    storyContainer.style.display = "none";
    endContainer.style.display = "flex";
    textContainer1.textContent = score > 25 ? 'You Did It! Let Us Meet' : 'Please, Try Again For Me!!!';
    setTimeout(function () {
      history.go(0);
    }, 5000);
  }
}
