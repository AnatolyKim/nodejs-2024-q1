export class EventEmitter {
  listeners = {};
 
  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);
  }
    
  on(eventName, fn) {
    this.addListener(eventName, fn);
  }
 
  removeListener(eventName, fn) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
  }
    
  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }
 
  once(eventName, fn) {
    const callOnce = (...args) => {
      fn(...args);

      this.removeListener(eventName, callOnce);
    }

    this.addListener(eventName, callOnce);
  }
 
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return;

    this.listeners[eventName].forEach(listener => {
      listener(...args);
    });
  }
 
  listenerCount(eventName) {
    if (!this.listeners[eventName]) return 0;

    return this.listeners[eventName].length;
  }
 
  rawListeners(eventName) {
    return this.listeners[eventName];
  }
 }
