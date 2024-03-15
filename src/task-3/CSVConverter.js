const fs = require('fs');
const csvtojson = require('csvtojson');
const path = require('path');

const csvFilePath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv');
const txtFilePath = path.join(__dirname, './csv/data.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream
  .pipe(csvtojson())
  .pipe(writeStream)
  .on('error', (error) => console.error('Error:', error));

readStream.on('error', (error) => console.error('Read Error:', error));
writeStream.on('error', (error) => console.error('Write Error:', error));