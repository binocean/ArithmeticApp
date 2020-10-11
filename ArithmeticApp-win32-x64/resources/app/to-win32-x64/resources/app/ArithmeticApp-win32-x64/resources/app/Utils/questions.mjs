import {
  randomNum
} from '../Utils/index.mjs';
import Operands from '../Class/Operands.mjs' // 操作数
import Operator from '../Class/Operator.mjs' // 操作符
import {
  insertBrackets
} from './brackets.mjs' // 与括号相关的方法
import {
  calculateExp, // 计算中缀表达式
} from './calculate.mjs' // 与计算相关的方法
import {
  writeFile,
  readFileToArr
} from './file.mjs'

/**
 * @description: 生成题目的函数
 * @param {number} total  题目个数
 * @param {number} range  参数范围
 * @return: ['表达式1','表达式2'...]
 */
export let generateQuestions = (total, range) => {
  let questionArr = []; // 题目数组
  let canBeZero = true; // 操作数是否可以为0 
  // 生成 total 个题目
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

  // 给数组中每一条表达式插入括号
  console.time('插入括号总时间');
  let insertBracketsArr = insertBrackets(questionArr);
  console.timeEnd('插入括号总时间');

  // 题目转为写入文件的字符串格式（无转后缀）
  console.time('转为文件字符串时间');
  let strQuestionsArr = questionsToStr(insertBracketsArr);
  console.timeEnd('转为文件字符串时间');

  // 转为写入文件格式的答案数组
  console.time('计算后缀表达式并生成字符串格式答案');
  let answers = insertBracketsArr.map((exp, index) => `${index+1}. ${calculateExp(exp).toStr()}`);
  console.timeEnd('计算后缀表达式并生成字符串格式答案');
  
  console.time('写入文件时间');
  writeFile('Exercises.txt', strQuestionsArr.join('\n'));
  writeFile('Answers.txt', answers.join('\n'));
  console.timeEnd('写入文件时间');
}

/**
 * @description: 题目数组遍历转换为题目格式(string[]) 
 * @param {Array[]} questionArr  题目数组
 * @return: 转为固定格式的题目字符串数组 例如：1. a + b + c = 
 */
let questionsToStr = questionArr => questionArr.map((expression, index) => {
  let str = expression.map(item => (typeof item === 'object') ? item.toStr() : item);
  str.unshift(`${index + 1}. `);
  return str.join('').concat(' = ');
})

/**
 * @description: 分析题目文件并生成答案，与自己的答案文件进行比对生成 Grade.txt
 * @param {string} exercisefile 题目文件的路径
 * @param {string} answerfile 答案文件的路径
 */
export let analyzeQuestions = (exercisefile, answerfile) => {
  // 读取题目文件
  readFileToArr(exercisefile, (strQuestionsArr) => {
    // 解析每一个题目，并得到一个嵌套答案数组[[],[],[]]
    let realAnswersArr = strQuestionsArr.map(item => {
      let expArr = [];
      // 去除开头的 '1. '和结尾的 ' = '
      item = item.substring(item.indexOf(".") + 1, item.indexOf(" = ")).trim();
      expArr = item.split(""); // 字符串先转为数组，为了在括号旁边插入空格
      // 括号旁边插入空格
      for (let i = 0; i < expArr.length; i++) {
        if (expArr[i] === '(') {
          expArr.splice(i++ + 1, 0, " ");
        } else if (expArr[i] === ')') {
          expArr.splice(i++, 0, " ");
        }
      }
      // 通过空格隔开操作数、操作符与括号
      expArr = expArr.join("").split(" ");
      // 将字符串表达式转为对应可运算的类
      let answer = expArr.map(item => {
        if (["+", "×", "÷", "-"].indexOf(item) >= 0) {
          return new Operator(item); // 操作符
        } else if ("(" === item || ")" === item) {
          return item; // 括号
        } else {
          // 操作数，则将操作数的带分数的整数部分、分母、分子分离,并返回操作数实例
          let element = item.split(/'|\//).map(item => parseInt(item));
          switch (element.length) {
            case 1:
              // 操作数是整数
              return new Operands({
                denominator: 1, // 分母
                numerator: element[0] // 分子
              });
            case 2:
              // 操作数不是带分数的分数
              return new Operands({
                denominator: element[1],
                numerator: element[0]
              });
            case 3:
              // 操作数是带分数
              return new Operands({
                denominator: element[2],
                numerator: element[0] * element[2] + element[1]
              });
          }
        }
      })
      return calculateExp(answer)
    })
    // 将答案文件与标准答案进行比对
    compareAnswers(answerfile, realAnswersArr);
  });
}

/**
 * @description: 将答案文件与标准答案进行比对
 * @param {string} answerfile 答案文件的路径 
 * @param {string[]} realAnswer 正确答案的数组 
 */
let compareAnswers = (answerfile, realAnswer) => {
  // 解析答案文件
  readFileToArr(answerfile, (strAnswersArr) => {
    // 去除答案文件的序号
    let analyzedAnswersArr = strAnswersArr.map(item => {
      return item.substring(item.indexOf(".") + 1).trim();
    })
    let wrongNumArr = []; // 记录错题序号
    let rightNumArr = []; // 记录对题序号
    analyzedAnswersArr.forEach((item, index) => {
      // 答案相同则推入rightNumArr，否则推入wrongNumArr
      (item === realAnswer[index].toStr()) ? rightNumArr.push(index + 1): wrongNumArr.push(index + 1);
    })
    // 写入根目录的 Grade.txt 文件
    writeFile("Grade.txt", `Correct: ${rightNumArr.length}(${rightNumArr.join(",")})\nWrong: ${wrongNumArr.length}(${wrongNumArr.join(",")})`);
  });
}