import { Card, Grid } from "@mui/material";

/**
 * A component that display this result.
 * @param {Object} props The props of this component
 * @param {Number} props.numberOfSteps The number of steps that got from the algorithm
 * @param {Number} props.lengthOfPath The length of the path that got from the algorithm
 * @returns {JSX.Element} A Result banner.
 */
const Result = (props) => {
  return (
    <Card id="result">
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ py: 1 }}
      >
        <Grid item>
          <b>Number of Steps:</b>
          <span id="no-of-steps"> {props.numberOfSteps}</span>
        </Grid>
        <Grid item>
          <b>Length of Path:</b>
          <span id="path-length"> {props.lengthOfPath}</span>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Result;
