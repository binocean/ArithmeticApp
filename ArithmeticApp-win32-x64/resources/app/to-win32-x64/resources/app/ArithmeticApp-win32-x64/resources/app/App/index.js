const $ = require('jquery')
const { dialog } = require('electron').remote;

import { creatQuestion } from "../module/creatQuestion.js";
import { collateAnswer } from "../module/collateAnswer.js";
export let rangeObj = { // 参数最大值
  range: 10
};

let $questionNumber = $('#questions-number'); // 题目总数input
let $range = $('#range'); // 题目最大值input
let $creatBtn = $('#creat'); // 生成按钮
let $questionUpload = $('#question-upload'); // 题目文件上传按钮
let $answerUpload = $('#answer-upload'); // 答案文件上传按钮
let $collateBtn = $('#collate'); // 对比按钮

let $quesFilePath = $('#quesiton-file-path'); // 放置题目文件目录的span
let $ansFilePath = $('#answer-file-path'); // 放置答案文件目录的span
let filePath = []; // 放置答案和题目文件的路径

// 生成题目按钮的点击
$creatBtn.on('click', function() {
  if (/^\d+$/.test($questionNumber.val()) && /^\d+$/.test($range.val())) {
    creatQuestion(Number($questionNumber.val()), Number($range.val()));
    dialog.showMessageBox({
      type: 'info',
      title: '生成完毕',
      message: '已生成Exercises.txt和Answers.txt文件',
      buttons: ['好的']
    })
  } else {
    dialog.showMessageBox({
      type: 'error',
      title: '参数有误',
      message: '请检查输入的参数是否为自然数',
      buttons: ['好的']
    })
  }
  
})

$questionUpload.on('click', function() {
  dialog.showOpenDialog({
    title: '选择题目文件',
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
})


$answerUpload.on('click', function() {
  dialog.showOpenDialog({
    title: '选择答案文件',
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
})


$collateBtn.on('click', function() {
  console.log(filePath);
  if (filePath.length !== 2) {
    dialog.showMessageBox({
      type: 'error',
      title: '文件份数错误',
      message: '请确定两个文件都上传了',
      buttons: ['好的']
    })
  }  else {
    console.time('校对文件总时间');
    collateAnswer(filePath[0], filePath[1]);
    console.timeEnd('校对文件总时间');
    dialog.showMessageBox({
      type: 'none',
      title: '校对完毕',
      message: '已生成Grade.txt文件',
      buttons: ['好的']
    })
  }
})

