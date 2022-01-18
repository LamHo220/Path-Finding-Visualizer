import { Dropdown } from "./Dropdown";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import { Box } from "@mui/system";
import { SelectMenu, SwitchButton } from "./Buttons";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import {
  DrawerSlider,
  DrawerTheme,
  DrawerTwoWaysButton,
  Setting,
} from "../Setting";

const Head = (props) => {
  const {
    timeRatio,
    algorithms,
    heuristics,
    allowDiagonal,
    patterns,
    setHeuristic,
    setAllowDiagonal,
    setAlgorithm,
    setPattern,
    setStart,
    setDarkMode,
    onSlice,
    setStartMaze,
    theme,
    setClearPath,
    isWeighted,
    setIsWeighted,
  } = props;

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event)=>{
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  useEffect(()=>{
    setOpen(false);
  }, [props])

  return (
    <>
      <AppBar position="static" open={open} color="default">
        <Toolbar>
          <Typography variant="h6" component="div">
            Path Finding Visualizer
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item>
              <Dropdown
                list={algorithms}
                func={setStart}
                setItem={setAlgorithm}
              ></Dropdown>
            </Grid>
            <Grid item>
              <Dropdown
                list={patterns}
                func={setStartMaze}
                setItem={setPattern}
              ></Dropdown>
            </Grid>
            <Grid item>
              <SelectMenu
                setItem={setHeuristic}
                labelName="Heuristic"
                list={heuristics[allowDiagonal]}
              ></SelectMenu>
            </Grid>
            <Grid item>
              <SwitchButton flag={allowDiagonal} setFlag={setAllowDiagonal} />
            </Grid>
            <Grid item>
              <Box component="span">
                <ButtonGroup
                  variant="text"
                  variant="outlined"
                  aria-label="text button group"
                >
                  <Button onClick={() => setClearPath(true)}>Clear Path</Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="setting"
            onClick={toggleDrawer(true)}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Setting open={open} toggleDrawer={toggleDrawer(false)}>
        <DrawerTheme
          toggleDrawer={toggleDrawer(false)}
          theme={theme}
          setDarkMode={setDarkMode}
        />
        <DrawerSlider
          handleOnChange={onSlice}
          name={"Animation Speed"}
          text={timeRatio}
        />
        <DrawerTwoWaysButton
          name="Weights"
          flag={isWeighted}
          setFlag={setIsWeighted}
          toggleDrawer={toggleDrawer(false)}
          flagName1="Not Weighted"
          flagName2="Randomly Weighted"
        />
      </Setting>
    </>
  );
};

export default Head;
