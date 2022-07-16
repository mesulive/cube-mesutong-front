import React from 'react';
import styles from "./LevelSetting.module.scss"
import classNames from "classnames/bind";
import {delNonNumeric} from "../../../utils/util";

const cx = classNames.bind(styles);

const LevelSetting = ({input, onSetLevel}) => {
    return (
        <div className={cx("verticallyCenter")} style={{height: "34px"}}>
            <span className={cx("label")}>장비 레벨</span>
            <span className={cx("level")}>Lv.</span>
            <input
                className={cx("input")}
                maxLength="3"
                value={input.level}
                onChange={(e) => {
                    onSetLevel(delNonNumeric(e.target.value))
                }}
            />
        </div>
    );
};

export default LevelSetting;