import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

/**
 * A component of a group of buttons for the drawer.
 * Used for two way (true and false) selection.
 * @param {Object} props The props of this component.
 * @param {String} props.name The name of this group of button.
 * @param {Boolean} props.flag The flag for this button.
 * @param {Function} props.setFlag The function to change the flag.
 * @param {Function} props.toggleDrawer The function to toggle the drawer.
 * @param {String} props.flagName1 The name of this button, if false, then disable.
 * @param {String} props.flagName2 The name of this button, if true, then disable.
 * @returns {JSX.Element} A group of buttons for the drawer.
 */
export const DrawerTwoWaysButton = (props) => {
  const { name, flag, setFlag, toggleDrawer, flagName1, flagName2 } = props;
  return (
    <Box sx={{ alignItem: "center", alignContent: "center" }}>
      <Typography sx={{ p: 1 }} variant="h6" component="div" textAlign="center">
        {name}
      </Typography>
      <ButtonGroup alignItems="center" sx={{ p: 1, width: 245 }}>
        <Button
          color="success"
          sx={{ width: 120 }}
          disabled={flag}
          onClick={(event) => {
            setFlag(!flag);
            toggleDrawer(event);
          }}
        >
          {flagName2}
        </Button>
        <Button
          color="error"
          sx={{ width: 120 }}
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

/**
 * A component of groups of buttons for selecting a item in a list.
 * @param {Object} props The props of this component.
 * @param {String} props.name The name of this group of buttons
 * @param {Function} props.toggleDrawer The function to toggle the drawer.
 * @param {Array<String>} props.list The the list to be used.
 * @param {String} props.curr The current selected item. 
 * @param {Function} props.setCurr The function to set the current item.
 * @returns 
 */
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

/**
 * 
 * @param {Object} props The props of this component.
 * @param {Boolean} props.open Whether the drawer should be opened.
 * @param {Function} props.toggleDrawer A function to toggle the drawer.
 * @returns 
 */
export const MenuDrawer = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      {props.children}
    </Drawer>
  );
};
