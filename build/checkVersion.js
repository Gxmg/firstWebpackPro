// 检查node 和 npm 版本
'use strict'

const chalk = require('chalk'); // 用来改变字体颜色

const semver = require('semver'); // 语义化版本管理

const packageConfig = require('../package.json'); // 导入package.json

const shell = require('shelljs'); // 导入shell用来执行 shell命令

// 获取纯净的版本号
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim();
}

var requireVersion = [
    {
      name: 'node',
      currentVersion: semver.clean(process.version), // 使用semver的clean方法把node的版本信息由 =v1.2.3 变成 1.2.3
      versionRequirement: packageConfig.engines.node // 这是规定的package.json文件中engines 的 node 版本 "node": ">= 6.0.0"
    }
]
if (shell.which('npm')) {
    requireVersion.push({
        name: 'npm',
        currentVersion: exec('npm --version'), // 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
        versionRequirement: packageConfig.engines.npm // 这是规定的pakage.json中engines选项的node版本信息 "npm": ">= 3.0.0"
    })
}
module.exports = function() {
  var warnings = [];
  for (var i = 0; i <requireVersion.length;i ++) {
      var mod = requireVersion[i];
      if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
          // 如果不符合 package.json 就执行这里面的语句
          warnings.push(mod.name + ':' +
          chalk.red(mod.currentVersion) + 'should be' + 
          chalk.green(mod.versionRequirement)
          // 当前版本用红色字体，符合要求的版本用绿色字体
          )
      }
  }
  if (warnings.length) {
      console.log('');
      console.log(chalk.yellow('To use this template, you must update following to modules:'));
      console.log();
      for (var i = 0; i < warnings.length; i++) {
        var warning = warnings[i]
        console.log('  ' + warning)
      }
      console.log()
      // 提醒用户更新版本
      process.exit(1);
  }
}