import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const commandFilePath = path.resolve(__dirname, './command.txt');
  const watcher = fs.watch(commandFilePath);

  for await (const event of watcher) {
    const { eventType } = event;

    if (eventType === 'change') {
      console.log(event);
    }
  }
}
main();
