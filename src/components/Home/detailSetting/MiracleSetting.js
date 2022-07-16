import React from "react";
import { Box, Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  checked: {
    color: "#FF7272 !important",
  },
  label: {
    fontFamily: "Noto Sans KR",
    fontWeight: 500,
    fontSize: "18px",
    userSelect: "none",
    color: (props) => (props.input.miracle ? "#FF7272" : "black"),
  },
});

const MiracleSetting = ({ input, onSetMiracle }) => {
  const classes = useStyles({ input, onSetMiracle });
  return input.type === "TIER" ? (
    <Box
      style={{
        width: "100%",
        marginTop: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControlLabel
        label="미라클 타임"
        control={
          <Checkbox
            checked={input.miracle}
            onChange={(event) => {
              onSetMiracle(event.target.checked);
            }}
            classes={{ root: classes.root, checked: classes.checked }}
          />
        }
        classes={{ label: classes.label }}
      />
    </Box>
  ) : null;
};

export default MiracleSetting;
