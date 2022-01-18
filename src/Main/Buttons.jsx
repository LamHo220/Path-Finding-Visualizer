import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  NativeSelect,
  Switch,
} from "@mui/material";

const SelectMenu = (props) => {
  const { labelName, list, setItem } = props;

  return (
    <Box component="span" sx={{ p: "1em" }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {labelName}
        </InputLabel>
        <NativeSelect
          defaultValue=""
          inputProps={{
            name: { labelName },
            id: "uncontrolled-native",
          }}
          onChange={(event) => setItem(event.target.value)}
        >
          {list.map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </NativeSelect>
      </FormControl>
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
