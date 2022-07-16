import React from 'react';
import classNames from "classnames/bind";
import styles from './SectionBox.module.scss';

const cx = classNames.bind(styles);

const SectionBox = ({title, children}) => {
    return (
        <div className={cx("container")}>
            <div className={cx("title")}>{title}</div>
            <div className={cx("box")}>
                {children}
            </div>
        </div>
    );
};

export default SectionBox;