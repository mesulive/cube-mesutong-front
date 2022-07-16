import React from 'react';
import classNames from "classnames/bind";
import styles from "./TopSetting.module.scss"
import {delNonNumeric} from "../../../utils/util";

const cx = classNames.bind(styles);

const TopSetting = ({input, onSetTop, style}) => {
  return (
    <div className={cx("box")} style={style}>
      <div className={cx("label")}>다음과 같이 보기</div>
      <div>
        <span className={cx("text")} style={{marginRight: "4px"}}>상위</span>
        <input
          className={cx("input")}
          style={{marginRight: "4px"}}
          maxLength="3"
          value={input.top}
          onChange={(e) => {
            let value = delNonNumeric(e.target.value);
            if (value >= 100) {
              value = 99;
            }
            onSetTop(value);
          }}
        />
        <span className={cx("text")}>%</span>
      </div>
    </div>
  );
};

export default TopSetting;