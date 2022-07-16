import {createAction, handleActions} from "redux-actions";
import produce from "immer";

const SET_PRICE = "cubes/SET_PRICE";
const SET_UNIT = "cubes/SET_UNIT";
const SET_IS_ENABLED = "cubes/SET_IS_ENABLED"

export const setPrice = createAction(SET_PRICE, (code, price) => ({code, price}));
export const setUnit = createAction(SET_UNIT, (code, unit) => ({code, unit}));
export const setIsEnabled = createAction(SET_IS_ENABLED, (code, isEnabled) => ({code, isEnabled}));

const initialState = [
    {
        code: "strange",
        name: "수상한 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/strange_cube.png`,
        color: "#6B7B99",
        isEnabled: true
    },
    {
        code: "master",
        name: "장인의 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/master_cube.png`,
        color: "#99780C",
        isEnabled: true
    },
    {
        code: "artisan",
        name: "명장의 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/artisan_cube.png`,
        color: "#6B4D99",
        isEnabled: true
    },
    {
        code: "red",
        name: "레드 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/red_cube.png`,
        color: "#CC291B",
        isEnabled: true
    },
    {
        code: "black",
        name: "블랙 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/black_cube.png`,
        color: "#333333",
        isEnabled: true
    },
    {
        code: "addi",
        name: "에디셔널 큐브",
        price: 0,
        unit: "메소",
        imgSrc: `${process.env.PUBLIC_URL}/addi_cube.png`,
        color: "#6DCC00",
        isEnabled: true
    },
];

const cubes = handleActions(
    {
        [SET_PRICE]: (state, {payload: {code, price}}) =>
            produce(state, draft => {
                const cube = draft.find(cube => cube.code === code);
                cube.price = price;
            }),
        [SET_UNIT]: (state, {payload: {code, unit}}) =>
            produce(state, draft => {
                const cube = draft.find(cube => cube.code === code);
                cube.unit = unit;
            }),
        [SET_IS_ENABLED]: (state, {payload: {code, isEnabled}}) =>
            produce(state, draft => {
                const cube = draft.find(cube => cube.code === code);
                cube.isEnabled = isEnabled;
            })
    },
    initialState
);

export default cubes;