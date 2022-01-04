import { rand, changeClassName, isHorizontalCut } from "../misc/misc";

var s = 0;

const RecursiveDivision = async (grid, maxRow, maxCol) => {
  doRecuresiveDivision(
    grid,
    1,
    1,
    maxRow - 2,
    maxCol - 2,
    isHorizontalCut(maxCol, maxRow)
  );
};
const doRecuresiveDivision = async (
  grid,
  fromRow,
  fromCol,
  toRow,
  toCol,
  isHorizontal
) => {
  if (isHorizontal) {
    if (toCol - fromCol < 2) {
      return new Promise((resolve, reject) => {
        resolve(grid);
      });
    }
    let wallRow = Math.floor(rand(fromRow + 1, toRow - 1) / 2) * 2;
    return new Promise((resolve, reject) => {
      resolve(
        horizontalCut(grid, fromCol, toCol, wallRow)
          .then((grid) => {
            return new Promise((resolve, reject) => {
              resolve(
                doRecuresiveDivision(
                  grid,
                  fromRow,
                  fromCol,
                  wallRow - 1,
                  toCol,
                  isHorizontalCut(toCol - fromCol, wallRow - 1 - fromRow)
                )
              );
            });
          })
          .then((grid) => {
            return new Promise((resolve, reject) => {
              resolve(
                doRecuresiveDivision(
                  grid,
                  wallRow + 1,
                  fromCol,
                  toRow,
                  toCol,
                  isHorizontalCut(toCol - fromCol, toRow - wallRow - 1)
                )
              );
            });
          })
      );
    });
  } else {
    if (toRow - fromRow < 2) {
      return new Promise((resolve, reject) => {
        resolve(grid);
      });
    }

    let wallCol = Math.floor(rand(fromCol + 1, toCol - 1) / 2) * 2;
    return new Promise((resolve, reject) => {
      resolve(
        verticalCut(grid, fromRow, toRow, wallCol)
          .then((grid) => {
            return new Promise((resolve, reject) => {
              resolve(
                doRecuresiveDivision(
                  grid,
                  fromRow,
                  fromCol,
                  toRow,
                  wallCol - 1,
                  isHorizontalCut(wallCol - 1 - fromCol, toRow - fromRow)
                )
              );
            });
          })
          .then((grid) => {
            return new Promise((resolve, reject) => {
              resolve(
                doRecuresiveDivision(
                  grid,
                  fromRow,
                  wallCol + 1,
                  toRow,
                  toCol,
                  isHorizontalCut(toCol - wallCol - 1, toRow - fromRow)
                )
              );
            });
          })
      );
    });
  }
};

const horizontalCut = async (grid, fromCol, toCol, wallRow) => {
  return new Promise((resolve, reject) => {
    let passCol = Math.floor(rand(fromCol, toCol) / 2) * 2 + 1;

    for (let i = fromCol; i <= toCol; ++i) {
      setTimeout(() => {
        if (i !== passCol) {
          let node = grid[wallRow][i];
          if (!(node.isStart || node.isEnd)) {
            changeClassName(node, "bg-gray-400");
            grid[wallRow][i].isWall = true;
          }
        }
      }, 50 * i);
    }
    setTimeout(() => {
      resolve(grid);
    }, 50 * (toCol - fromCol + 2)+10*s++);
  });
};

const verticalCut = async (grid, fromRow, toRow, wallCol) => {
  return new Promise((resolve, reject) => {
    let passRow = Math.floor(rand(fromRow, toRow) / 2) * 2 + 1;

    for (let i = fromRow; i <= toRow; ++i) {
      setTimeout(() => {
        if (i !== passRow) {
          let node = grid[i][wallCol];
          if (!(node.isStart || node.isEnd)) {
            changeClassName(node, "bg-gray-400");
            grid[i][wallCol].isWall = true;
          }
        }
      }, 50 * i);
    }
    setTimeout(() => {
      resolve(grid);
    }, 50 * (toRow - fromRow + 2)+10*s++);
  });
};

export default RecursiveDivision;
