import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Head from "../components/Head";
import Result from "../components/Result";
import { Paper, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Swal from "sweetalert2";
import { ColorModeContext, CurrentSelections } from "../context/Context";
import { useMemo } from "react";

/**
 * The main component of the GUI
 * @param {Object} props The props of the component
 * @returns The main component
 */
const Main = (props) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
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

  /**
   * Hanlder of when slice value change update the animation speed.
   * @param {Event} event the event.
   */
  const handleSlice = (event) => {
    let value = event.target.value;
    setAnimationSpeed(value);
  };

  const handleChangeHeuristic = (heuristic) => {
    setParameters({ ...parameters, heuristic });
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
  }, [theme.palette.theme]);
  const selections = {
    flags,
    parameters,
    results,
    setResults,
    setParameters,
    setFlags,
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <CurrentSelections.Provider value={selections}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Paper>
            <Head
              onSlice={handleSlice}
            />
            <Result
              numberOfSteps={results.numberOfSteps}
              lengthOfPath={results.lengthOfPath}
            />
            <Grid
              animationSpeed={animationSpeed}
            />
          </Paper>
        </ThemeProvider>
      </CurrentSelections.Provider>
    </ColorModeContext.Provider>
  );
};

export default Main;
