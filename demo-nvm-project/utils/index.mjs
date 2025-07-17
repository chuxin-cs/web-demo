import { dirname } from "path"
import { fileURLToPath } from "url"
import os from "os"

// 获取当前ESM模块的目录路径
export function getCurrentDir(importMeta) {
  return dirname(fileURLToPath(importMeta.url));
}

// 跨平台获取NVM路径
export function getNvmPath() {
  const platform = os.platform();

  if (platform === 'win32') {
    return `${process.env.APPDATA}\\nvm\\nvm.exe`;
  }

  const home = os.homedir();
  return `${home}/.nvm/nvm.sh`;
}

// 跨平台命令生成
export function createPlatformCommand(command) {
  return os.platform() === 'win32'
    ? `"${getNvmPath()}" use ${command.node} && ${command.command}`
    : `. "${getNvmPath()}" && nvm use ${command.node} && ${command.command}`;
}