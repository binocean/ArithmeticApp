import { randomNum } from "../common/utils.js";
import Operands from '../Class/Operands.js' // 操作数类
import Operator from '../Class/Operator.js' // 操作符类
import { insertBrackets } from './bracket.js' // 与括号相关的方法
import { writeFile } from './aboutFile.js'  // 与文件相关的方法
import { calculateExp } from './calculate.js' // 与计算相关的方法

export let creatQuestion = (total, range) => {
  let questionArr = []; // 题目数组
  let canBeZero = true; // 操作数是否可以为0 
  // 生成 total 个题目
  console.time('生成题目总时间');
  for (let i = 0; i < total; i++) {
    let operandNum = randomNum(2, 4); // 2-4个操作数
    let operatorNum = operandNum - 1; // 1-3个操作符
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
    questionArr.push(expArr);
  }
  console.timeEnd('生成题目总时间');

  // 给数组中每一条表达式插入括号
  console.time('处理题目总时间');
  // 插入括号
  let insertBracketsArr = insertBrackets(questionArr);

  // 转为文件字符串
  let strQuestionsArr = questionsToStr(insertBracketsArr);
  
  // 转为写入文件格式的答案数组
  let answers = insertBracketsArr.map((exp, index) => `${index+1}. ${calculateExp(exp).toStr()}`);
  console.timeEnd('处理题目总时间');

  console.time('写入文档总时间');
  writeFile('Exercises.txt', strQuestionsArr.join('\n'));
  writeFile('Answers.txt', answers.join('\n'));
  console.timeEnd('写入文档总时间');
}

let questionsToStr = questionArr => questionArr.map((expression, index) => {
  let str = expression.map(item => (typeof item === 'object') ? item.toStr() : item);
  str.unshift(`${index + 1}. `);
  return str.join('').concat(' = ');
})


