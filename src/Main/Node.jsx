import React, { useState, useEffect } from "react";

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
  } = props;

  const name = isStart
    ? "bg-emerald-400"
    : isEnd
    ? "bg-pink-400"
    : isWall
    ? "bg-gray-400"
    : "hover:bg-orange-300";

  return (
    <div
      id={id}
      className={`node ${name} border border-gray-200 m-0 p-0`}
      onMouseDown={(event) => onMouseDown(event, row, col)}
      onMouseEnter={(event) => onMouseEnter(event, row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    />
  );
};

export default Node;
