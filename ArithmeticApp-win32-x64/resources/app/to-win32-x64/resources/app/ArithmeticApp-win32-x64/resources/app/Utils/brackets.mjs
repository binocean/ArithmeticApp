import {
  randomNum
} from './index.mjs';
import {
  calculateExp
} from './calculate.mjs'
import Operands from '../Class/Operands.js'

/**
 * @description: 给问题数组的每个表达式插入括号的主要函数
 * @param {Array[]} questionArr 表达式未插入括号的问题数组
 * @return: 表达式插入括号后的问题数组
 */
export let insertBrackets = (questionArr) => {
  return questionArr.map((item, index) => {
    let bracketsNum = 0; // 括号对的数目
    switch (item.length) {
      case 5:
        bracketsNum = randomNum(0, 1); // 3个操作数则最多1对括号
        break;
      case 7:
        bracketsNum = randomNum(0, 2); // 4个操作数则最多2对括号
        break;
      default:
        break;
    }
    // 将原来 item 项（即一个表达式）随机插入 bracketsNum 对括号
    let newItem = item;
    while (bracketsNum--) {
      newItem = randomInsertBrackets(newItem);
    }
    return newItem; // 移除无意义的括号
  });
}

/**
 * @description: 随机插入括号
 * @param {(string|Object)[]} expressionArr 表达式（是一个由'操作数'和'操作符'组成的表达式）
 * @return: 插入括号后的表达式数组
 */
let randomInsertBrackets = (expressionArr) => {
  // 寻找左括号可插入位置
  let leftInsertIndex = findLeftCanInsert(expressionArr);
  // 插入括号并返回新数组
  return findRightCanInsert(expressionArr, leftInsertIndex);
}

/**
 * @description: 寻找左括号可以插入的位置
 * @param {(string|Object)[]} expressionArr 表达式数组
 * @return: 随机返回一个左括号可插入位置
 */
let findLeftCanInsert = (expressionArr) => {
  let Arr = [];
  // 如果是操作数，则将其位标放入数组
  expressionArr.forEach((item, index) => {
    (item instanceof Operands) && Arr.push(index);
  })
  let leftInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  return leftInsertIndex;
}

/**
 * @description: 寻找右括号可以插入的位置TODO:
 * @param {(string|Object)[]} expressionArr 已经插入了左括号的表达式数组
 * @param {number} leftIndex 左括号预插入位置
 * @return: 随机返回一个右括号可插入位置，如果没有则返回 false 
 */
let findRightCanInsert = (expressionArr, leftInsertIndex) => {
  let Arr = []; // 右括号可以插入的位置数组
  let beforeInsert = expressionArr; // 未插入括号之前的表达式
  let beforeValue = calculateExp(beforeInsert); // 计算未插入之前的值
  expressionArr.splice(leftInsertIndex, 0, '('); // 插入左括号
  let left = 0;
  let right = 0; // 找到右括号后判断左右括号之间是否成对括号
  for (let i = leftInsertIndex + 1; i < expressionArr.length; i++) {
    if (expressionArr[i] === '(') {
      left++;
    } else if (expressionArr[i] === ')') {
      right++;
    }
    // 操作数的右边而且操作数左边没有(
    if ((expressionArr[i] instanceof Operands) && left === right && (expressionArr[i - 1] !== '(')) {
      Arr.push(i + 1);
    }
  }
  // 没有符合的位置，那么就返回false
  if (Arr.length === 0) {
    // 如果找不到右括号可以插入的位置，则删除左括号
    expressionArr.splice(leftInsertIndex, 1);
    return expressionArr;
  }
  // 右括号可插入位置
  let rightInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  expressionArr.splice(rightInsertIndex, 0, ')'); // 插入右括号
  let beforeOperator = expressionArr[leftInsertIndex - 1]; //本括号外的操作符

  // 应该要遍历整个表达式，看看此时表达式中插入括号后各个括号内的情况
  let innerExp = []; // 括号内容，特殊判断如果前面是÷，且括号内容是0那么括号不符合条件
  innerExp.push(expressionArr.slice(leftInsertIndex + 1, rightInsertIndex)); // 本括号
  // 只有在本括号以外的括号才需要考虑其他括号的值
  let otherLeftIndex = expressionArr.lastIndexOf('(', leftInsertIndex - 1); // 本括号左边的左括号
  let otherRightIndex = expressionArr.indexOf(')', rightInsertIndex + 1);
  if (otherLeftIndex !== -1 && otherRightIndex !== -1) {
    innerExp.push(expressionArr.slice(otherLeftIndex + 1, otherRightIndex));
  }
  // 当括号内的表达式小于0 ，或者前面为÷，括号为0，或者加括号无意义时去掉括号然后break
  let shouldDelete = 0;
  for (let i = 0; i < innerExp.length; i++) {
    let innerExpValue = calculateExp(innerExp[i]).value;
    if (i > 0) {
      beforeOperator = expressionArr[otherLeftIndex - 1];
    }
    if (innerExpValue < 0 || (beforeOperator && beforeOperator.operator === '÷' && innerExpValue === 0)) {
      shouldDelete = 1;
      break;
    }
  }
  let afterValue = calculateExp(expressionArr); // 插入后的值
  if (shouldDelete === 1 || afterValue.value < 0 || beforeValue.value === afterValue.value) { // 如果插入括号后的值与插入前相等，那么括号无意义
    expressionArr.splice(rightInsertIndex, 1); // 删除右括号
    expressionArr.splice(leftInsertIndex, 1); // 删除左括号
  }
  return expressionArr;
}

// /**
//  * @description: 去除多余的括号 TODO:
//  * @param {(string|Object)[]} expressionArr 已经插入了括号后的表达式数组 
//  * @return: 返回去除多余括号后的表达式数组
//  */
// let rmExcessBrackets = (expressionArr) => {
//   let exp1 = /^\(((?!.*(\)[^\(^\)]*\()).)*\)$/; // 第一位是(,最后一位是)，然后中间不是 )...( 的情况，就要去除首尾
//   if (exp1.test(expressionArr.join(''))) {
//     return expressionArr.slice(1, expressionArr.length - 1);
//   }
//   return expressionArr;
// }