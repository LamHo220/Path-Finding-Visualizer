import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slider,
  Box,
  useTheme,
} from "@mui/material";
import {
  heuristics,
  algorithms,
  patterns,
  pause,
} from "../lib/Constants/Constants";
import { useState } from "react";
import {
  DrawerGroupButtons,
  DrawerTwoWaysButton,
  MenuDrawer,
} from "./MenuDrawer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2";
import { ColorModeContext, CurrentSelections } from "../context/Context";
import { useContext } from "react";
import Settings from "./Settings";

/**
 * A component of Head, which is an App bar.
 * @param {Object} props The props of this component.
 * @param {Object} selections.flags The selections.flags in the main
 * @param {Object} parameters The The parameters for the algorithms.
 * @param {Function} props.onIsTutorial The function to change is Tutorial.
 * @param {Function} props.onChangeIsStart The function to change start.
 * @param {Function} props.onChangeIsStartMaze The function to change startMaze.
 * @param {Function} props.onChangeHeuristic The function to change heuristic.
 * @param {Function} props.onChangeIsDiagonal The function to change allowDiagonal.
 * @param {Function} props.onChangeAlgorithm The function to change algorithm.
 * @param {Function} props.onChangePattern The function to change oattern.
 * @param {Function} props.onSlice The function to change the time ratio.
 * @param {Function} props.onChangeIsWeightedGrid The function to change isWeighted.
 * @param {Function} props.onChangeIsClearPath The function to change clearPath.
 * @param {Function} props.onChangeIsBiDirection The function to change isBidirection.
 * @returns {JSX.Element} A component of Head, which is an App bar.
 */
const Head = (props) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const selections = useContext(CurrentSelections);

  const {
    onSlice,
  } = props;

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <AppBar position="static" open={open}>
        <Toolbar>
          {/* Call the menu */}
          <IconButton
            disabled={selections.flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="setting"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap sx={{ flexGrow: 1 }} variant="h6" component="div">
            Path Finding Visualizer
          </Typography>

          {/* Start button */}
          <IconButton
            disabled={selections.flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="start"
            onClick={() =>
              selections.setFlags((prev) => {
                return { ...prev, isStart: true, isDisabled: true };
              })
            }
          >
            <PlayArrowIcon />
          </IconButton>

          {/* Pause button */}
          <IconButton
            disabled={!selections.flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="pause"
            onClick={() => {
              // the pause alert
              pause.setFlag(true);
              Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: true,
              })
                .fire({
                  icon: "info",
                  title: "Paused",
                  confirmButtonText: "Resume",
                  color: theme.palette.primary.main,
                  background: theme.palette.background.default,
                })
                .then(() => {
                  pause.setFlag(false);
                });
            }}
          >
            <PauseIcon />
          </IconButton>

          <Settings onSlice={onSlice}/>
        </Toolbar>
      </AppBar>
      {/* Drawer of setting */}
      <MenuDrawer open={open} toggleDrawer={toggleDrawer(false)}>
        {/* Set whether the grid should be weighted */}
        <DrawerTwoWaysButton
          name="Weights"
          flag={selections.flags.isWeightedGrid}
          setFlag={(f) =>
            selections.setFlags((prev) => {
              return { ...prev, isWeightedGrid: f };
            })
          }
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Weighted"
          flagName2="Randomly Weighted"
        />

        {/* Set the algorithm */}
        <DrawerGroupButtons
          name="Algorithm"
          toggleDrawer={toggleDrawer(false)}
          list={algorithms}
          curr={selections.parameters.algorithm}
          setCurr={(algo) =>
            selections.setParameters((prev) => {
              return { ...prev, algorithm: algo };
            })
          }
        />

        {/* Set the heuristic */}
        <DrawerGroupButtons
          name="Heuristic"
          toggleDrawer={toggleDrawer(false)}
          list={heuristics[selections.flags.isDiagonal]}
          curr={selections.parameters.heuristic}
          setCurr={(heur) =>
            selections.setParameters((prev) => {
              return { ...prev, heuristic: heur };
            })
          }
        />

        {/* Set the pattern */}
        <DrawerGroupButtons
          name="Maze"
          toggleDrawer={(event) => {
            toggleDrawer(false)(event);
            selections.setFlags((prev) => {
              return {
                ...prev,
                isStartMaze: true,
                isDisabled: true,
              };
            });
            selections.setParameters({
              heuristic: selections.parameters.heuristic,
              pattern: "",
              algorithm: selections.parameters.algorithm,
            });
          }}
          list={patterns}
          curr={selections.parameters.pattern}
          setCurr={(pattern) =>
            selections.setParameters((prev) => {
              return { ...prev, pattern: pattern };
            })
          }
        />

        {/* Set the allow diagonal */}
        <DrawerTwoWaysButton
          name="Allow Diagonal"
          flag={selections.flags.isDiagonal}
          setFlag={(f)=>selections.setFlags(prev=>{
            return {...prev, isDiagonal:f}
          })}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Allowed"
          flagName2="Allowed"
        />

        {/* Set the bi-direction */}
        <DrawerTwoWaysButton
          name="Bidirection?"
          flag={selections.flags.isBiDirection}
          setFlag={(f)=>selections.setFlags(prev=>{
            return {...prev, isBiDirection:f}
          })}
          toggleDrawer={toggleDrawer(false)}
          flagName1="No"
          flagName2="Yes"
        />
      </MenuDrawer>
    </>
  );
};

export default Head;
