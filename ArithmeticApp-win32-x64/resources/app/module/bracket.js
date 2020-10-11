import { randomNum } from "../common/utils.js";
import { calculateExp } from "./calculate.js";
import Operands from '../Class/Operands.js';

export let insertBrackets = (questionArr) => {
  return questionArr.map( item => {
    let bracketsNum = 0; // 括号对的数目
    switch (item.length) {
      case 5:
        bracketsNum = randomNum(0, 1);
        break;
      case 7:
        bracketsNum = randomNum(0, 2);
        break;
      default:
        break;
    }
    // 将原来 item 项（即一个表达式）随机插入 bracketsNum 对括号
    let newItem = item;
    while (bracketsNum--) {
      newItem = tryInsertBrackets(item);
    }
    return newItem;
  });
}

let tryInsertBrackets = (itemArr) => {
  // 寻找左括号可插入位置
  let leftInsertIndex = findLeftCanInsert(itemArr);
  // 插入括号并返回新数组
  return doInsert(itemArr, leftInsertIndex);
}

let findLeftCanInsert = (itemArr) => {
  let Arr = [];
  // 如果是操作数，则将其位标放入数组
  itemArr.forEach((item, index) => {
    (item instanceof Operands) && Arr.push(index);
  })
  let leftInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  return leftInsertIndex;
}

let doInsert = (itemArr, leftInsertIndex) => {
  let Arr = []; // 右括号可以插入的位置数组
  let beforeInsert = itemArr; // 未插入括号之前的表达式
  let beforeValue = calculateExp(beforeInsert); // 计算未插入之前的值
  itemArr.splice(leftInsertIndex, 0, '('); // 插入左括号
  let left = 0;
  let right = 0; // 找到右括号后判断左右括号之间是否成对括号
  for (let i = leftInsertIndex + 1; i < itemArr.length; i++) {
    if (itemArr[i] === '(') {
      left++;
    } else if (itemArr[i] === ')') {
      right++;
    }
    // 操作数的右边而且操作数左边没有(
    if ((itemArr[i] instanceof Operands) && left === right && (itemArr[i - 1] !== '(')) {
      Arr.push(i + 1);
    }
  }
  // 没有符合的位置，那么就返回false
  if (Arr.length === 0) {
    // 如果找不到右括号可以插入的位置，则删除左括号
    itemArr.splice(leftInsertIndex, 1);
    return itemArr;
  }
  // 右括号可插入位置
  let rightInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  itemArr.splice(rightInsertIndex, 0, ')'); // 插入右括号
  let beforeOperator = itemArr[leftInsertIndex - 1]; //本括号外的操作符

  // 应该要遍历整个表达式，看看此时表达式中插入括号后各个括号内的情况
  let innerExp = []; // 括号内容，特殊判断如果前面是÷，且括号内容是0那么括号不符合条件
  innerExp.push(itemArr.slice(leftInsertIndex + 1, rightInsertIndex)); // 本括号
  // 只有在本括号以外的括号才需要考虑其他括号的值
  let otherLeftIndex = itemArr.lastIndexOf('(', leftInsertIndex - 1); // 本括号左边的左括号
  let otherRightIndex = itemArr.indexOf(')', rightInsertIndex + 1);
  if (otherLeftIndex !== -1 && otherRightIndex !== -1) {
    innerExp.push(itemArr.slice(otherLeftIndex + 1, otherRightIndex));
  }
  // 当括号内的表达式小于0 ，或者前面为÷，括号为0，或者加括号无意义时去掉括号然后break
  let shouldDelete = 0;
  for (let i = 0; i < innerExp.length; i++) {
    let innerExpValue = calculateExp(innerExp[i]).value;
    if (i > 0) {
      beforeOperator = itemArr[otherLeftIndex - 1];
    }
    if (innerExpValue < 0 || (beforeOperator && beforeOperator.operator === '÷' && innerExpValue === 0)) {
      shouldDelete = 1;
      break;
    }
  }
  let afterValue = calculateExp(itemArr); // 插入后的值
  if (shouldDelete === 1 || afterValue.value < 0 || beforeValue.value === afterValue.value) { // 如果插入括号后的值与插入前相等，那么括号无意义
    itemArr.splice(rightInsertIndex, 1); // 删除右括号
    itemArr.splice(leftInsertIndex, 1); // 删除左括号
  }
  return itemArr;
}
