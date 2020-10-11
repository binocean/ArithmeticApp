import { randomNum } from '../common/utils.js';

// 运算符类
export default class Operator {
  constructor(operator = ['+', '-', '×', '÷'][randomNum(0, 3)]) {
    this.operator = operator; // 操作符，默认是随机生成，也可以传入生成
    this.value = this.getValue();
  }

  // 计算运算符优先级
  getValue() {
    switch (this.operator) {
      case "+":
      case "-":
        return 1;
      case "×":
      case "÷":
        return 2;
      default:
        // 不存在该运算符 
        return 0;
    }
  }

  // 转为字符串
  toStr() {
    return ` ${this.operator} `;
  }
}