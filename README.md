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
    target: '@autotelic/pino-seq-transport'
  }
})
```
