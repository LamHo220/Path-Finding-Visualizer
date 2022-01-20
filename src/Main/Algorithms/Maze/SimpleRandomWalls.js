import { changeClassName } from "../../utilities/utilities";
const SimpleRandomWalls = (input) => {
  const { dark, grid, density } = input;
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      if (Math.random() < density) {
        node.isWall = true;
        changeClassName(dark, node);
      }
    }
  }
};
export default SimpleRandomWalls;
