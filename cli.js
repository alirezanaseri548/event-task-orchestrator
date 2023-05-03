#!/usr/bin/env node

const fs = require('fs');
const emitter = require('./src/events/emitter');

const args = process.argv.slice(2);

if (args.length < 5) {
    console.error('Usage: node cli.js resize <image_path> <width> <height> <email>');
    process.exit(1);
}

const task = args[0];
const filePath = args[1];
const width = parseInt(args[2], 10);
const height = parseInt(args[3], 10);
const email = args[4];

if (task !== 'resize') {
    console.error('Unsupported task. Currently only "resize" is supported.');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    process.exit(1);
}

emitter.emitTaskCreated({ filePath, width, height, email });

console.log('Task submitted successfully.');
