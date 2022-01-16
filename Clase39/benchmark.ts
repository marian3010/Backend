import {consoleLogger, errorLogger, warningLogger} from './logger.js'
const autocannon = require('autocannon');
const stream = require('stream');

const run = (url:any) => {
  const buffer:any = [];
  const outputStream = new stream.PassThrough();
  const instance = autocannon(
    {
      url,
      connections: 100,
      duration: 20,
    },
  );

  autocannon.track(
    instance,
    {
      outputStream,
    },
  );

  outputStream.on(
    'data',
    (data:any) => {
      buffer.push(data);
    },
  );

  instance.on(
    'done',
    () => process.stdout.write(Buffer.concat(buffer)),
  );
};

consoleLogger.info('Running all benchmarks in parallel...');

run('http://localhost:8080/ecommerce/info');
