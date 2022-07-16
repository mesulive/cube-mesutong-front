import {combineReducers} from "redux";
import cubes from "./cubes";
import input from "./input";
import result from "./result";

const rootReducer = combineReducers({
    cubes, input, result
});

export default rootReducer;