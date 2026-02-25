const { parentPort, workerData } = require("worker_threads");

async function execute(task) {
  // Simulate heavy work
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    taskId: task.id,
    result: "ok"
  };
}

execute(workerData)
  .then(result => parentPort.postMessage({ success: true, result }))
  .catch(error =>
    parentPort.postMessage({ success: false, error: error.message })
  );
