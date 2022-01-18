import { changeClassName, delay } from "../utilities/utilities";

const NoWalls = async (darkMode, grid) => {
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      node.isWall = false;
      changeClassName(darkMode, node);
    }
  }
  await delay(10);
};
export default NoWalls;
