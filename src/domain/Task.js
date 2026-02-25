class Task {
  constructor({ id, type, payload, dependencies = [], retryPolicy = {} }) {
    this.id = id;
    this.type = type;
    this.payload = payload;

    this.dependencies = dependencies;
    this.status = "PENDING";

    this.retryPolicy = {
      retries: retryPolicy.retries ?? 0,
      maxRetries: retryPolicy.maxRetries ?? 3,
      backoffMs: retryPolicy.backoffMs ?? 1000
    };
  }

  canRetry() {
    return this.retryPolicy.retries < this.retryPolicy.maxRetries;
  }

  registerRetry() {
    this.retryPolicy.retries += 1;
  }
}

module.exports = Task;
