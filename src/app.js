import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const commandFilePath = path.resolve(__dirname, './command.txt');
  const commandFileHandler = await fs.open(commandFilePath, 'r');
  const watcher = fs.watch(commandFilePath);

  commandFileHandler.on('change', async () => {
    const { size } = await commandFileHandler.stat();

    const buffer = Buffer.allocUnsafe(size); // Used allocUnsafe since it's faster and we're filling it, so no sensitive data is exposed
    const offset = 0;
    const length = buffer.byteLength;
    const position = 0;

    await commandFileHandler.read(buffer, offset, length, position);
    const content = buffer.toString('utf8');

    console.log(content);
  });

  for await (const event of watcher) {
    const { eventType } = event;

    if (eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
}
main();
