import { Card, Grid } from "@mui/material";

const Result = (props) => {
  return (
    <Card>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ py: 1 }}
      >
        <Grid item>
          <b>Number of Steps:</b>
          <div id="no-of-steps">{props.steps}</div>
        </Grid>
        <Grid item>
          <b>Length of Path:</b>
          <div id="path-length">{props.pathLength}</div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Result;
