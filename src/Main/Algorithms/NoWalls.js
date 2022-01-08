import { changeClassName } from "../misc/misc";

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
};
export default NoWalls;
