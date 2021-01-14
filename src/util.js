const inquirer = require('inquirer')
const downloadGit = require('')
// 判断文件是否存在
const isExist = async(name) => {
  return new Promise((resolve) => {
    if(fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'))
    }else{
      resolve();
    }
  });
}

// 询问用户
let promptList = [
  {
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['vue', 'react']
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description:'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name:'
  }
];

let prompt = ()=>{
  return new Promise((resolve)=>{
    // inquirer提供prompt函数来实现询问，其参数为数组，询问将按数组的顺序来
    inquirer.prompt(promptList)
      .then(answer => {
        resolve(answer);
      })
  });
}

// 项目模块远程下载
let downLoadTemplate = async (ProjectName ,api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, ProjectName, {clone: true}, (err) => {
      if(err) {
        reject(err);
      }else{
        resolve();
      }
    });
  });
};

module.export = {
  isExist,
  prompt
}
