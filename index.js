import build from 'pino-abstract-transport'
import seq from 'seq-logging'

const LEVEL_NAMES = {
  10: 'TRACE',
  20: 'DEBUG',
  30: 'INFO',
  40: 'WARN',
  50: 'ERROR',
  60: 'FATAL'
}

export const logProcessorFactory = function (logger, messageTemplate) {
  return async function (source) {
    for await (let obj of source) {
      const { time, level, msg, err, error, stack, ...props } = obj
      const { message: errMessage, stack: errStack, ...errorProps } = err || error || {}
      const forSeq = {
        timestamp: new Date(time),
        level: LEVEL_NAMES[level],
        messageTemplate,
        properties: { message: msg ? msg : errMessage, ...errorProps, ...props },
        exception: stack ? stack : errStack
      }
      logger.emit(forSeq)
    }
  }
}

const defaultOpts = {
  loggerOpts: {
    serverUrl: 'http://localhost:5341',
  },
  messageTemplate: '{message}',
  createLogger: loggerOpts => new seq.Logger(loggerOpts),
  build,
  logProcessorFactory,
}

export default async function (opts = defaultOpts) {
  const {
    loggerOpts,
    messageTemplate,
    createLogger,
    build,
    logProcessorFactory
  } = {
    ...defaultOpts,
    ...opts
  }
  const logger = createLogger(loggerOpts)
  return build(logProcessorFactory(logger, messageTemplate))
}
