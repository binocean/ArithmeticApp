const fs = require('fs');
const readline = require('readline');
const path = require('path');

/**
 * @description: 读取文件每一行并转换为数组
 * @param {string} fReadName 文件名路径 
 * @param {func} callback 回调函数 
 * @return: 由文件每一行组成的数组
 */
export let readFileToArr = (fReadName, callback) => {
  let fRead = fs.createReadStream(fReadName); // 创建读取流
  let objReadline = readline.createInterface({    // 实例化接口对象
    input: fRead
  });
  let lines = [];
  // 按行读取放入数组
  objReadline.on('line', (line) => {
    lines.push(line);
  });
  objReadline.on('close', function () {
    callback && callback(lines);
  });
}

/**
 * @description: 写入文件
 * @param {string} 文件名，写在根目录下
 * @param {string} data 写入文件的内容
 */
export let writeFile = (fileName, data) => {
  let filePath = path.join(__dirname, fileName);  // 文件放在根目录
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.error('文件写入失败');
    } else {
      console.log('文件写入成功');
    }
  })
}

