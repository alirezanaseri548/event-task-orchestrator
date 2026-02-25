const EventBus = require("../infrastructure/EventBus");
const WorkerPool = require("../infrastructure/WorkerPool");

class TaskOrchestrator {
  constructor() {
    this.tasks = new Map();
    this.workerPool = new WorkerPool({ size: 2 });
  }

  register(task) {
    this.tasks.set(task.id, task);
    EventBus.emit("task:registered", task);
    this.tryExecute(task);
  }

  tryExecute(task) {
    if (task.status !== "PENDING") return;

    const depsDone = task.dependencies.every(depId => {
      const dep = this.tasks.get(depId);
      return dep && dep.status === "COMPLETED";
    });

    if (!depsDone) return;

    task.status = "RUNNING";

    this.workerPool
      .runTask(task)
      .then(() => this.markCompleted(task.id))
      .catch(err => this.markFailed(task.id, err));
  }

  markCompleted(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = "COMPLETED";
    EventBus.emit("task:completed", task);

    // Try to unlock dependent tasks
    for (const t of this.tasks.values()) {
      this.tryExecute(t);
    }
  }

  markFailed(taskId, error) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    if (task.canRetry()) {
      task.registerRetry();
      task.status = "PENDING";
      setTimeout(() => this.tryExecute(task), task.retryPolicy.backoffMs);
      return;
    }

    task.status = "FAILED";
    EventBus.emit("task:failed", { task, error });
  }
}

module.exports = TaskOrchestrator;
