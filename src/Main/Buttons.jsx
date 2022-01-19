import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Menu,
  Switch,
  Typography,
  MenuItem
} from "@mui/material";
import { useState } from "react";

const SelectMenu = (props) => {
  const { labelName, list, setItem, item } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="span" >
      <Typography >
      {labelName}
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        {item}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {list.map((e)=>{
          return <MenuItem onClick={()=>{handleClose();setItem(e)}}>{e}</MenuItem>
        })}
      </Menu>
    </Box>
  );
};

const SwitchButton = (props) => {
  const { flag, setFlag } = props;

  return (
    <Box component="span">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={flag}
              onChange={() => setFlag(false)}
              defaultChecked
            />
          }
          label="Allow Diagonal"
        />
      </FormGroup>
    </Box>
  );
};

export { SelectMenu, SwitchButton };
