import React from 'react';
import {Alert, AlertTitle, StyledEngineProvider} from "@mui/material";
import styles from './Notice.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Notice = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Alert severity="info" className={cx("notice")}>
        <AlertTitle>
          업데이트
        </AlertTitle>
        2022년 6월 30일 큐브 확률 변동 사항 반영 완료
      </Alert>
    </StyledEngineProvider>
  );
};

export default Notice;