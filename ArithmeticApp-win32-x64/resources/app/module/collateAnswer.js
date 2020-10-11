import Operands from '../Class/Operands.js' // 操作数类
import Operator from '../Class/Operator.js' // 操作符类
import { writeFile, readFileToArr } from './aboutFile.js'  // 与文件相关的方法
import { calculateExp } from './calculate.js' // 与计算相关的方法


export let collateAnswer = (exercisefile, answerfile) => {
  // 读取题目文件
  readFileToArr(exercisefile, (questionsArr) => {
    // 解析每一个题目，并得到答案
    let correctAnswersArr = questionsArr.map(item => {
      // 截取题目
      item = item.substring(item.indexOf(".") + 1, item.indexOf(" = ")).trim();
      let expArr = item.split(""); // 字符串先转为数组，为了在括号旁边插入空格
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
    compareAnswers(answerfile, correctAnswersArr);
  });
}

let compareAnswers = (answerfile, correctAnswer) => {
  // 解析答案文件
  readFileToArr(answerfile, (strAnswersArr) => {
    let analyzedAnswersArr = strAnswersArr.map(item => {
      return item.substring(item.indexOf(".") + 1).trim();
    })
    let wrongAnswerArr = []; 
    let rightAnswerArr = []; 
    analyzedAnswersArr.forEach((item, index) => {
      // 答案相同则推入rightAnswerArr，否则推入wrongAnswerArr
      (item === correctAnswer[index].toStr()) ? rightAnswerArr.push(index + 1): wrongAnswerArr.push(index + 1);
    })
    // 写入根目录的 Grade.txt 文件
    writeFile("Grade.txt",
`Correct: ${rightAnswerArr.length}(${rightAnswerArr.join(",")})
Wrong: ${wrongAnswerArr.length}(${wrongAnswerArr.join(",")})` );
  });
}