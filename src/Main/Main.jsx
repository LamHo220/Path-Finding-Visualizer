import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./Main.css";
import Grid from "./Grid";

const Button = (props) => {
  const [open, setOpen] = useState(false);
  const { allowDiagonal, setAllowDiagonal, start, setStart } = props;
  let name = "text-gray-400";
  if (allowDiagonal != undefined) {
    name = allowDiagonal
      ? "bg-green-200 text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-300"
      : "bg-rose-200 text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-300";
  }
  else if (start != undefined){
    name = "bg-sky-200 text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-300"
  }
  return (
    <div className="relative">
      <button
        type="button"
        class={`${name} px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium `}
        aria-expanded="false"
        onClick={() => {
          if (allowDiagonal != undefined) {
            setAllowDiagonal(!allowDiagonal);
          } else if (start != undefined) {
            setStart(!start);
          } else {
            setOpen(!open);
          }
        }}
      >
        <span>
          {props.name} <FontAwesomeIcon icon={props.icon} />
        </span>
      </button>
      {open && props.children}
    </div>
  );
};

const Head = (props) => {
  const {
    start,
    algorithms,
    heuristics,
    allowDiagonal,
    patterns,
    setHeuristic,
    setAllowDiagonal,
    setAlgorithm,
    setPattern,
    setStart,
  } = props;
  return (
    <div className="relative bg-white z-10">
      <div className="flex md:justify-between items-center border-b-2 border-gray-100 py-2 sm:justify-start md:space-x-10">
        <div className="flex justify-start">
          <a href="#">icon</a>
        </div>
        <nav className="hidden md:flex space-x-10">
          <Button name="Algorithm" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {algorithms.map((algorithm) => {
                    return (
                      <a
                        onClick={() => setAlgorithm(algorithm)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {algorithm}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Button>
          <Button name="Heuristic" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {heuristics[allowDiagonal].map((heuristic) => {
                    return (
                      <a
                        onClick={() => setHeuristic(heuristic)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {heuristic}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Button>
          <Button
            name="Start"
            icon=""
            setStart={setStart}
            start={start}
          ></Button>
          <Button name="Pattern" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {patterns.map((pattern) => {
                    return (
                      <a
                        onClick={() => setPattern(pattern)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {pattern}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Button>
          <Button
            name="Diagonal is allowed"
            icon=""
            setAllowDiagonal={setAllowDiagonal}
            allowDiagonal={allowDiagonal}
          ></Button>
        </nav>
        <div className="flex justify-start">
          <a href="#">setting</a>
        </div>
      </div>
    </div>
  );
};

const Result = (props) => {
  return (
    <div className="flex md:justify-around items-center">
      <div className="font-medium text-gray-700">
        Algorithm: {props.algorithm}
      </div>
      <div className="font-medium text-gray-700">
        Heuristic: {props.heuristic}
      </div>
      <div className="font-noraml text-gray-700">
        Number of Steps: {props.steps}
      </div>
      <div className="font-noraml text-gray-700">
        Length of Path: {props.pathLength}
      </div>
    </div>
  );
};

const Main = (props) => {
  const heuristics = { false: ["Euclidean", "Manhattan"], true: ["Euclidean"] };
  const algorithms = ["A*", "Dijkstra"];
  const patterns = [
    "No Walls",
    "Simple Random Walls",
    "Random Walls",
    "Recursive Division",
    "Prim's Algorithm",
    "Kruskal's Algorithm",
    "Recursive Backtracking",
  ];

  const [steps, setSteps] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [heuristic, setHeuristic] = useState("Euclidean");
  const [algorithm, setAlgorithm] = useState("A*");
  const [pattern, setPattern] = useState("No Walls");
  const [start, setStart] = useState(false);

  useEffect(() => {
    setHeuristic("Euclidean");
  }, allowDiagonal);

  return (
    <>
      <Head
        heuristics={heuristics}
        allowDiagonal={allowDiagonal}
        algorithms={algorithms}
        patterns={patterns}
        start={start}
        setStart={setStart}
        setHeuristic={setHeuristic}
        setAllowDiagonal={setAllowDiagonal}
        setAlgorithm={setAlgorithm}
        setPattern={setPattern}
      />
      <Result
        algorithm={algorithm}
        heuristic={heuristic}
        steps={steps}
        pathLength={pathLength}
      />
      <Grid
        start={start}
        setSteps={setSteps}
        setPathLength={setPathLength}
        allowDiagonal={allowDiagonal}
        pattern={pattern}
        algorithm={algorithm}
        heuristic={heuristic}
        heuristics={heuristics}
        duration={50}
      />
    </>
  );
};

export default Main;
