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

export default async function (opts = {
  serverUrl: 'http://localhost:5341',
  messageTemplate: '{message}',
  createLogger: loggerOpts => new seq.Logger(loggerOpts)
}) {
  const { serverUrl, messageTemplate, createLogger } = opts
  const logger = createLogger({ serverUrl })

  return build(async function (source) {
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
  }, {
    async close(err) {

    }
  })
}
