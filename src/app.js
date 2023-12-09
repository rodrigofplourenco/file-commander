import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREATE_FILE_COMMAND = 'create the file';
const DELETE_FILE_COMMAND = 'delete the file';
const RENAME_FILE_COMMAND = 'rename the file';
const ADD_TO_FILE_COMMAND = 'add to the file';

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
    const command = buffer.toString('utf8');

    if (command.startsWith(CREATE_FILE_COMMAND)) {
      const filePath = command.substring(CREATE_FILE_COMMAND.length + 1);

      await createFile(filePath);
    }

    if (command.startsWith(DELETE_FILE_COMMAND)) {
      const filePath = command.substring(DELETE_FILE_COMMAND.length + 1);

      await deleteFile(filePath);
    }

    if (command.startsWith(RENAME_FILE_COMMAND)) {
      const commandContent = command.substring(RENAME_FILE_COMMAND.length + 1);
      const [oldPath, newPath] = commandContent.split(' to ');

      await renameFile(oldPath, newPath);
    }

    if (command.startsWith(ADD_TO_FILE_COMMAND)) {
      const commandContent = command.substring(ADD_TO_FILE_COMMAND.length + 1);
      const [path, text] = commandContent.split(': ');

      await addToFile(path, text);
    }
  });

  for await (const event of watcher) {
    const { eventType } = event;

    if (eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
}
main();

async function createFile(path) {
  try {
    const existingFileHandler = await fs.open(path, 'r');
    await existingFileHandler.close();
    
    console.error(`The file ${path} already exists!`);
  } catch (err) {
    const newFileHandler = await fs.open(path, 'w');
    await newFileHandler.close();

    console.log(`The file ${path} was succesfully created!`);
  }
}

async function deleteFile(path) {
  
}

async function renameFile(oldPath, newPath) {
  
}

async function addToFile(path, text) {
  
}
