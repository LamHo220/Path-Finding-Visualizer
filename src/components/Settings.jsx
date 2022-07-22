import { useContext, useState } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

import { ColorModeContext, CurrentSelections } from "../context/Context";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Divider, Slider, Typography } from "@mui/material";

const Settings = ({ onSlice }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const selections = useContext(CurrentSelections);
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="setting"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="px-4 py-1 text-center">
          <Typography>Animation Speed</Typography>
          <Slider
            disabled={selections.flags.isDisabled}
            aria-label="Speed"
            defaultValue={5}
            valueLabelDisplay="off"
            step={1}
            min={1}
            max={10}
            onChange={onSlice}
          />
        </div>
        <Divider />
        <MenuItem
          onClick={() =>
            selections.setFlags((prev) => {
              return { ...prev, isClearPath: true };
            })
          }
          className="space-x-4"
        >
          <CleaningServicesIcon />
          <span>Clean the path</span>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() =>
            selections.setFlags((prev) => {
              return { ...prev, isTutorial: true };
            })
          }
          className="space-x-4"
        >
          <QuestionMarkIcon />
          <span>Tutorial</span>
        </MenuItem>
        <Divider />
        <MenuItem onClick={colorMode.toggleColorMode} className="space-x-4">
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon fontSize="small" />
          ) : (
            <LightModeIcon fontSize="small" />
          )}
          <span>Theme Switching</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Settings;
