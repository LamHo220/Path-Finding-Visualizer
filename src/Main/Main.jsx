import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Head from "./Head";
import Result from "./Result";
import { Paper, createTheme, ThemeProvider } from "@mui/material";

const Main = (props) => {
  const [steps, setSteps] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [heuristic, setHeuristic] = useState("Euclidean");
  const [algorithm, setAlgorithm] = useState("A*");
  const [pattern, setPattern] = useState("");
  const [start, setStart] = useState(false);
  const [startMaze, setStartMaze] = useState(false);
  const [timeRatio, setTimeRatio] = useState(5);
  const [darkMode, setDarkMode] = useState(true);
  const [disable, setDisable] = useState(false);
  const [clearPath, setClearPath] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [isBidirection, setIsBidirection] = useState(true);

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
        <Head
          disable={disable}
          algorithm={algorithm}
          allowDiagonal={allowDiagonal}
          darkMode={darkMode}
          heuristic={heuristic}
          isWeighted={isWeighted}
          pattern={pattern}
          isBidirection={isBidirection}
          onStart={() => {
            setStart(!start);
            setDisable(!disable);
          }}
          onStartMaze={() => {
            setStartMaze(!startMaze);
            setDisable(!disable);
          }}
          onHeuristic={setHeuristic}
          onAllowDiagonal={() => setAllowDiagonal(!allowDiagonal)}
          onAlgorithm={setAlgorithm}
          onPattern={setPattern}
          onDarkMode={setDarkMode}
          onSlice={handleSlice}
          onIsWeighted={setIsWeighted}
          onClearPath={setClearPath}
          onIsBidirection={setIsBidirection}
        />
        <Result steps={steps} pathLength={pathLength} />
        <div className={disable ? "pointer-events-none" : ""}>
          <Grid
            allowDiagonal={allowDiagonal}
            heuristic={heuristic}
            algorithm={algorithm}
            timeRatio={timeRatio}
            start={start}
            startMaze={startMaze}
            pattern={pattern}
            darkMode={darkMode}
            clear={clearPath}
            isWeighted={isWeighted}
            isBidirection={isBidirection}
            onClearPath={setClearPath}
            onSteps={setSteps}
            onPathLength={setPathLength}
            onStart={() => {
              setStart(!start);
              setDisable(!disable);
            }}
            onStartMaze={() => {
              setStartMaze(false);
              setDisable(!disable);
            }}
            onDisable={() => setDisable(!disable)}
          />
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default Main;
