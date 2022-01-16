import {Card, Grid } from "@mui/material";

const Result = (props) => {
  return (
    <Card>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={1}>
          <b>Algorithm:</b> <br />
          {props.algorithm}
        </Grid>
        <Grid item xs={1}>
          <b>Heuristic:</b> <br />
          {props.heuristic}
        </Grid>
        <Grid item xs={1}>
          <b>Number of Steps:</b> <br />
          {props.steps}
        </Grid>
        <Grid item xs={1}>
          <b>Length of Path:</b> <br />
          {props.pathLength}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Result;
