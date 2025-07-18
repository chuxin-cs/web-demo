import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import { getCurrentDir, createPlatformCommand } from './utils/index.mjs';

// 全局存储子进程
const projectProcesses = new Map();

// 加载项目配置
export async function loadProjects() {
  const configPath = path.join(
    getCurrentDir(import.meta),
    './config/projects.json'
  );

  const data = await readFile(configPath, 'utf8');
  return JSON.parse(data);
}

// 启动单个项目
export async function startProject(projectName) {
  const projects = await loadProjects();
  const project = projects[projectName];

  if (!project) {
    throw new Error(`项目 ${projectName} 未配置`);
  }

  // 创建跨平台命令
  const fullCommand = createPlatformCommand({
    node: project.node,
    command: project.command
  });

  // 根据平台确定如何执行命令
  const [shell, ...args] = os.platform() === 'win32'
    ? ['cmd.exe', ['/c', fullCommand]]
    : ['bash', ['-c', fullCommand]];

  // 使用 spawn 方法创建一个子进程来执行命令
  // shell: 要执行的 shell 程序（Windows 为 cmd.exe，Unix 为 bash）
  // args: 传递给 shell 程序的参数
  // 第三个参数是配置对象，用于设置子进程的运行环境和行为
  const child = spawn(shell, args, {
    cwd: project.path, // 设置子进程的工作目录为项目路径
    stdio: 'inherit',  // 继承父进程的标准输入、输出和错误流
    detached: true,    // 将子进程设置为独立进程组，允许主进程退出后子进程继续运行
    shell: true,       // 使用 shell 模式执行命令
    env: {
      ...process.env,  // 继承父进程的所有环境变量
      PATH: process.env.PATH, // 保留环境变量中的 PATH 路径
      FORCE_COLOR: 'true'     // 强制启用彩色输出
    }
  });



    // ✅ 添加进程事件监听
  child.stdout.on('data', data => process.stdout.write(`[${projectName}] ${data}`));
  child.stderr.on('data', data => process.stderr.write(`[${projectName}-ERR] ${data}`));
  
  child.on('error', (err) => {
    console.error(`❌ ${projectName}启动失败:`, err.message);
    projectProcesses.delete(projectName);
  });
  
    child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${projectName}异常退出 (${code})`);
    }
    projectProcesses.delete(projectName);
  });

    // 存储进程引用
  projectProcesses.set(projectName, child);
  // child.unref(); // 允许主进程退出时子进程继续运行

  console.log(`
✅ 项目 ${projectName} 已启动:
  路径: ${project.path}
  命令: ${project.command}
  Node: ${project.node}
  端口: http://localhost:${project.port}
  `);

  return child;
}

// 停止项目
export function stopProject(projectName) {
  const child = projectProcesses.get(projectName);

  if (!child) {
    throw new Error(`项目 ${projectName} 未运行`);
  }

  if (os.platform() === 'win32') {
    // Windows 专用处理
    spawn('taskkill', ['/F', '/T', '/PID', child.pid]);
  } else {
    // Unix 系统处理
    process.kill(-child.pid);
  }

  projectProcesses.delete(projectName);
  console.log(`🛑 项目 ${projectName} 已停止`);
}

// 批量启动所有项目
export async function startAllProjects() {
  const projects = await loadProjects();

  const results = [];
  for (const projectName of Object.keys(projects)) {
    results.push(startProject(projectName));
  }

  return Promise.allSettled(results);
}

// 批量停止所有项目
export function stopAllProjects() {
  for (const [projectName] of projectProcesses) {
    stopProject(projectName);
  }
}