import React, { useState, useEffect } from "react";
import "./Main.css";
import Grid from "./Grid";
import Head from "./Head";
import Result from "./Result";

const Main = (props) => {
  const heuristics = {
    false: ["Euclidean", "Manhattan"],
    true: ["Euclidean"],
  };
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
  }, [allowDiagonal]);

  useState(() => {
    console.log(123, start);
  }, [start]);

  return (
    <div>
      <Head
        heuristics={heuristics}
        allowDiagonal={allowDiagonal}
        algorithms={algorithms}
        patterns={patterns}
        start={start}
        setStart={() => setStart(!start)}
        setHeuristic={setHeuristic}
        setAllowDiagonal={() => setAllowDiagonal(!allowDiagonal)}
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
        duration={100}
        setStart={()=>setStart(!start)}
      />
    </div>
  );
};

export default Main;
