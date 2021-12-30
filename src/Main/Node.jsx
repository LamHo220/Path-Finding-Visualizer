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
    ? "bg-sky-300"
    : isEnd
    ? "bg-pink-300"
    : isWall
    ? "bg-gray-400"
    : "transition ease-in-out delay-150 hover:scale-125 duration-300 hover:bg-orange-300";

  return (
    <div
      id={id}
      className={`node ${name} border border-gray-200 m-0 p-0`}
      onMouseDown={(event) => onMouseDown(event, row, col)}
      onMouseEnter={(event) => onMouseEnter(event, row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
};

export default Node;
