import React from 'react';
import styles from "./SortSetting.module.scss"
import classNames from "classnames/bind";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core";

const cx = classNames.bind(styles);

const useStyles = makeStyles({
    radio: {
        width: "26px",
        height: "26px",
        padding: "0",
        margin: "0 8px 0 0",
        "&$checked": {
            color: "#FF7272"
        }
    },
    checked: {},
    buttonMargin: {
        margin: "0",
        "&:nth-child(1)": {
            "@media (min-width: 800px)": {
                marginBottom:"4px"
            },
            "@media (max-width: 799px)": {
                marginRight:"24px"
            },
            "@media (max-width: 402px)": {
                marginBottom:"4px"
            }
        }
    }
});

const SortSetting = ({input, onSetSort}) => {
    const classes = useStyles();

    return (
        <div className={cx("box")}>
            <div className={cx("label")}>잠재능력 타입</div>
            <RadioGroup
                row
                name="sort"
                value={input.sort}
                onChange={(e) => {
                    onSetSort(e.target.value);
                }}>
                <FormControlLabel
                    value="UP"
                    control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
                    classes={{root: classes.buttonMargin}}
                    label={<span className={cx("inputLabel")}>잠재능력</span>}
                />
                <FormControlLabel
                    value="DOWN"
                    control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
                    classes={{root: classes.buttonMargin}}
                    label={<span className={cx("inputLabel")}>에디셔널 잠재능력</span>}
                />
            </RadioGroup>
        </div>
    );
};

export default SortSetting;