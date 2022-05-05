import test from 'ava'
import sinon from 'sinon'
import createTransport from './index.js'

test('send log message to seq', async t => {
  const logger = sinon.stub()
  const createLogger = sinon.stub().returns(logger)
  const serverUrl = 'http://localhost:5341'
  const transport = createTransport({
    serverUrl,
    messageTemplate: '{message}',
    createLogger,
  })

  t.true(createLogger.calledOnceWith({ serverUrl }))
})
