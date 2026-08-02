const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (filename) => path.join(DATA_DIR, `${filename}.json`);

const readData = (filename) => {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

const writeLocks = new Map();

const writeData = (filename, data) => {
  return new Promise((resolve, reject) => {
    const filePath = getFilePath(filename);
    const queue = writeLocks.get(filename) || [];

    const task = { data, resolve, reject };
    queue.push(task);
    writeLocks.set(filename, queue);

    const processQueue = () => {
      const currentQueue = writeLocks.get(filename);
      if (!currentQueue || currentQueue.length === 0) {
        writeLocks.delete(filename);
        return;
      }

      const current = currentQueue[0];
      try {
        fs.writeFileSync(filePath, JSON.stringify(current.data, null, 2), 'utf8');
        current.resolve();
      } catch (err) {
        console.error(`Error writing ${filename}:`, err);
        current.reject(err);
      }

      const remaining = currentQueue.slice(1);
      writeLocks.set(filename, remaining);

      if (remaining.length === 0) {
        writeLocks.delete(filename);
      } else {
        setImmediate(processQueue);
      }
    };

    setImmediate(processQueue);
  });
};

module.exports = {
  readData,
  writeData,
};
