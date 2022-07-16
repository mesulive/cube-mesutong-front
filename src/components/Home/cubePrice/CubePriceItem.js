import React from 'react';
import classNames from "classnames/bind";
import styles from './CubePriceItem.module.scss';
import {delNonNumeric} from "../../../utils/util";

const cx = classNames.bind(styles);

const CubePriceItem = ({cube, onSetPrice, onSetUnit}) => {
    return (
        <div className={cx("cube-container")}>
            <div className={cx("cube")}>
                <img src={cube.imgSrc} alt={cube.name}/>
                <span style={{color: cube.color}}>{cube.name}</span>
            </div>
            <div className={cx("price")}>
                <input
                    className={cx("input")}
                    maxLength="11"
                    value={cube.price.toLocaleString("en-US")}
                    onChange={(e) => {
                        onSetPrice(cube.code, delNonNumeric(e.target.value))
                    }}
                />
                <select
                    className={cx("select")}
                    onChange={(e) => {
                        onSetUnit(cube.code, e.target.value)
                    }}
                    value={cube.unit}
                >
                    <option value="메소">메소</option>
                    <option value="원">원</option>
                    <option value="코인">코인</option>
                </select>
            </div>
        </div>
    );
};

export default CubePriceItem;