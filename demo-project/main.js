import { exec } from 'child_process';
import projects from './file.js';

function startProject(projectName) {
  const project = projects[projectName];
  // 输出项目的具体信息
  console.log(`正在启动项目: ${projectName}`);
  console.log(`项目路径: ${project.path}`);
  console.log(`执行命令: ${project.command}`);

  const process = exec(project.command, { cwd: project.path });

  process.stdout.on('data', (data) => {
    console.log(`[${project.path}] stdout: ${data}`);
    // 发送日志到渲染进程，更新UI
  });
  
  // exec(`cd ${project.path} && ${project.command}`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`项目 ${projectName} 启动失败:`, error);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`项目 ${projectName} 执行命令时出现错误:`, stderr);
  //     return;
  //   }
  //   console.log(`项目 ${projectName} 命令执行成功，输出:`, stdout);
  // });
}
startProject('projectA')
startProject('projectB')
