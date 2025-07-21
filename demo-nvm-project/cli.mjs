import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前 ESM 模块的目录路径
export function getCurrentDir(importMeta) {
  return dirname(fileURLToPath(importMeta.url));
}

// 获取 NVM 路径
export function getNvmPath() {
  return `${process.env.APPDATA}\\nvm\\nvm.exe`;
}

// 创建 Windows 命令
export function createWindowsCommand(command) {
  return `"${getNvmPath()}" use ${command.node} && ${command.command}`;
}

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

  // 创建 Windows 命令
  const fullCommand = createWindowsCommand({
    node: project.node,
    command: project.command
  });

  // 使用 spawn 方法创建一个子进程来执行命令
  const child = spawn('cmd.exe', ['/c', fullCommand], {
    cwd: project.path,
    stdio: 'pipe',
    detached: true,
    windowsHide: true,
    env: {
      ...process.env,
      FORCE_COLOR: '1',
    }
  });

  // 添加进程事件监听
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
  child.unref();

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

  // Windows 专用处理
  spawn('taskkill', ['/F', '/T', '/PID', child.pid]);
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