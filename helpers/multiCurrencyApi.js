const IS_DEV = process.env.NODE_ENV !== 'production'
const HOST = IS_DEV ? process.env.COINSWITCH_ENDPOINT_DEV : process.env.COINSWITCH_ENDPOINT_PROD
const VERSION = 'v1'
const BASE = `${HOST}/${VERSION}`

module.exports = {
  VERSION: () => VERSION,
  COINS: () => `${BASE}/coins`,
  SUPPORTED_PAIRS: (coin_symbol) => `${BASE}/coins/${coin_symbol}/destination-coins`,
  SUPPORTED_DEPOSIT_COINS: (coin_symbol) => `${BASE}/coins/${coin_symbol}/deposit-coins`,
  LIMIT: () => `${BASE}/limit`,
  OFFER: () => `${BASE}/offer`,
  ORDER: () => `${BASE}/order`, 
  GET_ORDER: (id) => `${BASE}/order/${id}`,
  ORDERS_LIST: (start=0, count=25, id="") => {
    return `${BASE}/orders?start=${start}&count=${count}&userReferenceId=${id}`
  }
}