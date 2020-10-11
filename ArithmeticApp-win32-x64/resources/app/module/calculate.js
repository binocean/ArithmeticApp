import Operands from '../Class/Operands.js'
import Operator from '../Class/Operator.js'

// 四则运算
const Arithmetic = {
  // 两个操作数求和 
  add(a, b) {
    return new Operands({
      numerator: a.numerator * b.denominator + b.numerator * a.denominator,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数求差
  sub(a, b) {
    return new Operands({
      numerator: a.numerator * b.denominator - b.numerator * a.denominator,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数乘法
  mult(a, b) {
    return new Operands({
      numerator: a.numerator * b.numerator,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数除法
  divi(a, b) {
    return new Operands({
      numerator: a.numerator * b.denominator,
      denominator: a.denominator * b.numerator
    });
  }
}

export let calculateExp = (expression) => {
  // 将中缀表达式转为后缀表达式
  let temp = []; // 临时存放
  let suffix = []; // 存放后缀表达式
  expression.forEach(item => {
    if (item instanceof Operands) {
      suffix.push(item) 
    } else if (item === '(') {
      temp.push(item); 
    } else if (item === ')') {
      while (temp[temp.length - 1] !== '(') {
        suffix.push(temp.pop());
      }
      temp.pop(); 
    } else if (item instanceof Operator) {
      // 如果栈顶是运算符，且栈顶运算符的优先级大于或等于该运算符
      while (temp.length !== 0 &&
        temp[temp.length - 1] instanceof Operator &&
        temp[temp.length - 1].value >= item.value) {
        suffix.push(temp.pop());
      }
      // 是空栈或者栈顶是左括号亦或是栈顶优先级低，则直接入栈到 temp
      temp.push(item);
    }
  });
  while (temp.length !== 0) {
    suffix.push(temp.pop());
  }
  // 以下过程将后缀表达式计算成答案并转为 Oprands 实例
  const {
    add,
    sub,
    mult,
    divi
  } = Arithmetic; // 四则运算方法
  let answerArr = []; // 存放运算结果
  suffix.forEach(item => {
    if (item instanceof Operands) {
      answerArr.push(item); // 如果是操作数则推入
    } else {
      // 是操作符则弹出最顶出的两个操作数进行运算
      let b = answerArr.pop();
      let a = answerArr.pop();
      let result = null;
      switch (item.operator) {
        case '+':
          result = add(a, b);
          break;
        case '-':
          result = sub(a, b);
          break;
        case '×':
          result = mult(a, b);
          break;
        case '÷':
          result = divi(a, b);
          break;
        default:
          break;
      }
      answerArr.push(result);
    }
  })
  return answerArr.pop();
}