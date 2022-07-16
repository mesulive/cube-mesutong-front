import React from 'react';
import {Checkbox, FormControlLabel, Stack} from "@mui/material";

const MiracleSetting = ({input, onSetMiracle}) => {
  return (
    input.type === 'TIER' ?
      <Stack
        sx={{
          width: '100%',
          marginTop: '16px'
        }}
        direction="row"
        justifyContent="center"
      >
        <FormControlLabel
          label="미라클 타임"
          control=
            {
              <Checkbox
                checked={input.miracle}
                onChange={(event) => {
                  onSetMiracle(event.target.checked)
                }}
                sx={{
                  color: 'black',
                  ...(input.miracle && {color: '#FF7272'}),
                  '&.Mui-checked': {
                    color: '#FF7272'
                  }
                }}
              />
            }
          sx={{
            '& .MuiTypography-root': {
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
              fontSize: '18px',
              ...(input.miracle && {color: '#FF7272'}),
              userSelect: 'none'
            }
          }}
        />
      </Stack> : null
  );
};

export default MiracleSetting;