import {changeClassName} from "../misc/misc";
const SimpleRandomWalls = (grid, density) => {
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      if (Math.random() < density) {
        node.isWall = true;
        changeClassName(node, "bg-gray-400");
      }
    }
  }
}
export default SimpleRandomWalls;