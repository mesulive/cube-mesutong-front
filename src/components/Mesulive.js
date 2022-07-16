import React from 'react';
import classNames from "classnames/bind";
import styles from "./Mesulive.module.scss";

const cx = classNames.bind(styles);

const Mesulive = () => {
  return (
    <div className={cx("wrapper")} >
      <a href="https://mesu.live" target="_blank" rel="noreferrer">
        <img src={`${process.env.PUBLIC_URL}/mesulive.svg`} alt="mesulive"/>
        스타포스 시뮬레이터 바로가기
      </a>
    </div>
  );
};

export default Mesulive;