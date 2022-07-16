import categories from "./categories22.json";
import {useState, useEffect} from 'react';

export const delNonNumeric = s => {
  let res = s.replace(/[\D\s._-]+/g, "")
  res = res !== "" ? parseInt(res, 10) : 0;
  return res;
}

export const equips = [
  "무기", "엠블렘", "보조무기(포스실드, 소울링 제외)", "포스실드, 소울링", "방패",
  "모자", "상의", "한벌옷", "하의", "신발", "장갑", "망토",
  "어깨장식", "얼굴장식", "눈장식", "귀고리", "반지", "펜던트", "벨트", "기계심장"
]

export const getCategories = (equip, tier, sort, lev) =>
  categories.filter(obj =>
    obj.equip === equip &&
    obj.tier === tier &&
    obj.sort === sort &&
    obj.lev === lev
  )[0].categories.map(name =>
    ({
      name: name,
      selected: false
    }));

export const numberToKorean = (number) => {
  if (number === 0) {
    return "0";
  }

  let i;
  const inputNumber = number < 0 ? false : number;
  const unitWords = ['', '만 ', '억 ', '조 ', '경 '];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (i = 0; i < splitCount; i++) {
    let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}

export const getLev = level => {
  let lev = parseInt(level / 5) * 5;
  if (lev < 5) {
    return 5;
  }

  if (120 < lev && lev < 250) {
    return 120;
  }

  if (lev >= 250) {
    return 250;
  }

  return lev;
}

export const getCategoryLev = level => {
  let lev = parseInt(level / 5) * 5;
  if (lev < 5) {
    return 5;
  }

  if (120 < lev) {
    return 120;
  }

  return lev;
}

function getWindowDimensions() {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}