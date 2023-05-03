const { parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const { filePath, width, height } = workerData;

const outputFilePath = path.join(path.dirname(filePath), `resized-${path.basename(filePath)}`);

sharp(filePath)
    .resize(width, height)
    .toFile(outputFilePath)
    .then(() => {
        parentPort.postMessage({ status: 'success', outputFilePath });
    })
    .catch(err => {
        parentPort.postMessage({ status: 'error', error: err.message });
    });
