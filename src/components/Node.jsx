import { useTheme } from "@emotion/react";
import React from "react";

/**
 * A component of node.
 * @param {Object} props The props of this component.
 * @param {String} props.id The id of the node.
 * @param {Boolean} props.isStart Whether this node is a start node or not
 * @param {Boolean} props.isEnd Whether this node is a end node or not
 * @param {Boolean} props.isWall Whether this node is a wall node or not
 * @param {Number} props.row The row of this node.
 * @param {Number} props.col The column of this node.
 * @param {Function} props.onMouseDown The mouse down event.
 * @param {Function} props.onMouseEnter The mouse enter event.
 * @param {Function} props.onMouseUp The mouse up event.
 * @param {Boolean} props.dark Whether currently is dark mode or node.
 * @returns {JSX.Element} A node in a grid.
 */
const Node = (props) => {
  const theme = useTheme();
  const {
    id,
    isStart,
    isEnd,
    isWall,
    row,
    col,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    dark,
  } = props;

  const name = isStart
    ? !theme.palette.mode==="dark"
      ? "bg-blue-400"
      : "bg-blue-700"
    : isEnd
    ? !theme.palette.mode==="dark"
      ? "bg-pink-400"
      : "bg-pink-700"
    : isWall
    ? (!theme.palette.mode==="dark" ? "bg-gray-400" : "bg-gray-600") + " fade-in"
    : "hover:bg-orange-300";

  return (
    <div
      id={id}
      className={`node ${name} border ${
        !theme.palette.mode==="dark" ? "border-gray-200" : "border-gray-700"
      } m-0 p-0 hover:bg-orange-300`}
      onMouseDown={(event) => onMouseDown(event, row, col)}
      onMouseOverCapture={(event) => onMouseEnter(event, row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    />
  );
};

export default Node;
