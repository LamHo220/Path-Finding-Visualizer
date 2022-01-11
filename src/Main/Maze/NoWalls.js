import { changeClassName, delay } from "../misc/misc";

const NoWalls = async (grid) => {
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      node.isWall = false;
      changeClassName(node);
    }
  }
  await delay(10);
};
export default NoWalls;
