import React, { useState, useEffect } from "react";
import "./Main.css";
import Grid from "./Grid";
import Head from "./Head";
import Result from "./Result";
import { Paper, createTheme, ThemeProvider } from "@mui/material";

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
  const [startMaze, setStartMaze] = useState(false);
  const [timeRatio, setTimeRatio] = useState(3.1);
  const [darkMode, setDarkMode] = useState(true);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setHeuristic("Euclidean");
  }, [allowDiagonal]);

  const handleSlice = (event) => {
    let value = event.target.value;
    setTimeRatio(value);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div className={disable?"pointer-events-none":""}>
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
            setStartMaze={() => {
              setStartMaze(!start);
              setDisable(!disable);
            }}
            setHeuristic={setHeuristic}
            setAllowDiagonal={() => setAllowDiagonal(!allowDiagonal)}
            setAlgorithm={setAlgorithm}
            setPattern={(pattern) => {
              setPattern(pattern);
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
            darkMode={darkMode}
            start={start}
            setSteps={setSteps}
            setPathLength={setPathLength}
            allowDiagonal={allowDiagonal}
            pattern={pattern}
            algorithm={algorithm}
            heuristic={heuristic}
            heuristics={heuristics}
            timeRatio={timeRatio}
            setStart={() => {
              setStart(!start);
              setDisable(!disable);
            }}
            startMaze={startMaze}
            setStartMaze={() => {
              setStartMaze(false);
              setDisable(!disable);
            }}
            setDisable={() => setDisable(!disable)}
          />
        </div>

      </Paper>
    </ThemeProvider>
  );
};

export default Main;
