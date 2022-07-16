import {createAction, handleActions} from "redux-actions";
import produce from "immer";
import {getCategories, getCategoryLev} from "../utils/util";

const SET_EQUIP = "input/SET_EQUIP";
const SET_LEVEL = "input/SET_LEVEL";
const SET_TIER = "input/SET_TIER";
const SET_TYPE = "input/SET_TYPE";
const SET_SORT = "input/SET_SORT";
const TOGGLE_CUBE = "input/TOGGLE_CUBE";

const ADD_OPTION_SET = "input/ADD_OPTION_SET";
const DEL_OPTION_SET = "input/DEL_OPTION_SET";
const INIT_OPTION_SET = "input/INIT_OPTION_SET"

const SET_OPTION_CATEGORY = "input/SET_OPTION_CATEGORY";
const SET_OPTION_FIGURE = "input/SET_OPTION_FIGURE";

const SET_TOP = "input/SET_TOP";

const SET_MIRACLE = 'input/SET_MIRACLE';

export const setEquip = createAction(SET_EQUIP, (equip) => equip);
export const setLevel = createAction(SET_LEVEL, (level) => level);
export const setTier = createAction(SET_TIER, (tier) => tier);
export const setType = createAction(SET_TYPE, (type) => type);
export const setSort = createAction(SET_SORT, (sort) => sort);
export const toggleCube = createAction(TOGGLE_CUBE, (cubeCode) => cubeCode);

export const addOptionSet = createAction(ADD_OPTION_SET);
export const delOptionSet = createAction(DEL_OPTION_SET, (s_index) => s_index);
export const initOptionSet = createAction(INIT_OPTION_SET);

export const setOptionCategory =
  createAction(SET_OPTION_CATEGORY, (s_index, o_index, category) => ({s_index, o_index, category}));
export const setOptionFigure =
  createAction(SET_OPTION_FIGURE, (s_index, o_index, figure) => ({s_index, o_index, figure}));

export const setTop = createAction(SET_TOP, (top) => top);

export const setMiracle = createAction(SET_MIRACLE, (miracle) => miracle);

const getEmptyOptionSet = () => [
  {category: "0", figure: 0, unit: ""},
  {category: "0", figure: 0, unit: ""},
  {category: "0", figure: 0, unit: ""}
];

const initialState = {
  equip: "무기",
  level: 100,
  tier: "레어",
  type: "TIER",
  sort: "UP",
  cubes: [],
  optionSets: [
    [
      {category: "0", figure: 0, unit: ""},
      {category: "0", figure: 0, unit: ""},
      {category: "0", figure: 0, unit: ""}
    ]
  ],
  top: 50,
  miracle: false,
};

const input = handleActions(
  {
    [SET_EQUIP]: (state, {payload: equip}) =>
      produce(state, draft => {
        draft.equip = equip;
        const categories = getCategories(draft.equip, draft.tier, draft.sort, getCategoryLev(draft.level) );
        draft.optionSets.forEach(optionSet => {
          optionSet.forEach(option => {
            if (categories.filter(cat => cat.name === option.category).length === 0) {
              option.category = "0";
              option.figure = 0;
              option.unit = "";
            }
          })
        });
        // const emptyOptionSet = getEmptyOptionSet();
        // draft.optionSets = [emptyOptionSet];
      }),

    [SET_LEVEL]: (state, {payload: level}) =>
      produce(state, draft => {
        draft.level = level;
        const categories = getCategories(draft.equip, draft.tier, draft.sort, getCategoryLev(draft.level));
        draft.optionSets.forEach(optionSet => {
          optionSet.forEach(option => {
            if (categories.filter(cat => cat.name === option.category).length === 0) {
              option.category = "0";
              option.figure = 0;
              option.unit = "";
            }
          })
        });
      }),

    [SET_TIER]: (state, {payload: tier}) =>
      produce(state, draft => {
        draft.tier = tier;
        switch (tier) {
          case "에픽":
            if (draft.type === "TIER") {
              draft.cubes = draft.cubes.filter(code => code !== "strange");
            }
            break;
          case "유니크":
            draft.cubes = draft.cubes.filter(code => code !== "strange");
            if (draft.type === "TIER") {
              draft.cubes = draft.cubes.filter(code => code !== "master");
            }
            break;
          case "레전드리":
            draft.cubes = draft.cubes.filter(code =>
              code !== "strange" &&
              code !== "master");
            break;
          default:
            break;
        }
        const categories = getCategories(draft.equip, draft.tier, draft.sort, getCategoryLev(draft.level));
        draft.optionSets.forEach(optionSet => {
          optionSet.forEach(option => {
            if (categories.filter(cat => cat.name === option.category).length === 0) {
              option.category = "0";
              option.figure = 0;
              option.unit = "";
            }
          })
        });
        // const emptyOptionSet = getEmptyOptionSet()
        // draft.optionSets = [emptyOptionSet];
      }),

    [SET_TYPE]: (state, {payload: type}) =>
      produce(state, draft => {
        draft.type = type;
        if (draft.optionSets.length === 0) {
          const emptyOptionSet = getEmptyOptionSet()
          draft.optionSets = [emptyOptionSet];
        } else {
          const categories = getCategories(draft.equip, draft.tier, draft.sort, getCategoryLev(draft.level));
          draft.optionSets.forEach(optionSet => {
            optionSet.forEach(option => {
              if (categories.filter(cat => cat.name === option.category).length === 0) {
                option.category = "0";
                option.figure = 0;
                option.unit = "";
              }
            })
          });
        }

        if (type === "TIER") {
          if (draft.tier === "에픽") {
            draft.cubes = draft.cubes.filter(code => code !== "strange");
          } else if (draft.tier === "유니크") {
            draft.cubes = draft.cubes.filter(code => code !== "master");
          }
        }
      }),

    [SET_SORT]: (state, {payload: sort}) =>
      produce(state, draft => {
        draft.sort = sort;
        if (sort === "UP") {
          draft.cubes = draft.cubes.filter(code => code !== "addi");
        } else {
          draft.cubes = ["addi"];
        }
        const categories = getCategories(draft.equip, draft.tier, draft.sort, getCategoryLev(draft.level));
        draft.optionSets.forEach(optionSet => {
          optionSet.forEach(option => {
            if (categories.filter(cat => cat.name === option.category).length === 0) {
              option.category = "0";
              option.figure = 0;
              option.unit = "";
            }
          })
        });
        // const emptyOptionSet = getEmptyOptionSet()
        // draft.optionSets = [emptyOptionSet];
      }),

    [TOGGLE_CUBE]: (state, {payload: cubeCode}) =>
      produce(state, draft => {
        const index = draft.cubes.findIndex(code => code === cubeCode);
        if (index === -1) {
          draft.cubes.push(cubeCode);
        } else {
          draft.cubes.splice(index, 1);
        }
      }),

    [ADD_OPTION_SET]: state =>
      produce(state, draft => {
        if (draft.optionSets.length < 10) {
          const emptyOptionSet = getEmptyOptionSet();
          draft.optionSets.push(emptyOptionSet);
        }
      }),

    [DEL_OPTION_SET]: (state, {payload: s_index}) =>
      produce(state, draft => {
        if (draft.optionSets.length > 0) {
          draft.optionSets.splice(s_index, 1);
        }
      }),

    [INIT_OPTION_SET]: state =>
      produce(state, draft => {
        const emptyOptionSet = getEmptyOptionSet();
        draft.optionSets = [emptyOptionSet];
      }),

    [SET_OPTION_CATEGORY]: (state, {payload: {s_index, o_index, category}}) =>
      produce(state, draft => {
        draft.optionSets[s_index][o_index].category = category;
        if (category === "0") {
          draft.optionSets[s_index][o_index].figure = 0;
        }
        draft.optionSets[s_index][o_index].unit = category.search(/재사용/) !== -1 ? "초" :
          category.search(/%/) !== -1 ? "%" : "";
      }),

    [SET_OPTION_FIGURE]: (state, {payload: {s_index, o_index, figure}}) =>
      produce(state, draft => {
        draft.optionSets[s_index][o_index].figure = figure;
      }),

    [SET_TOP]: (state, {payload: top}) =>
      produce(state, draft => {
        draft.top = top;
      }),
    [SET_MIRACLE]: (state, {payload: miracle}) =>
      produce(state, draft => {
        draft.miracle = miracle;
      })
  },
  initialState
);

export default input;