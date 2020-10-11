// 控制应用程序寿命并创建本机浏览器窗口的模块
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
  // 创建窗口
  const win = new BrowserWindow({
    width: 500,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })
  // 打开开发者工具
  // win.webContents.openDevTools(); 
  // 加载index.html
  win.loadFile('index.html')
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// 关闭所有窗口(MacOS除外)后退出。
// 在那里，应用程序及其菜单栏通常保持活动状态，
// 直到用户使用Cmd+Q显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // 在MacOS上，当点击停靠图标并且没有其他窗口打开时，
  // 在应用程序中重新创建窗口是很常见的。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})