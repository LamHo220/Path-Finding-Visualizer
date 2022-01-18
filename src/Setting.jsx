import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Slider,
  Toolbar,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";

export const DrawerTheme = (props) => {
  const { toggleDrawer, theme, setDarkMode } = props;
  return (
    <>
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        Theme
      </Typography>
      <Grid
        sx={{ pb: 2 }}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <Button
            onClick={(event) => {
              toggleDrawer(event, false);
              setDarkMode(false);
            }}
            variant="outlined"
            textAlign="center"
            sx={{
              height: 100,
              width: 100,
              "background-color": theme.palette.common.white,
              color: theme.palette.primary.main,
              "&:hover": {
                "background-color": theme.palette.common.white,
              },
            }}
          >
            Light
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={(event) => {
              toggleDrawer(event, false);
              setDarkMode(true);
            }}
            variant="outlined"
            textAlign="center"
            sx={{
              height: 100,
              width: 100,
              "background-color": theme.palette.common.black,
              color: theme.palette.primary.main,
              "&:hover": {
                "background-color": theme.palette.common.black,
              },
            }}
          >
            Dark
          </Button>
        </Grid>
      </Grid>
      <Divider></Divider>
    </>
  );
};

export const DrawerSlider = (props) => {
  const { name, text, handleOnChange } = props;
  return (
    <>
      <Box sx={{ width: "auto", p: 2 }} alignItems="center">
        <Typography
          textAlign="center"
          variant="h6"
          component="div"
          id="input-slider"
          gutterBottom
        >
          {name}
        </Typography>
        <Slider
          aria-label="Time Ratio"
          defaultValue={5}
          getAriaValueText={text}
          valueLabelDisplay="auto"
          onChange={handleOnChange}
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Divider></Divider>
    </>
  );
};

export const DrawerTwoWaysButton = (props) => {
  const { name, flag, setFlag, toggleDrawer, flagName1, flagName2 } = props;
  return (
    <>
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup sx={{ p: 1 }}>
        <Button
          disabled={!flag}
          onClick={(event) => {
            setFlag(!flag);
            toggleDrawer(event);
          }}
        >
          {flagName1}
        </Button>
        <Button
          disabled={flag}
          onClick={(event) => {
            setFlag(!flag);
            toggleDrawer(event);
          }}
        >
          {flagName2}
        </Button>
      </ButtonGroup>
      <Divider></Divider>
    </>
  );
};

export const Setting = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <Drawer
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
        alignContent: "center",
      }}
      variant="persistent"
      anchor="right"
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <Typography variant="h6" component="div">
          Settings
        </Typography>
      </Toolbar>
      <Divider></Divider>
      {props.children}
      {/*
       */}
    </Drawer>
  );
};
