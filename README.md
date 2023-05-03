# Event-Driven Task Orchestrator (EDTO)

## Overview
The Event-Driven Task Orchestrator is a Node.js application that processes image resizing tasks using an event-driven architecture. It utilizes `worker_threads` for handling CPU-intensive operations.

## Features
- CLI tool for submitting image resizing tasks.
- Event-driven processing using Node.js `EventEmitter`.
- Image resizing handled by `sharp` in worker threads.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd event-task-orchestrator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the CLI**
   Submit an image resizing task:
   ```bash
   ./cli.js resize <image_path> <width> <height> <email>
   ```
   - `<image_path>`: Path to the image file.
   - `<width>` and `<height>`: Desired dimensions.
   - `<email>`: Placeholder for email notification (currently logs to console).

## Concepts Covered
- Event-driven architecture
- Task offloading with `worker_threads`
- Image processing with `sharp`

## Note
The email notification functionality is currently a placeholder and logs a message to the console.
