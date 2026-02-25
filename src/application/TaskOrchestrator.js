const EventBus = require("../infrastructure/EventBus");

class TaskOrchestrator {
  constructor() {
    this.tasks = new Map();
  }

  register(task) {
    this.tasks.set(task.id, task);
    EventBus.emit("task:registered", task);
  }

  markCompleted(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = "COMPLETED";
    EventBus.emit("task:completed", task);
  }

  markFailed(taskId, error) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = "FAILED";
    EventBus.emit("task:failed", { task, error });
  }
}

module.exports = TaskOrchestrator;
