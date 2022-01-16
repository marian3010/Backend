
const pino = require('pino');

export const consoleLogger = pino(
    {
      level: 'info',
    },
  );
  
export const errorLogger = pino(
    pino.destination(
      {
        dest: 'error.log',
      },
    ),
  );
  
export const warningLogger = pino(
    pino.destination(
      {
        dest: 'warn.log',
      },
    ),
  );  

