const body = document.querySelector("body");
const canvas = document.querySelector("canvas");
const width = canvas.width = 780;
const height = canvas.height = 416;
let ctx = canvas.getContext('2d');

const h1 = document.querySelector('h1')
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const start = document.querySelector("#start");
const eaten = document.querySelector("#eaten");
const remaining = document.querySelector("#remaining");
let ate = 0;
let rmn = 5;

let playerX = 0;
let playerY = 0;
let potential_coors = [];
let randomCoors = [];

$(eaten).hide();
$(remaining).hide();
eaten.style.color = "red";
remaining.style.color = "blue";

const createMaze = () => {
  for (let x = 0; x < width; x += 52) {
    for (let y = 0; y < width; y += 52){
      let square = new Square(x, y);
      square.create();
      if (x == playerX && y == playerY) {
        square.square();
      }
      for (coor of randomCoors) {
        if (x == coor[0] && y == coor[1]) {
          square.food();
      }};
    }};
  };

createMaze();

$(start).click(() => {

  for (let x = 52; x < 52*14; x += 52) {
    for (let y = 52; y < 52*7; y += 52) {
      potential_coors.push([x, y]);
    }
  }
  for (let i = 0; i < 5; i ++) {
    randomCoors.push(potential_coors[Math.floor(Math.random()*potential_coors.length)]);
    potential_coors.splice(potential_coors.length-1, 1);
  };

  createMaze();
  const ael = (object, coorname, coor, boundary, msg, amount) => {
    $(object).click(() => {
      if ((coorname == "playerY" && playerY == boundary) || (coorname == "playerX" && playerX == boundary)) {
        alert(`You are in the ${msg}most level, cannot move`);
      } else if ((coorname == "playerY" && playerY != boundary) || (coorname == "playerX" && playerX != boundary)){
        if (coorname == "playerY") {
          playerY += amount;
        } else if (coorname == "playerX") {
          playerX += amount;
        };
        for (coor of randomCoors) {
          if (playerX == coor[0] && playerY == coor[1]) {
            randomCoors.splice(randomCoors.indexOf(coor), 1);
            ate += 1;
            rmn -=1;
            eaten.innerHTML = `Squares Eaten: ${ate}`;
            remaining.innerHTML = `Squares Left: ${rmn}`;

          };
        };
        createMaze();
      };
    });
  };

  const timer = document.createElement('strong');
  time = 10;
  timer.innerHTML = "Time left: 10 seconds<br><br>";
  body.insertBefore(timer, up);
  $(timer).hide();
  $(timer).fadeIn(800);
  $(eaten).fadeIn(800);
  $(remaining).fadeIn(800);

  const changeTimer = () => {
    time -= 1;
    timer.innerHTML = `Time left: ${time} seconds<br><br>`;
    return time;
    console.log(ate)
    if (ate == 5) {
      alert("Yay! You won the game")
    }
  };

  countdown = window.setInterval(changeTimer, 1000);

  window.setTimeout(() => {
    clearInterval(countdown)
    alert("Sorry you lost")
  }, 10120)

  ael(up, "playerY", playerY, 0, "top", -52);
  ael(down, "playerY", playerY, 52*7, "lower", 52);
  ael(right, "playerX", playerX, 52*14, "right", 52);
  ael(left, "playerX", playerX, 0, "left", -52);

});
