// 窗口的渲染器进程中执行
import {
  generateQuestions,
  analyzeQuestions
} from '../Utils/questions.mjs' // 生成题目的函数
import {
  errorTip
} from '../Utils/index.mjs'
const $ = require('jquery')
export let rangeObj = { // 参数范围
  range: 10
};

let $generateBtn = $('#generate'); // 点击生成的按钮
let $proofreadBtn = $('#proofread'); // 点击校对答案的按钮
let $questionTotal = $('#question-total'); // 题目总数input
let $range = $('#range'); // 题目范围input
let $questionUpload = $('#question-upload'); // 题目文件上传按钮
let $answerUpload = $('#answer-upload'); // 答案文件上传按钮
let $quesFilePath = $('#quesiton-file-path'); // 放置题目文件目录的span
let $ansFilePath = $('#answer-file-path'); // 放置答案文件目录的span
let filePath = []; // 放置答案和题目文件的路径
const {
  dialog
} = require('electron').remote; // 文件选择框

// 生成题目按钮的点击
$generateBtn.on('click', function() {
  if(/^\d+$/.test($questionTotal.val()) && /^\d+$/.test($range.val())) {
    // 生成 questionTotal 个题目
    console.time('生成题目总时间');
    generateQuestions(Number($questionTotal.val()), Number($range.val()));
    console.timeEnd('生成题目总时间');
    dialog.showMessageBox({
      type: 'none',
      title: '生成完毕',
      message: '已在文件根目录生成Exercises.txt以及Answers.txt文件',
      buttons: ['知道了']
    })
  } else {
    errorTip('参数输入错误','请确保都输入了自然数');
  }
})

// 上传题目文件
$questionUpload.on('click', function () {
  dialog.showOpenDialog({
    title: '请选择题目文件',
    filters: [{
      name: 'txt',
      extensions: ['txt']
    }],
    buttonLabel: '选择',
  }).then(res => {
    let path = res.filePaths[0];
    $quesFilePath.text(path);
    if (filePath.length === 2) {
      filePath.shift();
    }
    filePath.unshift(path);
  }).catch(err => {
    console.log(err);
  })
});
// 上传答案文件
$answerUpload.on('click', function () {
  dialog.showOpenDialog({
    title: '请选择答案文件',
    filters: [{
      name: 'txt',
      extensions: ['txt']
    }],
    buttonLabel: '选择',
  }).then(res => {
    let path = res.filePaths[0];
    $ansFilePath.text(path);
    if (filePath.length === 2) {
      filePath.pop();
    }
    filePath.push(path);
  }).catch(err => {
    console.log(err);
  })
});
// 校对按钮的点击
$proofreadBtn.on('click', function () {
  if (filePath.length !== 2) {
    errorTip('文件选择错误','请确定是否题目文件和答案文件都选择了');
  } else {
    // 校对文件
    console.time('校对文件');
    analyzeQuestions(filePath[0], filePath[1]);
    console.timeEnd('校对文件');
    dialog.showMessageBox({
      type: 'none',
      title: '校对完毕',
      message: '已在文件根目录生成Grade.txt文件',
      buttons: ['知道了']
    })
  }
})


// let mode = []; // -r 参数范围  -n 题目数目
// let questionTotal = 10; // 题目总数 默认为10
// const remote = require('electron').remote;
// let argv = remote.process.argv; // 命令行参数的
// console.log(argv);
// switch (argv.length) {
//   // 没有传参
//   case 1:
//     errorTip('输入参数错误','请检查参数是否输入正确');
//     console.log('输入参数错误，请选择模式');
//     console.log('-r 参数控制题目中数值（自然数、真分数和真分数分母）的范围');
//     console.log('-n 参数控制生成题目的个数');
//     console.log('示例：.exe -n 10 -r 10');
//     console.log('示例：.exe -e <exercisefile>.txt -a <answerfile>.txt');
//     console.log('示例：.exe -n 10');
//     console.log('示例：.exe -r 10');
//     break;
//     // 只传入一个模式
//   case 3: {
//     let firstMode = argv[1]; // 第一个模式
//     let firstParam = argv[2]; // 第一个参数 
//     if (!parameterCheck(firstMode, firstParam)) break;
//     mode.push(firstMode);
//     switch (firstMode) {
//       case '-n':
//         // 代表数目个数，没有传入参数范围，默认为10
//         generateQuestions(firstParam, rangeObj.range);
//         break;
//       case '-r':
//         // 代表参数范围，没有传入题目个数，也默认为10
//         generateQuestions(questionTotal, firstParam);
//         break;
//       default:
//         console.log('参数有误，请重新输入');
//         break;
//     }
//     break;
//   }
//   // 传入两个模式
//   // -n -r 或者 -e -a
//   case 5: {
//     let firstMode = argv[1]; // 第一个模式
//     let firstParam = argv[2]; // 第一个参数 
//     let secondMode = argv[3]; // 第一个模式
//     let secondParam = argv[4]; // 第一个参数 
//     if (!parameterCheck(firstMode, firstParam) || !parameterCheck(secondMode, secondParam)) break;
//     switch (firstMode) {
//       case '-n':
//         if (secondMode !== '-r') {
//           console.log('参数有误，请重新输入');
//           break;
//         }
//         generateQuestions(firstParam, secondParam); // -n -r的情况
//         break;
//       case '-r':
//         if (secondMode !== '-n') {
//           console.log('参数有误，请重新输入');
//           break;
//         }
//         generateQuestions(secondParam, firstParam); // -r -n的情况
//         break;
//       case '-e':
//         if (secondMode !== '-a') {
//           console.log('参数有误，请重新输入');
//           break;
//         }
//         analyzeQuestions(firstParam, secondParam); // -e -a的情况
//         break;
//       case '-a':
//         if (secondMode !== '-e') {
//           console.log('参数有误，请重新输入');
//           break;
//         }
//         analyzeQuestions(secondParam, firstParam); // -a -e的情况
//         break;
//     }
//   }
//   default:
//     console.log('参数有误，请重新输入');
//     break;
// }