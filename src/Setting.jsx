import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";


export const DrawerTwoWaysButton = (props) => {
  const { name, flag, setFlag, toggleDrawer, flagName1, flagName2 } = props;
  return (
    <>
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup sx={{ p: 1, width:240 }}>
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

export const DrawerGroupButtons = (props) => {
  const { name, toggleDrawer, list, curr, setCurr } = props;
  return (
    <Box alignContent="center" textAlign="center" alignItems="center">
      <Typography sx={{ p: 1 }}  variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup sx={{ p: 1, width:240 }} orientation="vertical">
        {list.map((e) => {
          return (
            <Button
              disabled={curr === e}
              onClick={(event) => {
                toggleDrawer(event);
                setCurr(e);
              }}
            >
              {e}
            </Button>
          );
        })}
      </ButtonGroup>
      <Divider></Divider>
    </Box>
  );
};

export const Setting = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      {props.children}
    </Drawer>
  );
};
