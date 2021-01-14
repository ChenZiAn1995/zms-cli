const cmd = require("commander");

// 比如我们想执行ds init **的命令，想出现“初始化组件模板”的描述
// action是执行这个命令后续的回调，...args是后面**的参数
cmd
  .command('init')
  .description('初始化组件模板')
  .action((...args) => {});

//解析命令行
cmd.parse(process.argv);
