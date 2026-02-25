class TaskGraph {
  constructor(tasks) {
    this.tasks = tasks;
  }

  detectCycle() {
    const visited = new Set();
    const stack = new Set();

    const visit = (taskId) => {
      if (stack.has(taskId)) return true;
      if (visited.has(taskId)) return false;

      visited.add(taskId);
      stack.add(taskId);

      const task = this.tasks.get(taskId);
      if (!task) return false;

      for (const dep of task.dependencies) {
        if (visit(dep)) return true;
      }

      stack.delete(taskId);
      return false;
    };

    for (const id of this.tasks.keys()) {
      if (visit(id)) return true;
    }

    return false;
  }
}

module.exports = TaskGraph;
