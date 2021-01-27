let grid;
let cols;
let rows;
let resolution = 10;

var States = {
  DEAD: 0,
  ALIVE: 1,
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(800, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // grid[i][j] = new Cell(i,j, resolution, true, false, 0);
      if(floor(random(2)) == 1) {
        grid[i][j] = new Cell(i,j, resolution, States.ALIVE, 0);
      } else {
        grid[i][j] = new Cell(i,j, resolution, States.DEAD, 0);
      }

    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  // debugger;
  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // let state = grid[i][j].state;
      let state = grid[i][j].state;
      // Count live neighbors!
      // let neighbors = grid[i][j].countNeighbors();
      let neighbors = grid[i][j].countNeighbors();
      if (state == 0 && neighbors == 3) {
        next[i][j] = new Cell(i,j, resolution, States.ALIVE, 0);
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = new Cell(i,j, resolution, States.DEAD, 0);
      } else {
        let age = 0;
        if(grid[i][j].state == States.ALIVE) {
          age = grid[i][j].age + 1;
        }
        next[i][j] = new Cell(i,j, resolution, grid[i][j].state, age);
      }
    }
  }

  grid = next;
  // debugger;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
