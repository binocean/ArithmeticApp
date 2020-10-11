// 公用函数模块
const {
  dialog
} = require('electron').remote; // 文件选择框
/**
 * @description: 生成 [min, max] 之间的随机数
 * @param {number} min 左区间
 * @param {number} max 由区间
 * @return: 返回随机数
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @description: 辗转相除法求最大公约数
 * @param {number} num1 数字1
 * @param {number} num2 数字2
 * @return: num1 和 num2 的最大公约数
 */
export const gcd = (num1, num2) => {
  let remainder = 0;
  do {
    remainder = num1 % num2;
    num1 = num2;
    num2 = remainder;
  } while (remainder !== 0);
  return num1;
}

/**
 * @description: 检查命令行参数的合法性
 * @param {string} mode 执行模式
 * @param {string} param  模式对应的参数
 * @return: 合法返回true，否则返回false
 */
// export const parameterCheck = (mode, param) => {
//   // 如果是其他模式则返回错误
//   if (['-n', '-r', '-e', '-a'].indexOf(mode) === -1) {
//     console.log('参数有误，请重新输入！');
//     return false;
//   }
//   // -n -r 的参数一定得是数字
//   if (['-n', '-r'].indexOf(mode) !== -1) {
//     if (!(/^\d+$/.test(param))) {
//       console.log('参数有误，请重新输入！');
//       return false;
//     }
//   }
//   return true;
// }

/**
 * @description: 错误提示框
 * @param {string} title 标题
 * @param {string} msg 提示内容
 */
export let errorTip = (title = '错误', msg) => {
  dialog.showMessageBox({
    type: 'error',
    title: title,
    message: msg,
    buttons: ['知道了']
  })
}