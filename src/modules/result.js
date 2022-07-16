import calc from "../utils/calc";
import axios from "axios";
import {createAction, handleActions} from "redux-actions";
import produce from "immer";
import {getLev} from "../utils/util";

const GET_RESULT = "result/GET_RESULT";
const GET_RESULT_SUCCESS = "result/GET_RESULT_SUCCESS";
const GET_RESULT_FAILURE = "result/GET_RESULT_FAILURE";
const CLOSE_RESULT = "result/CLOSE_RESULT";

export const closeResult = createAction(CLOSE_RESULT);

export const getResult = (cubes, input) => async dispatch => {
  dispatch({
    type: GET_RESULT,
    payload: input.type
  }); // 요청이 시작한 것을 알림
  try {
    const lev = getLev(input.level);

    const params = {
      tier: input.tier,
      sort: input.sort,
      type: input.type,
    }
    if (input.type === "OPTION") {
      params["equip"] = input.equip;
      params["lev"] = lev;
    }

    const data = [];
    for await (const cube of input.cubes) {
      const response = await axios.get(`${process.env.REACT_APP_DB_HOST}`, {
        params: {
          ...params,
          cube: cube
        }
      });
      data.push(response.data);
    }

    await new Promise(resolve => {
      setTimeout(resolve, 200)
    });
    const result = await calc(cubes, input, data);
    dispatch({
      type: GET_RESULT_SUCCESS,
      payload: result
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_RESULT_FAILURE,
      payload: e,
      error: true
    });
  }
};

const initialState = {
  loading: false,
  show: false,
  type: "OPTION",
  top: 0,
  cubeResults: [
    {
      cube: 0,
      prob: 0,
      avg: {
        cnt: 0,
        topPercentage: 0,
        cost: [
          {
            price: 0,
            unit: "메소"
          }
        ]
      },
      top: {
        cnt: 0,
        cost: [
          {
            price: 0,
            unit: "메소"
          }
        ]
      },
      options: [
        {
          names: [3000, 3001, 3002],
          prob: 0.000001
        },
        {
          names: [3000, 3001, 3002],
          prob: 0.000001
        }
      ]
    }
  ]
};

const result = handleActions({
  [GET_RESULT]: (state, {payload: type}) =>
    produce(state, draft => {
      draft.type = type;
      draft.loading = true;
      draft.show = true;
    }),
  [GET_RESULT_SUCCESS]: (state, {payload: result}) =>
    produce(state, draft => {
      draft.cubeResults = result.cubeResults;
      draft.top = result.top;
      draft.loading = false;
    }),
  [GET_RESULT_FAILURE]: state =>
    produce(state, draft => {
      draft.loading = false;
    }),
  [CLOSE_RESULT]: state =>
    produce(state, draft => {
      draft.show = false;
    })
}, initialState);

export default result;