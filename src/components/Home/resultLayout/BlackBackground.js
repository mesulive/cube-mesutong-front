import React, {useEffect, useRef} from 'react';
import classNames from "classnames/bind";
import styles from "./BlackBackground.module.scss";
import {closeResult} from "../../../modules/result";
import useActions from "../../../lib/useActions";

const cx = classNames.bind(styles);

const BlackBackground = () => {
    const div = useRef(null);
    const [onCloseResult] = useActions([closeResult], []);

    useEffect(() => {
        div.current.className = cx("background", "show");
    }, []);

    return (
        <div ref={div} className={cx("background", "hide")} onClick={() => onCloseResult()}/>
    );
};

export default BlackBackground;