import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {
  addOptionSet,
  delOptionSet,
  initOptionSet,
  setEquip,
  setLevel, setMiracle,
  setOptionCategory,
  setOptionFigure,
  setSort,
  setTier,
  setTop,
  setType,
  toggleCube
} from "../modules/input";
import {
  getResult
} from "../modules/result";
import useActions from "../lib/useActions";
import EquipSetting from "../components/Home/detailSetting/EquipSetting";
import LevelSetting from "../components/Home/detailSetting/LevelSetting";
import styles from "./DetailSettingContainer.module.scss";
import TypeSetting from "../components/Home/detailSetting/TypeSetting";
import SortSetting from "../components/Home/detailSetting/SortSetting";
import TierSetting from "../components/Home/detailSetting/TierSetting";
import CubeSetting from "../components/Home/detailSetting/CubeSetting";
import OptionSetting from "../components/Home/detailSetting/OptionSetting";
import TopSetting from "../components/Home/detailSetting/TopSetting";
import SubmitButton from "../components/Home/detailSetting/SubmitButton";
import {useAlert} from "react-alert";
import MiracleSetting from "../components/Home/detailSetting/MiracleSetting";

const DetailSettingContainer = () => {
  const cubes = useSelector(({cubes}) => cubes);
  const input = useSelector(({input}) => input);
  const [
    onSetEquip, onSetLevel, onSetTier, onSetType, onSetSort, onToggleCube,
    onAddOptionSet, onDelOptionSet, onInitOptionSet, onSetOptionCategory, onSetOptionFigure,
    onSetTop, onSetMiracle, onGetResult
  ] = useActions(
    [
      setEquip, setLevel, setTier, setType, setSort, toggleCube,
      addOptionSet, delOptionSet, initOptionSet, setOptionCategory, setOptionFigure,
      setTop, setMiracle, getResult
    ],
    []
  );

  const alert = useAlert();

  const calcResult = useCallback(() => {
    if (input.cubes.length === 0) {
      alert.show("하나 이상의 큐브를 선택해주세요.");
      return;
    }

    const optionSets = input.optionSets;
    if (input.type === "OPTION") {
      for (let s_idx = 0; s_idx < optionSets.length; s_idx++) {
        let isOptionSetEmpty = true;

        for (let o_idx = 0; o_idx < optionSets[s_idx].length; o_idx++) {
          const option = optionSets[s_idx][o_idx];
          if (option.category !== "0") {
            isOptionSetEmpty = false;

            if (option.figure === 0) {
              alert.show(`${s_idx + 1}번째 옵션 세트의 옵션 ${o_idx + 1}의 수치를 설정해주세요.`);
              return;
            }
          }
        }

        if (isOptionSetEmpty) {
          alert.show(`${s_idx + 1}번째 옵션 세트에 하나 이상의 옵션을 설정해주세요.`);
          return;
        }
      }
    }

    if (input.top === 0) {
      alert.show("상위 0%의 값은 계산할 수 없습니다.");
      return;
    }

    onGetResult(cubes, input);
  }, [alert, cubes, input, onGetResult]);

  return (
    <>
      <div className={styles.box}>
        <EquipSetting onSetEquip={onSetEquip}/>
      </div>
      <div className={styles.box}>
        <LevelSetting input={input} onSetLevel={onSetLevel}/>
      </div>
      <div className={styles.box}>
        <TierSetting input={input} onSetTier={onSetTier} onSetType={onSetType}/>
      </div>
      <div className={styles.box}>
        <TypeSetting input={input} onSetType={onSetType}/>
        <SortSetting input={input} onSetSort={onSetSort}/>
      </div>
      <div className={styles.box}>
        <CubeSetting cubes={cubes} input={input} onToggleCube={onToggleCube}/>
      </div>
      {
        input.type === "OPTION" &&
        <div className={styles.box}>
          <OptionSetting
            input={input}
            onAddOptionSet={onAddOptionSet} onDelOptionSet={onDelOptionSet}
            onInitOptionSet={onInitOptionSet}
            onSetOptionCategory={onSetOptionCategory} onSetOptionFigure={onSetOptionFigure}
          />
        </div>
      }
      <TopSetting input={input} onSetTop={onSetTop} style={{marginTop: "40px"}}/>
      <MiracleSetting input={input} onSetMiracle={onSetMiracle} />
      <SubmitButton style={{marginTop: "32px"}} onClick={calcResult}/>
    </>
  );
};

export default DetailSettingContainer