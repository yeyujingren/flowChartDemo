type Func = (...args: any[]) => any;

class EventBus {
  events: {
    [k: string]: Array<Func>;
  }
  constructor() {
    this.events = {}
  }

  /**
   * emit
   */
  public emit(eventName: string, data?: any[]) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        if (data) {
          fn(data);
        } else {
          fn()
        }
      })
    }
  }

  public on(eventName: string, fn: Func) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  public off(eventName: string, fn: Func) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}

export default EventBus;