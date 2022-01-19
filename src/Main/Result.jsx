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
        <Grid item xs={1}>
          <b>Number of Steps:</b> <br />
          <div id="no-of-steps">{props.steps}</div>
        </Grid>
        <Grid item xs={1}>
          <b>Length of Path:</b> <br />
          <div id="path-length">{props.pathLength}</div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Result;
