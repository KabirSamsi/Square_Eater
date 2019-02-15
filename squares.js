class Square {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  create() {
    ctx.fillStyle = "grey"
    ctx.fillRect(this.x, this.y, 50, 50)
  }

  square() {
    ctx.fillStyle = "yellow"
    ctx.fillRect(this.x + 10, this.y + 10, 30, 30)
  }

  food() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x + 17.5, this.y + 17.5, 15, 15)
  }

}
