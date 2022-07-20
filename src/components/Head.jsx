import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slider,
  Box,
} from "@mui/material";
import { heuristics, algorithms, patterns, pause } from "../lib/Constants/Constants";
import { useState } from "react";
import {
  DrawerGroupButtons,
  DrawerTwoWaysButton,
  MenuDrawer,
} from "./MenuDrawer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Swal from "sweetalert2";

/**
 * A component of Head, which is an App bar.
 * @param {Object} props The props of this component.
 * @param {Object} flags The flags in the main
 * @param {Object} parameters The The parameters for the algorithms.
 * @param {Function} props.onIsTutorial The function to change is Tutorial.
 * @param {Function} props.onChangeIsStart The function to change start.
 * @param {Function} props.onChangeIsStartMaze The function to change startMaze.
 * @param {Function} props.onChangeHeuristic The function to change heuristic.
 * @param {Function} props.onChangeIsDiagonal The function to change allowDiagonal.
 * @param {Function} props.onChangeAlgorithm The function to change algorithm.
 * @param {Function} props.onChangePattern The function to change oattern.
 * @param {Function} props.onChangeIsDarkMode The function to change darkmode or not.
 * @param {Function} props.onSlice The function to change the time ratio.
 * @param {Function} props.onChangeIsWeightedGrid The function to change isWeighted.
 * @param {Function} props.onChangeIsClearPath The function to change clearPath.
 * @param {Function} props.onChangeIsBiDirection The function to change isBidirection.
 * @returns {JSX.Element} A component of Head, which is an App bar.
 */
const Head = (props) => {
  const {
    theme,
    flags,
    parameters,
    onIsTutorial,
    onChangeIsStart,
    onChangeIsStartMaze,
    onChangeHeuristic,
    onChangeIsDiagonal,
    onChangeAlgorithm,
    onChangePattern,
    onChangeIsDarkMode,
    onSlice,
    onChangeIsWeightedGrid,
    onChangeIsClearPath,
    onChangeIsBiDirection,
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
      <AppBar position="static" open={open} color="default">
        <Toolbar>
          {/* Call the menu */}
          <IconButton
            disabled={flags.isDisabled}
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
            disabled={flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="start"
            onClick={() => onChangeIsStart(true)}
          >
            <PlayArrowIcon />
          </IconButton>

          {/* Pause button */}
          <IconButton
            disabled={!flags.isDisabled}
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

          {/* Clean path button */}
          <IconButton
            disabled={flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="clearPath"
            onClick={() => onChangeIsClearPath(true)}
          >
            <CleaningServicesIcon />
          </IconButton>

          {/* Slice to change time ratio */}
          <Box sx={{ width: 200, px: 4 }}>
            <Typography>Animation Speed</Typography>
            <Slider
              disabled={flags.isDisabled}
              aria-label="Speed"
              defaultValue={5}
              valueLabelDisplay="off"
              step={1}
              min={1}
              max={10}
              onChange={onSlice}
            />
          </Box>

          {/* Set dark mode or not */}
          <IconButton
            disabled={flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="isDarkMode"
            onClick={() => onChangeIsDarkMode(!flags.isDarkMode)}
          >
            <DarkModeOutlinedIcon />
          </IconButton>

          {/* open the tutorial */}
          <IconButton
            disabled={flags.isDisabled}
            size="large"
            edge="start"
            color="inherit"
            aria-label="tutorial"
            onClick={() => onIsTutorial(true)}
          >
            <QuestionMarkIcon />
          </IconButton>

          <IconButton></IconButton>
        </Toolbar>
      </AppBar>
      {/* Drawer of setting */}
      <MenuDrawer open={open} toggleDrawer={toggleDrawer(false)}>
        {/* Set whether the grid should be weighted */}
        <DrawerTwoWaysButton
          name="Weights"
          flag={flags.onChangeIsWeightedGrid}
          setFlag={onChangeIsWeightedGrid}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Weighted"
          flagName2="Randomly Weighted"
        />

        {/* Set the algorithm */}
        <DrawerGroupButtons
          name="Algorithm"
          toggleDrawer={toggleDrawer(false)}
          list={algorithms}
          curr={parameters.algorithm}
          setCurr={onChangeAlgorithm}
        />

        {/* Set the heuristic */}
        <DrawerGroupButtons
          name="Heuristic"
          toggleDrawer={toggleDrawer(false)}
          list={heuristics[flags.isDiagonal]}
          curr={parameters.heuristic}
          setCurr={onChangeHeuristic}
        />

        {/* Set the pattern */}
        <DrawerGroupButtons
          name="Maze"
          toggleDrawer={(event) => {
            toggleDrawer(false)(event);
            onChangeIsStartMaze(true);
          }}
          list={patterns}
          curr={parameters.pattern}
          setCurr={onChangePattern}
        />

        {/* Set the allow diagonal */}
        <DrawerTwoWaysButton
          name="Allow Diagonal"
          flag={flags.isDiagonal}
          setFlag={onChangeIsDiagonal}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Allowed"
          flagName2="Allowed"
        />

        {/* Set the bi-direction */}
        <DrawerTwoWaysButton
          name="Bidirection?"
          flag={flags.isBiDirection}
          setFlag={onChangeIsBiDirection}
          toggleDrawer={toggleDrawer(false)}
          flagName1="No"
          flagName2="Yes"
        />
      </MenuDrawer>
    </>
  );
};

export default Head;
