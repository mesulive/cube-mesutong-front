import React from 'react';
import {useSelector} from "react-redux";
import BlackBackground from "../components/Home/resultLayout/BlackBackground";
import ResultPopUp from "../components/Home/resultLayout/ResultPopUp";

const ResultLayoutContainer = () => {
    const result = useSelector(({result}) => result);
    const cubes = useSelector(({cubes}) => cubes);
    return result.show ?
        (
            <>
                <BlackBackground/>
                <ResultPopUp cubes={cubes} result={result}/>
            </>
        ) : null
};

export default ResultLayoutContainer;