# @autotelic/pino-seq-transport

A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to send events to [Seq](https://datalust.co/seq)

## Installation

```
npm install --save @autotelic/pino-seq-transport
```

## Usage

```js
import pino from 'pino'

const logger = pino({
  transport: {
    target: '@autotelic/pino-seq-transport',
    options: {
      loggerOpts: {
        serverUrl: 'http://localhost:5341'
      }
    }
  }
})
```

`loggerOpts` are passed through to `seq.Logger()` from [`seq-logging`](https://github.com/datalust/seq-logging)
