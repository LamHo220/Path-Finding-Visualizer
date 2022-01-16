import { Dropdown } from "./Dropdown";
import {
  AppBar,
  FormControlLabel,
  FormGroup,
  Slider,
  Switch,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { SelectMenu } from "./Buttons";
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
  } = props;

  return (
    <AppBar position="static" color="default">
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
            <Box sx={{ width: "auto" }}>
              <Typography id="input-slider" gutterBottom>
                Animation Speed
              </Typography>
              <Slider
                aria-label="Time Ratio"
                defaultValue={5}
                getAriaValueText={timeRatio}
                valueLabelDisplay="auto"
                onChange={onSlice}
                step={1}
                marks
                min={1}
                max={10}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box component="span" >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allowDiagonal}
                      onChange={setAllowDiagonal}
                      defaultChecked
                    />
                  }
                  label="Allow Diagonal"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item>
            <Box component="span">
              <ButtonGroup
                variant="text"
                variant="outlined"
                aria-label="text button group"
              >
                <Button onClick={() => {}}>Clear Wall</Button>
                <Button onClick={() => {}}>Clear Path</Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Head;
