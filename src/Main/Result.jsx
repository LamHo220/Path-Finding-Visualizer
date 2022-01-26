import { Card, Grid } from "@mui/material";

/**
 * A component that display this result.
 * @param {Object} props The props of this component
 * @param {Number} props.steps The number of steps that got from the algorithm
 * @param {Number} props.pathLength The length of the path that got from the algorithm
 * @returns {JSX.Element} A Result banner.
 */
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
