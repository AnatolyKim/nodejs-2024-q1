import { EventEmitter } from './EventEmitter.mjs';
import https from 'https';

export class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('start');
    
    console.time('execute');

    const data = await asyncFunc(...args);

    console.timeEnd('execute');
    
    this.emit('end');
    this.emit('data', data);
  }
}

export const fetchFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      resolve(data);
    });

    }).on('error', (error) => reject("Error: " + error.message));
  });
}
