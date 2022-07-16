import React from 'react';
import styles from "./EquipSetting.module.scss"
import classNames from "classnames/bind";
import {equips} from "../../../utils/util";

const cx = classNames.bind(styles);

const EquipSetting = ({onSetEquip}) => {
    return (
        <div className={cx("verticallyCenter")} style={{height: "34px"}}>
            <span className={cx("label")}>장비 종류</span>
            <select
                className={cx("select")}
                onChange={(e) => {onSetEquip(e.target.value)}}
            >
                {
                    equips.map((e) =>
                        <option value={e} key={`ES/${e}`}>{e}</option>
                    )
                }
            </select>
        </div>
    );
};

export default EquipSetting;