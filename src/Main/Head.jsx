import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slider,
  Box,
} from "@mui/material";
import { heuristics, algorithms, patterns, pause } from "./Constants/Constants";
import { useState } from "react";
import { DrawerGroupButtons, DrawerTwoWaysButton, Setting } from "./Setting";
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
 * @param {Object} props.theme The current theme.
 * @param {Boolean} props.disable Whether the elements should be disabled.
 * @param {String} props.algorithm The props of this component.
 * @param {Boolean} props.allowDiagonal Whether we allow diagonal movements.
 * @param {Boolean} props.darkMode Whether currently is darkmode.
 * @param {String} props.heuristic The props of this component.
 * @param {Boolean} props.isWeighted Whether the grid should be weighted.
 * @param {String} props.pattern The props of this component.
 * @param {Boolean} props.isBidirection Whether the algorithm should be bi-direction.
 * @param {Function} props.onIsTutorial The function to change is Tutorial.
 * @param {Function} props.onStart The function to change start.
 * @param {Function} props.onStartMaze The function to change startMaze.
 * @param {Function} props.onHeuristic The function to change heuristic.
 * @param {Function} props.onAllowDiagonal The function to change allowDiagonal.
 * @param {Function} props.onAlgorithm The function to change algorithm.
 * @param {Function} props.onPattern The function to change oattern.
 * @param {Function} props.onDarkMode The function to change darkmode or not.
 * @param {Function} props.onSlice The function to change the time ratio.
 * @param {Function} props.onIsWeighted The function to change isWeighted.
 * @param {Function} props.onClearPath The function to change clearPath.
 * @param {Function} props.onIsBidirection The function to change isBidirection.
 * @returns {JSX.Element} A component of Head, which is an App bar.
 */
const Head = (props) => {
  const {
    theme,
    disable,
    algorithm,
    allowDiagonal,
    darkMode,
    heuristic,
    isWeighted,
    pattern,
    isBidirection,
    onIsTutorial,
    onStart,
    onStartMaze,
    onHeuristic,
    onAllowDiagonal,
    onAlgorithm,
    onPattern,
    onDarkMode,
    onSlice,
    onIsWeighted,
    onClearPath,
    onIsBidirection,
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
          <Typography noWrap sx={{ flexGrow: 1 }} variant="h6" component="div">
            Path Finding Visualizer
          </Typography>

          {/* Start button */}
          <IconButton
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="start"
            onClick={() => onStart()}
          >
            <PlayArrowIcon />
          </IconButton>

          {/* Pause button */}
          <IconButton
            disabled={!disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="pause"
            onClick={() => {
              // the pause alert
              pause.setFlag(true);
              Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: true,
              }).fire({
                icon: 'info',
                title: 'Paused',
                confirmButtonText: 'Resume',
                color: theme.palette.primary.main,
                background: theme.palette.background.default,
              }).then(()=>{
                pause.setFlag(false);
              })
            }}
          >
            <PauseIcon />
          </IconButton>

          {/* Clean path button */}
          <IconButton
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="clearPath"
            onClick={() => onClearPath(true)}
          >
            <CleaningServicesIcon />
          </IconButton>

          {/* Slice to change time ratio */}
          <Box sx={{ width: 200, px: 4 }}>
            <Typography>Animation Speed</Typography>
            <Slider
              disabled={disable}
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
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="isDarkMode"
            onClick={() => onDarkMode(!darkMode)}
          >
            <DarkModeOutlinedIcon />
          </IconButton>

          {/* open the tutorial */}
          <IconButton
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="tutorial"
            onClick={()=>onIsTutorial(true)}
          >
            <QuestionMarkIcon />
          </IconButton>

          {/* Call the menu */}
          <IconButton
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="setting"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Drawer of setting */}
      <Setting open={open} toggleDrawer={toggleDrawer(false)}>
        {/* Set whether the grid should be weighted */}
        <DrawerTwoWaysButton
          name="Weights"
          flag={isWeighted}
          setFlag={onIsWeighted}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Weighted"
          flagName2="Randomly Weighted"
        />

        {/* Set the algorithm */}
        <DrawerGroupButtons
          name="Algorithm"
          toggleDrawer={toggleDrawer(false)}
          list={algorithms}
          curr={algorithm}
          setCurr={onAlgorithm}
        />

        {/* Set the heuristic */}
        <DrawerGroupButtons
          name="Heuristic"
          toggleDrawer={toggleDrawer(false)}
          list={heuristics[allowDiagonal]}
          curr={heuristic}
          setCurr={onHeuristic}
        />

        {/* Set the pattern */}
        <DrawerGroupButtons
          name="Maze"
          toggleDrawer={(event) => {
            toggleDrawer(false)(event);
            onStartMaze();
          }}
          list={patterns}
          curr={pattern}
          setCurr={onPattern}
        />

        {/* Set the allow diagonal */}
        <DrawerTwoWaysButton
          name="Allow Diagonal"
          flag={allowDiagonal}
          setFlag={onAllowDiagonal}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Allowed"
          flagName2="Allowed"
        />

        {/* Set the bi-direction */}
        <DrawerTwoWaysButton
          name="Bidirection?"
          flag={isBidirection}
          setFlag={onIsBidirection}
          toggleDrawer={toggleDrawer(false)}
          flagName1="No"
          flagName2="Yes"
        />
      </Setting>
    </>
  );
};

export default Head;
