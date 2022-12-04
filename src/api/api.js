const key = import.meta.env.VITE_API_KEY
const ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${key}`)

const updatesHandlers = {}

const sendToSocket = (msg) => {
  if (!msg) {
    return
  }

  if (ws.readyState !== WebSocket.OPEN) {
    ws.addEventListener(
      'open',
      () => {
        ws.send(JSON.stringify(msg))
      },
      { once: true }
    )
  }

  return ws.send(JSON.stringify(msg))
}

const onSocketMsg = (msg) => {
  const UPDATE_TYPE = 2

  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: price,
    PARAMETER: param,
  } = JSON.parse(msg.data)

  if (UPDATE_TYPE === type) {
    const activeHandlers = updatesHandlers[currency] || []

    activeHandlers.map((handler) => handler(price))
  }
}

const subscribeToUpdates = (currency, cb) => {
  const msg = {
    action: 'SubAdd',
    subs: [`2~Binance~${currency}~${'USDT'}`],
  }

  if (!updatesHandlers[currency]) {
    updatesHandlers[currency] = []
  }

  updatesHandlers[currency].push(cb)

  sendToSocket(msg)
}

export const someFun = () => {
  ws.addEventListener('message', onSocketMsg)

  subscribeToUpdates('BTC', (price) => {
    console.log('BTC price is ' + price)
  })
}
