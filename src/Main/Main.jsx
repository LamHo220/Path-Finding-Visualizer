import React, { useState, useEffect } from "react";
import "./Main.css";
import Grid from "./Grid";
import Head from "./Head";
import Result from "./Result";

const Main = (props) => {
  const heuristics = {
    false: ["Euclidean", "Manhattan", "Octile", "Chebyshev"],
    true: ["Euclidean", "Octile", "Chebyshev"],
  };
  const algorithms = ["A*", "Dijkstra"];
  const patterns = [
    "No Walls",
    "Simple Random Walls",
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
  const [pattern, setPattern] = useState("");
  const [start, setStart] = useState(false);
  const [timeRatio, setTimeRatio] = useState(3.1);
  const [darkMode, setDarkMode] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setHeuristic("Euclidean");
  }, [allowDiagonal]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].className =
      (darkMode ? "dark" : "") + " dark:bg-gray-900";
  }, [darkMode]);

  useEffect(() => {
    console.log(123);
  }, [disable]);

  const handleSlice = (event) => {
    let value = event.target.value;
    setTimeRatio(value);
  };

  return (
    <div
      className={(disable ? "pointer-events-none " : " ") + "dark:bg-gray-900"}
    >
      <Head
        heuristics={heuristics}
        allowDiagonal={allowDiagonal}
        algorithms={algorithms}
        patterns={patterns}
        start={start}
        darkMode={darkMode}
        setStart={() => {
          setStart(!start);
          setDisable(!disable);
        }}
        setHeuristic={setHeuristic}
        setAllowDiagonal={() => setAllowDiagonal(!allowDiagonal)}
        setAlgorithm={setAlgorithm}
        setPattern={(pattern) => {
          setPattern(pattern);
          setDisable(!disable);
        }}
        setDarkMode={() => setDarkMode(!darkMode)}
        onSlice={handleSlice}
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
        timeRatio={timeRatio}
        setPattern={(pattern) => {
          setPattern(pattern);
          setDisable(!disable);
        }}
        setStart={() => {
          setStart(!start);
          setDisable(!disable);
        }}
        setDisable={() => setDisable(!disable)}
      />
    </div>
  );
};

export default Main;
