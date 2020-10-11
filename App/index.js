const $ = require('jquery')


let $questionNumber = $('#questions-number'); // 题目总数input
let $range = $('#range'); // 题目范围input
let $creatBtn = $('#creat'); // 点击生成的按钮

let $questionUpload = $('#question-upload'); // 题目文件上传按钮
let $answerUpload = $('#answer-upload'); // 答案文件上传按钮
let $collateBtn = $('#collate'); // 点击校对答案的按钮


// 生成题目按钮的点击
$creatBtn.on('click', function() {
  console.log('生成题目123');
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

