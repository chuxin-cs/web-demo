import { cac } from 'cac';
import { run } from "./run.js";

try {
  const chuxinRun = cac("chuxin-run");

  chuxinRun
    .command("[script]")
    .usage("Run a script")
    .action(async (command) => {
      run({ command })
    })

  chuxinRun.on('command:*', () => {
    consola.error(colors.red('Invalid command!'));
    process.exit(1);
  });

  chuxinRun.usage('turbo-run');
  chuxinRun.help();
  chuxinRun.parse();

} catch (error) {
  console.error(error);
  process.exit(1);
}
