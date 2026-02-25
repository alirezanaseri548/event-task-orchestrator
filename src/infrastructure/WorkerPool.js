const { Worker } = require("worker_threads");
const path = require("path");

class WorkerPool {
  constructor({ size = 2 } = {}) {
    this.size = size;
    this.activeWorkers = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._next();
    });
  }

  _next() {
    if (this.activeWorkers >= this.size) return;
    if (this.queue.length === 0) return;

    const { task, resolve, reject } = this.queue.shift();
    this.activeWorkers++;

    const worker = new Worker(
      path.resolve(__dirname, "../workers/genericWorker.js"),
      { workerData: task }
    );

    worker.on("message", msg => {
      this.activeWorkers--;
      msg.success ? resolve(msg.result) : reject(new Error(msg.error));
      this._next();
    });

    worker.on("error", err => {
      this.activeWorkers--;
      reject(err);
      this._next();
    });
  }
}

module.exports = WorkerPool;
