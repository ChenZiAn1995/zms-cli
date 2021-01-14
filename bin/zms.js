#! /usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const chalk = require("chalk");
const handlebars = require("handlebars");
const ora = require("ora");
const fs = require("fs")
const symbols = require("log-symbols");
program
  .version(require('../package.json').version, "-v, --version, -V")
  .command('init  <name>')
  .description('初始化组件模板')
  .action((name) => {
    if (fs.existsSync(name)) {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red(`项目名${name}已存在,请检查后再试!`));
      return;
    }
    inquirer
      .prompt([
        {
          type: 'list',
          message: '请选择模板类型:',
          name: 'templateType',
          choices: [
            "base",
            "component",
            "shell"
          ]
        },
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称(默认为zms-mf-demo)",
          default: "zms-mf-demo"
        },
        {
          name: "description",
          message: "请输入项目描述"
        },
        {
          name: "author",
          message: "请输入作者名称"
        }
      ]).then(answers => {
      //在这里获得上面的答案
      download(
        `https://github.com/ChenZiAn1995/zms-template.git#${answers.templateType}`,
        name,
        { clone: true },
        err => {
          const spinner = ora("正在下载模板...");
          spinner.start();
          if (!err) {
            spinner.succeed();
            // const meta = {
            //   projectName:answers.projectName,
            //   description: answers.description,
            //   author: answers.author
            // };
            // const fileName = `${name}/package.json`;
            // if (fs.existsSync(fileName)) {
            //   const content = fs.readFileSync(fileName).toString();
            //   const result = handlebars.compile(content)(meta);
            //   fs.writeFileSync(fileName, result);
            // }
            console.log(symbols.success, chalk.green("项目初始化完成"));
          } else {
            spinner.fail();
            console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
          }
        }
      );
    })
  })

//解析命令行
program.parse(process.argv);
// download(
//   "https://github.com/ChenZiAn1995/zms-template.git#master",
//   name,
//   { clone: true },
//   err => {
//
//   }
// )
