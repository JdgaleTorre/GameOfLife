function Cell(xIndex, yIndex, width, state, age) {
  this.xIndex = xIndex;
  this.yIndex = yIndex;
  this.width = width;
  this.x = xIndex * width;
  this.y = yIndex * width;
  this.age = age;
  this.state = state;
}

Cell.prototype.show = function () {
  if (this.state == States.ALIVE) {
    if(this.age < 50) {
      fill(255);
    } else if(this.age > 50 && this.age < 100) {
      fill(86, 227, 159);
    } else if(this.age > 100) {
      fill(250, 25, 139);
    }
    stroke(0);
    rect(this.x, this.y, this.width - 1, this.width - 1);
  }
};

Cell.prototype.countNeighbors = function () {
  let countAlive = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let neighborX = (this.xIndex + i + cols) % cols;
      let neighborY = (this.yIndex + j + rows) % rows;
        if(grid[neighborX][neighborY].state == States.ALIVE) {
          countAlive++;
        }
    }
  }

  if(this.state == States.ALIVE) {
    countAlive--;
  }

  return countAlive;
};
