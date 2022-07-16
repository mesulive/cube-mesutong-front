import React from "react";
import CubePrice from "../components/Home/cubePrice/CubePrice";
import {setIsEnabled, setPrice, setUnit} from "../modules/cubes";
import {useSelector} from "react-redux";
import useActions from "../lib/useActions";

const CubePriceContainer = () => {
    const cubes = useSelector(({cubes}) => cubes);
    const [onSetPrice, onSetUnit, onSetIsEnabled] = useActions(
        [setPrice, setUnit, setIsEnabled],
        []
    );

    return (
        <CubePrice
            cubes={cubes}
            onSetPrice={onSetPrice}
            onSetUnit={onSetUnit}
            onSetIsEnabled={onSetIsEnabled}
        />
    );
};

export default CubePriceContainer;