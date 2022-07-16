import React, {useCallback} from 'react';
import classNames from "classnames/bind";
import styles from './CubePrice.module.scss';
import CubePriceItem from "./CubePriceItem";

const cx = classNames.bind(styles);

const CubePrice = ({cubes, onSetPrice, onSetUnit}) => {
    const setToReboot = useCallback(() => {
        onSetPrice("master", 4900000);
        onSetUnit("master", "메소");
        onSetPrice("red", 12500000);
        onSetUnit("red", "메소");
        onSetPrice("black", 22600000);
        onSetUnit("black", "메소");
        onSetPrice("addi", 0);
    }, [onSetPrice, onSetUnit]);

    const setToCommon = useCallback(() => {
        onSetPrice("red", 900);
        onSetUnit("red", "원");
        onSetPrice("black", 1650);
        onSetUnit("black", "원");
        onSetPrice("addi", 1890);
        onSetUnit("addi", "원");
    }, [onSetPrice, onSetUnit]);

    return (
        <>
            <div className={cx("cubes-container")}>
                {
                    cubes.map(cube => (
                        <CubePriceItem
                            cube={cube}
                            onSetPrice={onSetPrice}
                            onSetUnit={onSetUnit}
                            key={`price/${cube.code}`}
                        />
                    ))
                }
            </div>
            <div className={cx("preset-container")}>
                <button className={cx("reboot")} onClick={setToReboot}>
                    리부트 서버 가격으로 설정
                </button>
                <button className={cx("common")} onClick={setToCommon}>
                   일반 서버 가격으로 설정
                </button>
            </div>
        </>
    );
};

export default CubePrice;