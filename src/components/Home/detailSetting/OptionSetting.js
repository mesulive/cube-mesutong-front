import React, {useEffect, useMemo, useState} from 'react';
import styles from "./OptionSetting.module.scss";
import classNames from "classnames/bind";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {IconButton, makeStyles} from "@material-ui/core";
import {delNonNumeric, getCategories, getCategoryLev} from "../../../utils/util";
import HelpIcon from '@material-ui/icons/Help';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {cloneDeep} from "lodash"

const cx = classNames.bind(styles);

const useStyles = makeStyles({
  delete: {
    margin: "0",
    padding: "0"
  },
  button: {
    color: "#FF7272"
  },
  help: {
    color: "#FF7272",
    margin: "0",
    padding: "0",
    width: "20px",
    height: "20px"
  },
  add: {
    color: "#FF7272",
    margin: "0",
    padding: "0",
    width: "26px",
    height: "26px",
    marginRight: "8px"
  }
});

const OptionSet = (
  {
    s_idx,
    input,
    onDelOptionSet,
    onSetOptionCategory,
    onSetOptionFigure,
  }) => {
  const classes = useStyles();
  const optionSetCnt = useMemo(() => input.optionSets.length, [input]);
  const [originalCategories, setOriginalCategories] = useState(getCategories(input.equip, input.tier, input.sort, getCategoryLev(input.level)));
  const [categories, setCategories] = useState(getCategories(input.equip, input.tier, input.sort, getCategoryLev(input.level)));

  useEffect(() => {
    setOriginalCategories(getCategories(input.equip, input.tier, input.sort, getCategoryLev(input.level)));
  }, [input.equip, input.tier, input.sort, input.level]);

  useEffect(() => {
    let newCategories = cloneDeep(originalCategories);

    newCategories = newCategories.map(cat => {
      let selected = false;
      [0, 1, 2].forEach(o_idx => {
        if (input.optionSets[s_idx][o_idx].category === cat.name) {
          selected = true;
        }
      });

      return {
        ...cat,
        selected: selected
      }
    });
    setCategories(newCategories);
  }, [originalCategories, input.optionSets, s_idx]);

  return (
    <div>
      <div className={cx("optionSetBox")}>
        <div className={cx("deleteButtonBox")}>
          <IconButton
            classes={{root: classes.delete}}
            style={{display: optionSetCnt === 1 ? "none" : ""}}
            onClick={() => {
              onDelOptionSet(s_idx);
            }}
          >
            <DeleteRoundedIcon fontSize="large" className={classes.button}/>
          </IconButton>
        </div>
        <div className={cx("alignCenter")}>
          <>
            {
              [0, 1, 2].map((o_idx) => (
                <div className={cx("optionBox")} key={`OC/${s_idx}/${o_idx}`}>
                  <span className={cx("optionLabel")}>?????? {o_idx + 1}</span>
                  <select
                    style={{marginRight: "8px"}}
                    className={cx("select")}
                    onChange={(e) => {
                      const value = e.target.value;
                      onSetOptionCategory(s_idx, o_idx, value);
                    }}
                    value={input.optionSets[s_idx][o_idx].category}
                  >
                    <option value="0">??????</option>
                    {
                      categories.map((c) =>
                        (c.selected && c.name !== input.optionSets[s_idx][o_idx].category) ||
                        <option value={c.name} key={`OC${s_idx}/${c.name}`}>{c.name}</option>
                      )
                    }
                  </select>
                  <input
                    className={cx("figureInput", {disabled: input.optionSets[s_idx][o_idx].category === "0"})}
                    maxLength="2"
                    value={input.optionSets[s_idx][o_idx].figure}
                    onChange={(e) => {
                      onSetOptionFigure(s_idx, o_idx, delNonNumeric(e.target.value))
                    }}
                    disabled={input.optionSets[s_idx][o_idx].category === "0"}
                  />
                  <span className={cx("unit")}>{input.optionSets[s_idx][o_idx].unit}</span>
                </div>
              ))
            }
          </>
        </div>
      </div>
    </div>
  )
};

const OptionSetting = (
  {
    input, onAddOptionSet, onDelOptionSet, onInitOptionSet, onSetOptionCategory, onSetOptionFigure
  }
) => {
  const classes = useStyles();

  return (
    <div>
      <div className={cx("verticallyCenter")}>
        <div className={cx("label")}>?????? ??????</div>
        <div className={cx("help")}>
          <HelpIcon className={classes.help}/>
          <div className={cx("tooltip")}>
            ????????? ?????? ?????? 3?????? <b>??????</b>??? ??????????????????.
            <br/>
            <br/>
            ??????)
            <br/>
            ?????? ?????? ????????? ?????? 9% <b>??????</b>??? ????????? ??? ???
            <br/>
            <br/>
            <b>(X)</b>
            <br/>
            ?????? 1: ????????? 6%
            <br/>
            ?????? 2: ????????? 3%
            <br/>
            ?????? 3: ??????
            <br/>
            <br/>
            <b>(O)</b>
            <br/>
            ?????? 1: ????????? 9%
            <br/>
            ?????? 2: ??????
            <br/>
            ?????? 3: ??????
            <br/>
            <br/>
            ?????? ????????? ???????????????, ?????? ?????? ????????? ??? ????????? ????????? ???????????? ????????? ???????????????.
          </div>
        </div>
        <span
          className={cx("initButton")}
          onClick={() => {
            onInitOptionSet();
          }}
        >
                    ?????????
                </span>
      </div>

      {
        input.optionSets.map((set, idx) => (
          <OptionSet
            s_idx={idx}
            input={input}
            onDelOptionSet={onDelOptionSet}
            onSetOptionCategory={onSetOptionCategory}
            onSetOptionFigure={onSetOptionFigure}
            key={`OS/${idx}`}
          />
        ))
      }

      {
        input.optionSets.length < 10 &&
        <div
          className={cx("addButtonContainer")}
          onClick={() => {
            onAddOptionSet();
          }}
        >
          <AddCircleOutlineIcon className={classes.add}/>
          <div className={cx("addButtonText")}>?????? ?????? ??????</div>
        </div>
      }
    </div>
  );
};

export default OptionSetting;