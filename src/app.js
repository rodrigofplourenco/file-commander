import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const commandFilePath = path.resolve(__dirname, './command.txt');
  const commandFileHandler = await fs.open(commandFilePath, 'r');
  const watcher = fs.watch(commandFilePath);

  for await (const event of watcher) {
    const { eventType } = event;

    if (eventType === 'change') {
      const { size } = await commandFileHandler.stat();

      const buffer = Buffer.allocUnsafe(size); // Used allocUnsafe since it's faster and we're filling it, so no sensitive data is exposed
      const offset = 0;
      const length = buffer.byteLength;
      const position = 0;

      const content = await commandFileHandler.read(buffer, offset, length, position);

      console.log(content);
    }
  }
}
main();
