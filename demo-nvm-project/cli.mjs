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

  const child = spawn(shell, args, {
    cwd: project.path,
    stdio: 'inherit',
    detached: true,
    shell: true,
    env: {
      ...process.env,
      PATH: process.env.PATH, // 保留环境变量
      FORCE_COLOR: 'true'     // 强制彩色输出
    }
  });

  // 存储进程引用
  projectProcesses.set(projectName, child);

  child.unref(); // 允许主进程退出时子进程继续运行

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