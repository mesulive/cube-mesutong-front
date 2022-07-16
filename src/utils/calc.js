import {cloneDeep} from "lodash"

const limited_reg_list = [
  [/쓸만한/, /무적시간/],
  [/방어율/, /확률로 데미지의/, /초간 무적/, /보스/, /드롭률/]
];

const getResetCost = level => {
  if (level <= 30) return 0;
  if (level <= 70) return Math.round(0.5 * level * level);
  if (level <= 120) return Math.round(2.5 * level * level);
  return 20 * level * level;
}

const getCost = (cube, prob, level, cnt) => {
  const res = {};
  res["cnt"] = cnt;

  let cost = [];
  cost.push({price: cnt * getResetCost(level), unit: "메소"});

  if (cube.unit === "메소") {
    const price = cost[0].price + cnt * cube.price
    cost = [{price, unit: "메소"}];
  } else {
    cost.push({price: cnt * cube.price, unit: cube.unit});
  }

  res["cost"] = cost;
  return res;
}

const verify = (optionSets, op_list) => {
  let res = {};

  for (let op of op_list) {
    if (op.category !== undefined) {
      if (res[op.category] === undefined) {
        res[op.category] = parseInt(op.figure);
      } else {
        if (op.category === "몬스터 방어율 무시") {
          res[op.category] = 100 - (100 - res[op.category]) * (100 - op.figure) / 100;
        } else {
          res[op.category] += parseInt(op.figure);
        }
      }
    }
  }

  if (res["올스탯"] !== undefined) {
    ["STR", "DEX", "INT", "LUK"].forEach(n => {
      if (res[n] !== undefined) {
        res[n] += res["올스탯"];
      } else {
        res[n] = res["올스탯"];
      }
    });
  }

  if (res["올스탯 %"] !== undefined) {
    ["STR %", "DEX %", "INT %", "LUK %"].forEach(n => {
      if (res[n] !== undefined) {
        res[n] += res["올스탯 %"];
      } else {
        res[n] = res["올스탯 %"];
      }
    });
  }

  for (let criteria_list of optionSets) {
    let verified = true;
    for (let criteria of criteria_list) {
      if (criteria.category !== "0") {
        if (res[criteria.category] !== undefined) {
          if (res[criteria.category] < criteria.figure) {
            verified = false;
            break;
          }
        } else {

          verified = false;
          break;
        }
      }
    }

    if (verified) {
      return true;
    }
  }
  return false;
}


const getExcludedProbAndCnt = (op, op_2, data, reg_list, maxCnt) => {
  let excl_reg = null;
  let prob = 0.0;
  switch (maxCnt) {
    case 1 :
      limited_reg_list[maxCnt - 1].forEach((reg) => {
        if (op.name.search(reg) !== -1) {
          excl_reg = reg;
          return false;
        }
      });
      break;

    case 2 :
      limited_reg_list[maxCnt - 1].forEach((reg) => {
        if (op.name.search(reg) !== -1 && op_2.name.search(reg) !== -1) {
          excl_reg = reg;
          return false;
        }
      });
      break;

    default:
      break;
  }

  if (excl_reg !== null) {
    reg_list.push(excl_reg);

    let indexToDel = data.findIndex((d_op) => d_op.name.search(excl_reg) !== -1);
    while (indexToDel !== -1) {
      prob += data[indexToDel].prob;
      data.splice(indexToDel, 1);
      // eslint-disable-next-line no-loop-func
      indexToDel = data.findIndex((d_op) => d_op.name.search(excl_reg) !== -1);
    }
  }

  return prob;
}

const adjustProbs = (data, excl_prob) => {
  for (let d_op of data) {
    d_op.prob /= (1 - excl_prob);
  }
}

const calc = (cubes, input, data) => new Promise(resolve => {
  const result = {};
  result["type"] = input.type;
  result["top"] = input.top;
  result["cubeResults"] = [];

  input.cubes.forEach((cubeCode) => {
    const cubeData = data.filter(d => d.cube === cubeCode)[0];
    const cube = cubes.filter(cube => cube.code === cubeCode)[0];

    const cubeResults = {};
    cubeResults["cube"] = cubeCode;
    cubeResults["type"] = input.type;

    let prob;
    if (result["type"] === "TIER") {
      prob = cubeData.prob;
      if (input.miracle) {
        prob *= 2;
      }
    } else {
      const options = [];
      const optionData = cubeData.options;
      let optionData_copy = [[], [], []];

      let total_prob = 0;
      let excluded_prob = 0;

      optionData_copy[0] = cloneDeep(optionData[0]);
      for (let op_0 of optionData_copy[0]) {
        let excluded_category_reg_list = [];
        optionData_copy[1] = cloneDeep(optionData[1]);

        excluded_prob = getExcludedProbAndCnt(
          op_0,
          null,
          optionData_copy[1],
          excluded_category_reg_list,
          1);

        if (excluded_prob !== 0) {
          adjustProbs(optionData_copy[1], excluded_prob);
        }

        for (let op_1 of optionData_copy[1]) {
          optionData_copy[2] = cloneDeep(optionData[2]);
          let excluded_category_reg_list_copy = [...excluded_category_reg_list];

          excluded_prob = getExcludedProbAndCnt(op_0, null, optionData_copy[2], excluded_category_reg_list_copy, 1);
          excluded_prob += getExcludedProbAndCnt(op_1, null, optionData_copy[2], excluded_category_reg_list_copy, 1);
          excluded_prob += getExcludedProbAndCnt(op_0, op_1, optionData_copy[2], excluded_category_reg_list_copy, 2);

          if (excluded_prob !== 0) {
            adjustProbs(optionData_copy[2], excluded_prob);
          }

          for (let op_2 of optionData_copy[2]) {
            if (verify(input.optionSets, [op_0, op_1, op_2])) {
              const prob = op_0.prob * op_1.prob * op_2.prob;
              const names = [op_0.name, op_1.name, op_2.name];
              options.push({names, prob});
              total_prob += prob;
            }
          }
        }
      }

      cubeResults["options"] = options;
      prob = parseFloat((total_prob).toFixed(12));
    }

    const avgCnt = Math.ceil(1 / prob);
    const avgTopPercentage = Math.round((1 - Math.pow(1 - prob, 1 / prob)) * 10000) / 100
    const topCnt = Math.ceil(Math.log(1 - input.top * 0.01) / Math.log(1 - prob));
    cubeResults["prob"] = prob;
    cubeResults["avg"] = getCost(cube, prob, input.level, avgCnt);
    cubeResults["avg"]["topPercentage"] = avgTopPercentage;
    cubeResults["top"] = getCost(cube, prob, input.level, topCnt);

    result.cubeResults.push(cubeResults);
  });

  resolve(result);
});

export default calc;