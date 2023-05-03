// emitter.js
// This file will contain the logic for emitting events
const EventEmitter = require('events');
const { Worker } = require('worker_threads');

class Emitter extends EventEmitter {
    emitTaskCreated(task) {
        this.emit('task.created', task);
        console.log(`Task Created: ${task}`);
        
        // Spawn a worker to resize the image
        const imageResizerWorker = new Worker('./src/workers/imageResizer.js', {
            workerData: {
                filePath: task.filePath,
                width: task.width,
                height: task.height
            }
        });

        imageResizerWorker.on('message', (message) => {
            if (message.status === 'success') {
                console.log('Image resized successfully:', message.outputFilePath);
                console.log('Email notification will be sent from here.');
            } else {
                console.error('Failed to resize image:', message.error);
            }
        });
    }
}

module.exports = new Emitter();
