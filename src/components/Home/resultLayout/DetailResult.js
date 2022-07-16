import React, {useMemo} from 'react';
import styles from "./DetailResult.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const getRandomListIndex = (list) => {
    const maxLength = 200
    if (list.length <= maxLength) {
        return [...Array(list.length).keys()];
    }

    let res = [...Array(list.length).keys()];

    const length = list.length;
    for (let i = 0, cnt = maxLength; cnt > 0 && i < length; i++, cnt--) {
        let j = Math.floor(Math.random() * length);
        let x = res[i];
        res[i] = res[j];
        res[j] = x;
    }
    res = res.slice(0, maxLength);
    res.sort((a, b) => a - b);
    return res;
}

const DetailResult = ({cubes, result, className}) => {
    const contents = useMemo(() => {
        if (!result.loading) {
            return cubes.map(cube => {
                const data = result.cubeResults.filter(cubeResult => cube.code === cubeResult.cube);
                if (data.length !== 0) {
                    const options = data[0].options;
                    const indexList = getRandomListIndex(data[0].options);
                    return (
                        <>
                            <div style={{color: cube.color}} className={cx("cube")}>{cube.name}</div>
                            {
                                indexList.map(i => {
                                    return <>
                                        {options[i].names[0]}<br/>
                                        {options[i].names[1]}<br/>
                                        {options[i].names[2]}<br/>
                                        {`${(options[i].prob * 100).toFixed(10)}%`}<br/><br/>
                                    </>
                                })
                            }
                        </>
                    )
                }
                return null;
            });
        } else {
            return null;
        }
    }, [cubes, result.cubeResults, result.loading]);

    return (
        <div className={`${className} ${cx("container", "koreanFont")}`}>
            {
                result.loading ||
                <>
                    {
                        result.cubeResults.length !== 0 && result.cubeResults[0].options.length > 200 &&
                        <>각 큐브의 결과 중 랜덤으로 200개를 골라 보여줍니다.<br/>
                            <hr/>
                        </>
                    }
                    {contents}
                </>
            }
        </div>
    );
};

export default DetailResult;