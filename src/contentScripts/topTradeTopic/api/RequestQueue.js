export class RequestQueue {
  constructor(timeout) {
    this.timeout = timeout;
  }

  queue = [];
  timer = null;

  add(...args) {
    if (!this.timer) {
      this._scheduleNextRequest();

      return fetch(...args);
    }

    return new Promise((resolve) => {
      this.queue.push(() => resolve(fetch(...args)));
    })
  }

  _scheduleNextRequest() {
    this.timer = setTimeout(() => this._runAndScheduleNextRequest(), this.timeout);
  }

  _runAndScheduleNextRequest() {
    // if no request was enqueued
    if (this.queue.length < 1) {
      this.timer = null;
      return;
    }

    const resolveRequest = this.queue[0];

    resolveRequest();

    this.queue.splice(0,1)

    // if it's last request in the queue
    if (this.queue.length < 1) {
      this.timer = null;
      return;
    }

    this._scheduleNextRequest();
  }
}
