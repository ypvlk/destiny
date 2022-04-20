import * as bunyan from 'bunyan';
import {
  LoggerOptions,
  Stream,
  nameFromLevel,
  safeCycles
} from 'bunyan';

class BunyanStream {
  write(logMessage: any) {
    const updatedLog = Object.assign(
      logMessage,
      { time: logMessage.time ? logMessage.time.toISOString() : new Date().toISOString() },
      // replace level code with String
      { level: logMessage.level ? nameFromLevel[logMessage.level].toUpperCase() : 'INFO' }
    );

    const result = `${JSON.stringify(updatedLog, safeCycles())}\n`;
    process.stdout.write(result);
  }
}

const loggerOptions: LoggerOptions = {
  name: 'destiny',
  component: 'app',
  level: 'info', // TODO
  streams: [
    {
      type: 'raw',
      stream: new BunyanStream()
    } as Stream
  ],
  args: {},
  context: {}
  // TODO: add version info, or any other info
};

const bunyanLogger = bunyan.createLogger(loggerOptions);

export default bunyanLogger;
