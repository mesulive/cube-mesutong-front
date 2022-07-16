import React from 'react';
import classNames from "classnames/bind";
import styles from "./SubmitButton.module.scss";

const cx=classNames.bind(styles);

const SubmitButton = ({style, onClick}) => {
    return (
        <div>
            <button className={cx("button")}
                    style={style}
                    onClick={() => {onClick();}}>계산하기</button>
        </div>
    );
};

export default SubmitButton;