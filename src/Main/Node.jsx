import React from "react";

const Node = (props) => {
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
    isWeight,
  } = props;

  const name = isStart
    ? !dark
      ? "bg-blue-400"
      : "bg-blue-700"
    : isEnd
    ? !dark
      ? "bg-pink-400"
      : "bg-pink-700"
    : isWall
    ? (!dark ? "bg-gray-400" : "bg-gray-600") + " fade-in"
    : isWeight
    ? (!dark ? "bg-orange-400" : "bg-orange-600") + " fade-in"
    : "hover:bg-orange-300";

  return (
    <div
      id={id}
      className={`node ${name} border ${
        !dark ? "border-gray-200" : "border-gray-700"
      } m-0 p-0  hover:bg-orange-300`}
      onMouseDown={(event) => onMouseDown(event, row, col)}
      onMouseEnter={(event) => onMouseEnter(event, row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    />
  );
};

export default Node;
