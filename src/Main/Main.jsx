import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Head from "./Head";
import Result from "./Result";
import { Paper, createTheme, ThemeProvider } from "@mui/material";
import Swal from "sweetalert2";

/**
 * The main component of the GUI
 * @param {Object} props The props of the component
 * @returns The main component
 */
const Main = (props) => {
  // initialize the state
  const [results, setResults] = useState({
    numberOfSteps: 0,
    lengthOfPath: 0,
  });

  const [parameters, setParameters] = useState({
    algorithm: "A*",
    heuristic: "Euclidean",
    pattern: "",
  });

  const [flags, setFlags] = useState({
    isDiagonal: false,
    isStart: false,
    isStartMaze: false,
    isDarkMode: true,
    isDisabled: false,
    isClearPath: false,
    isWeightedGrid: false,
    isBiDirection: false,
    isTutorial: true,
  });

  const [animationSpeed, setAnimationSpeed] = useState(5);

  const [settings, setSettings] = useState({});

  // the theme of the GUI.
  const theme = createTheme({
    palette: {
      mode: flags.isDarkMode ? "dark" : "light",
    },
  });

  /**
   * Hanlder of when slice value change update the animation speed.
   * @param {Event} event the event.
   */
  const handleSlice = (event) => {
    let value = event.target.value;
    setAnimationSpeed(value);
  };

  const handleChangeNumberOfSteps = (numberOfSteps) => {
    setResults({ ...results, numberOfSteps });
  };

  const handleChangeLengthOfPath = (lengthOfPath) => {
    setResults({ ...results, lengthOfPath });
  };
  
  const handleChangeAllResults = (numberOfSteps, lengthOfPath)=>{
    setResults({numberOfSteps, lengthOfPath});
  }

  const handleChangeAlgorithm = (algorithm) => {
    setParameters({ ...parameters, algorithm });
  };

  const handleChangeHeuristic = (heuristic) => {
    setParameters({ ...parameters, heuristic });
  };

  const handleChangePattern = (pattern) => {
    setParameters({ ...parameters, pattern });
  };

  const handleChangeIsDiagonal = (isDiagonal) => {
    setFlags({ ...flags, isDiagonal });
  };

  const handleChangeIsStart = (isStart) => {
    setFlags({ ...flags, isStart, isDisabled: isStart });
  };

  const handleChangeIsStartMaze = (isStartMaze) => {
    setFlags({ ...flags, isStartMaze, isDisabled: isStartMaze });
    setParameters({
      heuristic: parameters.heuristic,
      pattern: "",
      algorithm: parameters.algorithm,
    });
  };

  const handleChangeIsDarkMode = (isDarkMode) => {
    setFlags({ ...flags, isDarkMode });
  };

  const handleChangeIsClearPath = (isClearPath) => {
    setFlags({ ...flags, isClearPath });
  };

  const handleChangeIsWeightedGrid = (isWeightedGrid) => {
    setFlags({ ...flags, isWeightedGrid });
  };

  const handleChangeIsBiDirection = (isBiDirection) => {
    setFlags({ ...flags, isBiDirection });
  };

  const handleChangeIsTutorial = (isTutorial) => {
    setFlags({ ...flags, isTutorial });
  };

  // if allowDiagonal changes, set the heuristic to "Euclidean".
  useEffect(() => {
    handleChangeHeuristic("Euclidean");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isDiagonal]);

  // if is tutorial is true, show the tutorial.
  useEffect(() => {
    // if true, open the tutorial.
    if (flags.isTutorial) {
      Swal.mixin({
        title: "Tutorial",
        showDenyButton: true,
        confirmButtonText: "Next",
        denyButtonText: `Skip`,
        color: theme.palette.primary.main,
        background: theme.palette.background.default,
      })
        .fire({
          text: "Left Click the Nodes to Change It to Wall or a Road!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              text: "Left Click Start (blue) or End (red) Node to Move It!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  text: "Left Click Start button to start, Pause button to pause and Cleaning Services to Clean the Path!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      text: "In the menu, you can configurate the algorithm and grid",
                    });
                  } else {
                    handleChangeIsTutorial(false);
                  }
                });
              } else {
                handleChangeIsTutorial(false);
              }
            });
          } else {
            handleChangeIsTutorial(false);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isTutorial]);

  // if darkMode changes, change the background color of html.
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Head
          theme={theme}
          flags={flags}
          parameters={parameters}
          onIsTutorial={handleChangeIsTutorial}
          onChangeIsStart={handleChangeIsStart}
          onChangeIsStartMaze={handleChangeIsStartMaze}
          onChangeHeuristic={handleChangeHeuristic}
          onChangeIsDiagonal={() => handleChangeIsDiagonal(!flags.isDiagonal)}
          onChangeAlgorithm={handleChangeAlgorithm}
          onChangePattern={handleChangePattern}
          onChangeIsDarkMode={handleChangeIsDarkMode}
          onSlice={handleSlice}
          onChangeIsWeightedGrid={handleChangeIsWeightedGrid}
          onChangeIsClearPath={handleChangeIsClearPath}
          onChangeIsBiDirection={handleChangeIsBiDirection}
        />
        <Result
          numberOfSteps={results.numberOfSteps}
          lengthOfPath={results.lengthOfPath}
        />
        <Grid
          flags={flags}
          parameters={parameters}
          animationSpeed={animationSpeed}
          onChangeIsClearPath={handleChangeIsClearPath}
          onChangeNumberOfSteps={handleChangeNumberOfSteps}
          onChangeLengthOfPath={handleChangeLengthOfPath}
          onChangeIsStart={handleChangeIsStart}
          onChangeIsStartMaze={handleChangeIsStartMaze}
          onChangeAllResults={handleChangeAllResults}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default Main;
