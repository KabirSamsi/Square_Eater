const body = document.querySelector("body")
const canvas = document.querySelector("canvas")
const width = canvas.width = 780
const height = canvas.height = 416
let ctx = canvas.getContext('2d')

const up = document.querySelector("#up")
const down = document.querySelector("#down")
const left = document.querySelector("#left")
const right = document.querySelector("#right")
const start = document.querySelector("#start")

let playerX = 0
let playerY = 0
let randomCoors = []

const createMaze = () => {
  for (let x = 0; x < width; x += 52) {
    for (let y = 0; y < width; y += 52){
      let square = new Square(x, y)
      square.create()
      if (x == playerX && y == playerY) {
        square.square()
      }
      for (coor of randomCoors) {
        if (x == coor[0] && y == coor[1]) {
          square.food()
      }}
    }}
  }

createMaze();

start.addEventListener('click', () => {

  for (let i = 0; i < 5; i ++) {
    randomCoors.push([Math.ceil(Math.random()*14)*52, Math.ceil(Math.random()*7)*52])
  }

  for (let coor of randomCoors) {
    while (coor == [0, 0]) {
      coor = [Math.ceil(Math.random()*14)*52, Math.ceil(Math.random()*7)*52]
    }
    counter = 0;
    while (counter < randomCoors.length) {
      if (randomCoors.indexOf(randomCoors[counter]) != counter) {
        randomCoors.splice(counter, 1)
      }
      counter ++;
    }
  }

  createMaze()
  const ael = (object, coorname, coor, boundary, msg, amount) => {
    object.addEventListener('click', () => {
      if ((coorname == "playerY" && playerY == boundary) || (coorname == "playerX" && playerX == boundary)) {
        alert(`You are in the ${msg}most level, cannot move`);
      } else if ((coorname == "playerY" && playerY != boundary) || (coorname == "playerX" && playerX != boundary)){
        if (coorname == "playerY") {
          playerY += amount;
        } else if (coorname == "playerX") {
          playerX += amount;
        }
        for (coor of randomCoors) {
          if (playerX == coor[0] && playerY == coor[1]) {
            randomCoors.splice(randomCoors.indexOf(coor), 1)
          }
        }
        createMaze()
      }
    })
  }


  const timer = document.createElement('strong')
  time = 10
  timer.innerHTML = "Time left: 10 seconds<br><br>"
  body.insertBefore(timer, up)
  $(timer).hide()
  $(timer).fadeIn(800)

  const changeTimer = () => {
    time -= 1
    timer.innerHTML = `Time left: ${time} seconds<br><br>`
  }

  countdown = window.setInterval(changeTimer, 1000, time)
  if (time == 0) {
    clearInterval(countdown)
    if (randomCoors.length > 0) {
      alert("Too bad! You lost the game.")
      body.removeChild(timer)
    }
  }

  ael(up, "playerY", playerY, 0, "top", -52)
  ael(down, "playerY", playerY, 52*7, "lower", 52)
  ael(right, "playerX", playerX, 52*14, "right", 52)
  ael(left, "playerX", playerX, 0, "left", -52);

})
