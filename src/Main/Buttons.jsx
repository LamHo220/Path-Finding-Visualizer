import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";

const SelectMenu = (props) => {

  const {labelName, list, setItem} = props;

  return (
    <Box component="span" sx={{ p: '1em' }}>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {labelName}
        </InputLabel>
        <NativeSelect
          defaultValue=""
          inputProps={{
            name: {labelName},
            id: "uncontrolled-native",
          }}
          onChange={(event)=>setItem(event.target.value)}
        >
          {list.map(e=>{
            return <option value={e}>{e}</option>
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export {SelectMenu};
