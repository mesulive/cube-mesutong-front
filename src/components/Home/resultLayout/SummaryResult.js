import React from 'react';
import styles from "./SummaryResult.module.scss";
import classNames from "classnames/bind";
import {numberToKorean} from "../../../utils/util";

const cx = classNames.bind(styles);

const Summary = ({cube, data, top}) => {
    const hasTwoUnits = data.avg.cost.length === 2 && data.avg.cost[1].price !== 0;

    return (
        <div className={cx("summaryContainer")}>
            <div className={cx("cube")}>
                <img src={cube.imgSrc} alt={cube.name}/>
                <span style={{color: cube.color}}>{cube.name}</span>
            </div>
            <div className={cx("title")}>1회 시행 시 목표 달성 확률</div>
            <div className={cx("content")}>{`${(data.prob * 100).toFixed(10)}%`}</div>
            <div className={cx("title")}>평균 (상위 {data.avg.topPercentage}%)</div>
            <div className={cx("content")}>
                {`${data.avg.cnt.toLocaleString("en-US")}개`}<br/>
                {`${numberToKorean(data.avg.cost[0].price)}${data.avg.cost[0].unit} ${hasTwoUnits ? "+ " : ""}`}<br/>
                {hasTwoUnits && `${numberToKorean(data.avg.cost[1].price)}${data.avg.cost[1].unit}`}
            </div>
            <div className={cx("title")}>{`상위 ${top}%`}</div>
            <div className={cx("content")}>
                {`${data.top.cnt.toLocaleString("en-US")}개`}<br/>
                {`${numberToKorean(data.top.cost[0].price)}${data.top.cost[0].unit} ${hasTwoUnits ? "+ " : ""}`}<br/>
                {hasTwoUnits && `${numberToKorean(data.top.cost[1].price)}${data.top.cost[1].unit}`}
            </div>
        </div>
    );
};

const SummaryResult = ({cubes, result, className}) => {
    return (
        <div className={`${className} ${cx("container")}`}>
            {
                result.type === "OPTION" &&
                <>
                    <div className={cx("info")}>
                        <span>결과에 대한 상세 정보는 PC버전에서만 제공됩니다.<br/></span>
                        <hr/>
                    </div>
                </>
            }
            {result.loading ||
            cubes.map(cube => {
                const data = result.cubeResults.filter(cubeResult => cube.code === cubeResult.cube);
                if (data.length !== 0) {
                    return <Summary cube={cube} data={data[0]} top={result.top} key={`SR/${cube.code}`}/>
                }
                return null;
            })
            }
        </div>
    );
}
;

export default SummaryResult;