import { randomNum } from "../commom/utils.js";

// let creatQuestion = (total = 10, range = 5) => {
//   let questionArr = []; // 题目数组
//   let canBeZero = true; // 操作数是否可以为0 
//   // 生成 total 个题目
//   for (let i = 0; i < total; i++) {
//     let operandNum = randomNum(2, 4); // 2-4个操作数
//     let operatorNum = operandNum - 1; // 1-3个操作符
//     let expArr = []; // 表达式数组
//     for (let j = 0; j < operandNum; j++) {
//       let operands = new Operands({
//         range,
//         canBeZero
//       });
//       expArr.push(operands);
//       while (calculateExp(expArr).value < 0) {
//         operands = new Operands({
//           range,
//           canBeZero
//         });
//         expArr.pop();
//         expArr.push(operands);
//       }
//       if (j !== operatorNum) {
//         let operator = new Operator(); // 随机生成操作符
//         canBeZero = (operator.operator === '÷') ? false : true; // 如果操作符是 ÷ ，那么下一个生成数不能为 0
//         expArr.push(operator);
//       }
//     }
//     questionArr.push(expArr);
//   }
// }

import Operands from '../Class/Operands.js' // 操作数
import Operator from '../Class/Operator.js' // 操作符
import { 
  calculateExp, // 计算中缀表达式
} from './calculate.js' // 与计算相关的方法

export let test = () => {
  let range = 10 
  let canBeZero = true
  let operandNum = randomNum(2, 4); // 2-4个操作数
  let operatorNum = operandNum - 1; // 1-3个操作符
  console.log(operandNum);
  let expArr = []; // 表达式数组
  for (let j = 0; j < operandNum; j++) {
    let operands = new Operands({
      range,
      canBeZero
    });
    expArr.push(operands);
    while (calculateExp(expArr).value < 0) {
      operands = new Operands({
        range,
        canBeZero
      });
      expArr.pop();
      expArr.push(operands);
    }
    if (j !== operatorNum) {
      let operator = new Operator(); // 随机生成操作符
      canBeZero = (operator.operator === '÷') ? false : true; // 如果操作符是 ÷ ，那么下一个生成数不能为 0
      expArr.push(operator);
    }
  }

  console.log(expArr )

}


