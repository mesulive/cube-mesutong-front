import React from 'react';
import classNames from "classnames/bind";
import styles from "./UpdateHistory.module.scss";

const cx = classNames.bind(styles);

const UpdateHistory = () => {
  return (
    <div className={cx("container", "content")}>
      <h1>2022.07.02</h1>
      <ul>
        <li><a href="https://maplestory.nexon.com/news/update/678">큐브 확률 변동 사항 반영</a></li>
        <li>250제 장비 옵션 수치 반영</li>
        <li>미라클 타임 설정 기능 추가</li>
        <li>평균 상위%를 더 명확하게 표시</li>
      </ul>
      <h1>2021.10.18</h1>
      <ul>
        <li>모바일 레이아웃 추가</li>
      </ul>
      <h1>2021.10.03</h1>
      <ul>
        <li>이제 옵션 설정에서 옵션명을 바꾸면 수치가 0으로 초기화되지 않음</li>
        <li>옵션 설정 버그 다수 수정</li>
      </ul>
      <h1>2021.09.30</h1>
      <ul>
        <li><a href="https://maplestory.nexon.com/News/Notice/Notice/135495" target="_blank" rel="noreferrer">확장된
          큐브 재설정 확률 공개</a> 반영
        </li>
        <li>세부 설정을 변경했을 때 옵션 세트가 유지되도록 변경</li>
        <li>세부 설정의 장비 레벨 기본값을 100으로 변경</li>
      </ul>
      <h1>2021.09.20</h1>
      <ul>
        <li>가이드, 업데이트 내역 탭 추가</li>
      </ul>
    </div>
  );
};

export default UpdateHistory;