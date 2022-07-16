import React, {useEffect, useRef, useMemo} from 'react';
import styles from "./ResultPopUp.module.scss";
import classNames from "classnames/bind";
import SummaryResult from "./SummaryResult";
import DetailResult from "./DetailResult";
import {useWindowDimensions} from "../../../utils/util";

const cx = classNames.bind(styles);

const ResultPopUp = ({cubes, result}) => {
    const div = useRef(null);
    const type = useMemo(() => result.type === "OPTION" ? "option" : "tier", [result]);
    const { width } = useWindowDimensions();
    
    useEffect(() => {
        div.current.className = cx("box", type, "show");
    }, [type]);
    return (
        <div ref={div} className={cx("box", type, "hide")}>
            {
                result.show &&
                    <>
                        <SummaryResult cubes={cubes} result={result} className={cx("resultContainer")}/>
                        {
                            type === "option" && width >= 800 &&
                            (
                                <>
                                    <div className={cx("contour")}/>
                                    <DetailResult cubes={cubes} result={result} className={cx("resultContainer", "detailResult")}/>
                                </>
                            )
                        }
                    </>
            }
        </div>
    );
};

export default ResultPopUp;