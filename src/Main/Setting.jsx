import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';

export const DrawerTwoWaysButton = (props) => {
  const { name, flag, setFlag, toggleDrawer, flagName1, flagName2 } = props;
  return (
    <Box sx={{alignItem:"center",alignContent:"center"}}>
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup alignItems="center" sx={{ p: 1, width:245 }}>
        <Button
          sx={{width:120}}
          disabled={flag}
          onClick={(event) => {
            setFlag(!flag);
            toggleDrawer(event);
          }}
        >
          {flagName2}
        </Button>
        <Button
          sx={{width:120}}
          disabled={!flag}
          onClick={(event) => {
            setFlag(!flag);
            toggleDrawer(event);
          }}
        >
          {flagName1}
        </Button>
      </ButtonGroup>
      <Divider></Divider>
    </Box>
  );
};

export const DrawerGroupButtons = (props) => {
  const { name, toggleDrawer, list, curr, setCurr } = props;
  return (
    <Box alignContent="center" textAlign="center" alignItems="center">
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup sx={{ p: 1, width: 250 }} orientation="vertical">
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
