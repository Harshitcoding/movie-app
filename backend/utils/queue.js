class Queue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  addToQueue(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const task = this.queue.shift();

    try {
      await task();
      console.log('Task completed successfully');
    } catch (error) {
      console.error('Task failed:', error.message);
    }

    // Process next task
    setTimeout(() => this.processQueue(), 100);
  }

  getQueueLength() {
    return this.queue.length;
  }
}

const movieQueue = new Queue();

const addToQueue = (task) => {
  movieQueue.addToQueue(task);
};

const getQueueStatus = () => {
  return {
    queueLength: movieQueue.getQueueLength(),
    processing: movieQueue.processing,
  };
};

module.exports = { addToQueue, getQueueStatus };