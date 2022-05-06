import test from 'ava'
import sinon from 'sinon'
import { Readable } from 'stream'
import createTransport, { logProcessorFactory } from './index.js'

test('build transport', async t => {
  const logger = sinon.spy()
  const createLogger = sinon.stub().returns(logger)
  const build = sinon.spy()
  const logProcessor = () => {}
  const logProcessorFactorySpy = sinon.stub().returns(logProcessor)
  const serverUrl = 'http://localhost:5341'

  const transport = createTransport({
    serverUrl,
    messageTemplate: '{message}',
    createLogger,
    build,
    logProcessorFactory: logProcessorFactorySpy
  })

  t.true(createLogger.calledOnceWith({ serverUrl }))
  t.true(logProcessorFactorySpy.calledOnceWith(logger, '{message}'))
  t.true(build.calledOnceWith(logProcessor))
})

test('logProcessorFactory', async t => {
  const logger = {
    emit: sinon.spy()
  }
  const time = 1651855435039
  const timestamp = new Date(1651855435039)
  const message = 'a log message'
  const messageTemplate = '{message}'
  const stack = {}
  const logProcessor = logProcessorFactory(logger, messageTemplate)
  const source = Readable.from([{
    time,
    level: 30,
    msg: message,
    stack,
  }])

  await logProcessor(source)

  t.true(logger.emit.calledOnceWith({
    timestamp,
    level: 'INFO',
    messageTemplate,
    properties: {
      message,
    },
    exception: stack
  }))
})
