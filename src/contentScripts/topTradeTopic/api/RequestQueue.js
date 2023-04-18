export class RequestQueue {
  constructor(timeout) {
    this.timeout = timeout;
    this.queue = [];
    this.timer = null;
  }

  add(url, options) {
    if (!this.timer) {
      this._scheduleNextRequest();

      return this._fetch(url, options);
    }

    return new Promise((resolve) => {
      this.queue.push(() => resolve(this._fetch(url, options)));
    })
  }

  _fetch(url, options) {
    if (options.fake) {
      console.log(`Request to ${url}`, this.queue.length, Date.now());
      return Promise.resolve();
    }

    return fetch(url, options);
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
