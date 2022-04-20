import { logger } from './logger.service';

function getMemoryUsage() {
  const used = process.memoryUsage();
  const result = {};
  for (const key in used) {
    if (used.hasOwnProperty(key)) {
      result[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
    }
  }
  return result;
}

export interface ExecutionTimeLoggerParams {
  warningThresholdMs: number;
  errorThresholdMs: number;
  showMemory: boolean;
}

export function ExecutionTimeLogger({
  warningThresholdMs = null,
  errorThresholdMs = null,
  showMemory = false
}: ExecutionTimeLoggerParams): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = +Date.now();

      let result;
      try {
        result = await originalMethod.apply(this, args);
      } catch (error) {
        throw error;
      } finally {
        const time = +Date.now() - start;
        const message = 'Execution time';

        const logArgs: any = {
          time: `${time} ms`,
          className: target.constructor.name,
          methodName: key,
          warningThresholdMs,
          errorThresholdMs
        };

        if (showMemory) {
          logArgs.memory = getMemoryUsage();
        }

        if (errorThresholdMs && time > errorThresholdMs) {
          logger.error(message, logArgs);
        } else if (warningThresholdMs && time > warningThresholdMs) {
          logger.warn(message, logArgs);
        } else {
          logger.debug(message, logArgs);
        }
      }

      return result;
    };

    return descriptor;
  };
}
