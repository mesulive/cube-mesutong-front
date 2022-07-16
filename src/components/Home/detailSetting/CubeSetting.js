import React from 'react';
import styles from "./CubeSetting.module.scss"
import classNames from "classnames/bind";
import {makeStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';

const cx = classNames.bind(styles)

const useStyles = makeStyles({
    checkBox: {
        width: "26px",
        height: "26px",
        padding: "0",
        margin: "0 8px 0 0",
    },
    disabled: {opacity: "0.5"}
});

const CubeSetting = ({cubes, input, onToggleCube}) => {
    const classes = useStyles();
    return (
        <div className={cx("box")}>
            <div className={cx("label")}>큐브 선택 (복수 선택 가능)</div>
            <div className={cx("container")}>
                {
                    cubes.map((cube) => (
                        <div className={cx("cube")} key={`CS/${cube.code}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{color: cube.color}}
                                        checked={input.cubes.findIndex(code => code === cube.code) !== -1}
                                        classes={{root: classes.checkBox}}
                                        onChange={() => {
                                            onToggleCube(cube.code)
                                        }}
                                    />
                                }
                                classes={{disabled: classes.disabled}}
                                style={{margin: 0}}
                                label={
                                    <span
                                        className={cx("inputLabel")}
                                        style={{color: cube.color}}
                                    >
                                        {cube.name}
                                    </span>
                                }
                                disabled={
                                    (cube.code === "addi" && input.sort === "UP") ||
                                    (cube.code !== "addi" && input.sort === "DOWN") ||
                                    (cube.code === "strange" && (
                                        input.tier === "유니크" ||
                                        input.tier === "레전드리"
                                    )) ||
                                    (cube.code === "master" && input.tier === "레전드리") ||
                                    (input.type === "TIER" && (
                                        (input.tier === "에픽" && cube.code === "strange") ||
                                        (input.tier === "유니크" && cube.code === "master")
                                    ))}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CubeSetting;