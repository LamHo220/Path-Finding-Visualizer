import {
  rand,
  changeClassName,
  isHorizontalCut,
  delay,
} from "../../utilities/utilities";

/**
 * The time to be waited.
 */
var deltaTime;

/**
 * A function to generate a maze by Recursive Division.
 * @param {Object} input The input of the algorithm.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Number} input.maxRow The maximum row of the grid.
 * @param {Number} input.maxCol The maximum column of the grid.
 * @param {Number} input.timeRatio The thime to be waited.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 */
const RecursiveDivisionMaze = async (input) => {
  const { dark, grid, maxRow, maxCol, timeRatio } = input;
  deltaTime = timeRatio;
  // start recirsive division the grid.
  await doRecuresiveDivision(
    dark,
    grid,
    1,
    1,
    maxRow - 2,
    maxCol - 2,
    isHorizontalCut(maxCol, maxRow)
  );
};

/**
 * 
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {*Array<Array<Object>>} grid The grid to be used.
 * @param {Number} fromRow The start row of the sub-grid. 
 * @param {Number} fromCol The start column of the sub-grid.
 * @param {Number} toRow The end row of the sub-grid.
 * @param {Number} toCol The end column of the sub-grid.
 * @param {Boolean} isHorizontal Whether this sub-grid will be horizontally cut or not.
 * @returns {Promise} if the grid reach the base case, return a promise that resolve nothing.
 */
const doRecuresiveDivision = async (
  dark,
  grid,
  fromRow,
  fromCol,
  toRow,
  toCol,
  isHorizontal
) => {
  if (isHorizontal) {
    // base case
    if (toCol - fromCol < 2) {
      return;
    }

    // get the randomized column of wall.
    const wallRow = Math.floor(rand(fromRow + 1, toRow - 1) / 2) * 2;
    await horizontalCut(dark, grid, fromCol, toCol, wallRow);

    // cut this grid to two sub-grid.
    await doRecuresiveDivision(
      dark,
      grid,
      fromRow,
      fromCol,
      wallRow - 1,
      toCol,
      isHorizontalCut(toCol - fromCol, wallRow - 1 - fromRow)
    );
    await doRecuresiveDivision(
      dark,
      grid,
      wallRow + 1,
      fromCol,
      toRow,
      toCol,
      isHorizontalCut(toCol - fromCol, toRow - wallRow - 1)
    );
  } else {
    // base case
    if (toRow - fromRow < 2) {
      return;
    }

    // get the randomized column of wall.
    const wallCol = Math.floor(rand(fromCol + 1, toCol - 1) / 2) * 2;
    await verticalCut(dark, grid, fromRow, toRow, wallCol);
    
    // cut this grid to two sub-grid.
    await doRecuresiveDivision(
      dark,
      grid,
      fromRow,
      fromCol,
      toRow,
      wallCol - 1,
      isHorizontalCut(wallCol - 1 - fromCol, toRow - fromRow)
    );
    await doRecuresiveDivision(
      dark,
      grid,
      fromRow,
      wallCol + 1,
      toRow,
      toCol,
      isHorizontalCut(toCol - wallCol - 1, toRow - fromRow)
    );
  }
};

/**
 * A function to cut the sub-grid.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {*Array<Array<Object>>} grid The grid to be used.
 * @param {Number} fromCol The start column of the sub-grid.
 * @param {Number} toCol The end column of the sub-grid.
 * @param {Number} wallRow The wall row of the sub-grid.
 */
const horizontalCut = async (dark, grid, fromCol, toCol, wallRow) => {
  // a column that will not be the wall of this cut.
  const passCol = Math.floor(rand(fromCol, toCol) / 2) * 2 + 1;

  // cut the sub-grid.
  for (let i = fromCol; i <= toCol; ++i) {
    if (i !== passCol) {
      let node = grid[wallRow][i];
      if (!(node.isStart || node.isEnd)) {
        grid[wallRow][i].isWall = true;
        changeClassName(dark, node);
      }
    }
    await delay(deltaTime);
  }
};

/**
 * A function to cut the sub-grid.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {*Array<Array<Object>>} grid The grid to be used.
 * @param {Number} fromRow The start row of the sub-grid.
 * @param {Number} toRow The end row of the sub-grid.
 * @param {Number} wallCol The wall column of the sub-grid.
 */
const verticalCut = async (dark, grid, fromRow, toRow, wallCol) => {
  // a row that will not be the wall of this cut.
  const passRow = Math.floor(rand(fromRow, toRow) / 2) * 2 + 1;

  // cut the sub-grid.
  for (let i = fromRow; i <= toRow; ++i) {
    if (i !== passRow) {
      let node = grid[i][wallCol];
      if (!(node.isStart || node.isEnd)) {
        grid[i][wallCol].isWall = true;
        changeClassName(dark, node);
      }
    }
    await delay(deltaTime);
  }
};

export default RecursiveDivisionMaze;
