import path from "node:path";
import spawn from "cross-spawn";

const fileMap = {
  1: "01-简介.ts"
};

export function run(options) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }
  const tscPath = path.resolve('node_modules/.bin/tsc');
  const child = spawn(tscPath, [
    path.resolve(`src/${fileMap[command] || "index.ts"}`),
  ], { stdio: 'inherit' });
  child.on('close', (code) => {
    if (code === 0) {
      console.log(`${fileMap[command]} ==> 编译成功`);
    } else {
      console.error(`${fileMap[command]} 编译失败，退出码: ${code}`);
    }
  });

  child.on('error', (error) => {
    console.error(`执行命令时出错: ${error.message}`);
  });
}