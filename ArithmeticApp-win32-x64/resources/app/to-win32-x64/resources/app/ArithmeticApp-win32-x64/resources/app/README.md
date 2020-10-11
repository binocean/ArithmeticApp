# expression-generator
> 利用`Electron`技术开发的四则运算表达式生成器桌面程序

## App目录描述
expression-generator-win32-x64 是应用程序包，包含可运行的 exe 文件
```txt
App
├── node_modules 			// 依赖包
├── index.html 				// 主页面
├── main.js 				// 主进程
├── renderer 				// 渲染进程
│ └── index.mjs
├── Class 				// 类
│ ├── Operator.mjs      		// 操作符类
│ └── Operands.mjs      		// 操作数类
├── Uitls 				// 存放功能函数
│ ├── brackets.mjs      		// 与括号相关的方法
│ ├── calculate.mjs     		// 与计算相关的方法
│ ├── questions.mjs     		// 与题目相关的方法
│ └── file.mjs         		        // 关于文件读写的方法 
│ └── index.mjs         		// 公共方法      
├── package.json 			// webpack 配置
├── package-lock.json 			// webpack 配置
├── .gitignore 				// github 推送忽略配置
├── .babelrc 				// es6 babel 配置文件
└── preload.js 				// 主页面
```

## `npm start`
> 启动程序

## `npm run package`
> 打包生成 `.exe` 文件，可以通过 `cmd`命令行传参操作

## 项目PSP表格
PSP2.1 | Personal Software Process Stages | 预估耗时（分钟） | 实际耗时（分钟）
-|-|-|-
Planning | 计划 | 30 | 
Estimate | 估计这个任务需要多少时间 | 30 | 
Development | 开发 | 1310 | 
Analysis | 需求分析 (包括学习新技术) | 60 | 
Design Spec | 生成设计文档 | 0 | 0
Design Review | 设计复审 (和同事审核设计文档) | 0 | 0
Coding Standard | 代码规范 (为目前的开发制定合适的规范) | 10 | 
Design | 具体设计 | 180 | 
Coding | 具体编码 | 1000 | 300
Code Review | 代码复审 | 30 |
Test | 测试（自我测试，修改代码，提交修改） | 30 |
Reporting | 报告 | 120 |
Test Report | 测试报告 | 60 |
Size Measurement | 计算工作量 | 30 |
Postmortem & Process Improvement Plan | 事后总结, 并提出过程改进计划 | 30 |
总计 |  | 1460 | 
