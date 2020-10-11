const $ = require('jquery')
const {
  dialog
} = require('electron').remote;

let $questionNumber = $('#questions-number'); // 题目总数input
let $range = $('#range'); // 题目范围input
let $creatBtn = $('#creat'); // 点击生成的按钮

let $questionUpload = $('#question-upload'); // 题目文件上传按钮
let $answerUpload = $('#answer-upload'); // 答案文件上传按钮
let $collateBtn = $('#collate'); // 点击校对答案的按钮


// 生成题目按钮的点击
$creatBtn.on('click', function() {
  if (/^\d+$/.test($questionNumber.val()) && /^\d+$/.test($range.val())) {
    dialog.showMessageBox({
      type: 'info',
      title: '生成完毕',
      message: '已在文件根目录生成Exercises.txt以及Answers.txt文件',
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
  console.log('题目上传');
})


$answerUpload.on('click', function() {
  console.log('答案上传');
})


$collateBtn.on('click', function() {
  console.log('校对');
})

