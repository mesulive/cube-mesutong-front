import React from 'react';
import styles from "./TierSetting.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TierSetting = ({input, onSetTier, onSetType}) => {
    return (
        <div className={cx("verticallyCenter")} style={{height: "34px"}}>
            <span className={cx("label")}>잠재 등급</span>
            <select
                className={cx("select")}
                onChange={(e) => {
                    onSetTier(e.target.value)
                    if(e.target.value === "레전드리") {
                        onSetType("OPTION")
                    }
                }}
                value={input.tier}
            >
                {
                    ["레어", "에픽", "유니크", "레전드리"].map((e, idx) =>
                        <option value={e} key={`ES/${idx}`}>{e}</option>
                    )
                }
            </select>
        </div>
    );
};

export default TierSetting;