import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slider,
  Box,
} from "@mui/material";
import { heuristics, algorithms, patterns } from "./Constants/Constants";
import { useState } from "react";
import { DrawerGroupButtons, DrawerTwoWaysButton, Setting } from "../Setting";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const Head = (props) => {
  const {
    disable,
    algorithm,
    allowDiagonal,
    darkMode,
    heuristic,
    isWeighted,
    pattern,
    onStart,
    onStartMaze,
    onHeuristic,
    onAllowDiagonal,
    onAlgorithm,
    onPattern,
    onDarkMode,
    onSlice,
    onIsWeighted,
    onClearPath
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
          <IconButton
            disabled={!disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="pause"
            onClick={() => window.alert("pused")}
          >
            <PauseIcon />
          </IconButton>
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
          <IconButton
            disabled={disable}
            size="large"
            edge="start"
            color="inherit"
            aria-label="tutorial"
            // onClick={() => tutorial()}
          >
            <QuestionMarkIcon />
          </IconButton>
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
      <Setting open={open} toggleDrawer={toggleDrawer(false)}>
        <DrawerTwoWaysButton
          name="Weights"
          flag={isWeighted}
          setFlag={onIsWeighted}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Weighted"
          flagName2="Randomly Weighted"
        />
        <DrawerGroupButtons
          name="Algorithm"
          toggleDrawer={toggleDrawer(false)}
          list={algorithms}
          curr={algorithm}
          setCurr={onAlgorithm}
        />
        <DrawerGroupButtons
          name="Heuristic"
          toggleDrawer={toggleDrawer(false)}
          list={heuristics[allowDiagonal]}
          curr={heuristic}
          setCurr={onHeuristic}
        />
        <DrawerGroupButtons
          name="Maze"
          toggleDrawer={(event)=>{toggleDrawer(false)(event);onStartMaze()}}
          list={patterns}
          curr={pattern}
          setCurr={onPattern}
        />
        <DrawerTwoWaysButton
          name="Allow Diagonal"
          flag={allowDiagonal}
          setFlag={onAllowDiagonal}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Allowed"
          flagName2="Allowed"
        />
      </Setting>
    </>
  );
};

export default Head;
