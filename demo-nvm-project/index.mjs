#!/usr/bin/env node
import minimist from 'minimist';
import {
  startProject,
  stopProject,
  startAllProjects,
  stopAllProjects
} from './cli.mjs';

// 解析命令行参数
const argv = minimist(process.argv.slice(2));
const [command, project] = argv._;

async function main() {
  try {
    switch (command) {
      case 'start':
        if (project) {
          await startProject(project);
        } else {
          await startAllProjects();
        }
        break;

      case 'stop':
        if (project) {
          stopProject(project);
        } else {
          stopAllProjects();
        }
        break;

      default:
        showHelp();
    }
  } catch (error) {
    console.error(`❌ 错误: ${error.message}`);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
前端项目管理工具 (ESM版本) v1.0
用法:
  npx pm start <项目名>   启动单个项目
  npx pm start            启动所有项目
  npx pm stop <项目名>    停止单个项目
  npx pm stop             停止所有项目

示例:
  npx pm start vue-app
  npx pm stop react-app
`);
}

main();