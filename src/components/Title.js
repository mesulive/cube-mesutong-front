import React from "react";
import classNames from "classnames/bind";
import styles from './Title.module.scss';
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

const Title = () => {
    return (
        <div className={cx("bar")}>
            <div className={cx("container")}>
                <a href="/" className={cx("title")}>
                    <div>큐브매수통</div>
                </a>
                <Link to="/" className={cx("link")}>
                    <div>홈</div>
                </Link>
                <Link to="/guide" className={cx("link")}>
                    <div>가이드</div>
                </Link>
                <Link to="/updateHistory" className={cx("link")}>
                    <div>업데이트 내역</div>
                </Link>
            </div>
        </div>
    )
};

export default Title;