const fs = require('fs');
const readline = require('readline');
const path = require('path');


export let writeFile = (fileName, data) => {
  let filePath = path.join(__dirname, fileName);  // 文件放在根目录
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.error(`${fileName}文件写入失败`);
    } else {
      console.log(`${fileName}文件写入成功`);
    }
  })
}

export let readFileToArr = (fileName, callback) => {
  let fileContent = fs.createReadStream(fileName); // 创建读取流
  let objReadline = readline.createInterface({    // 实例化接口对象
    input: fileContent
  });
  let lines = [];
  // 按行读取放入数组
  objReadline.on('line', line => {
    lines.push(line);
  });
  objReadline.on('close', () => {
    callback && callback(lines);
  });
}
