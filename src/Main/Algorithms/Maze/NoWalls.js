import { changeClassName, delay } from "../../utilities/utilities";

const NoWalls = async (input) => {
  const { dark, grid } = input;
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      node.isWall = false;
      changeClassName(dark, node);
    }
  }
  await delay(10);
};
export default NoWalls;
