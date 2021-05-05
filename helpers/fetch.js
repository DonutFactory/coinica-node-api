const fetch = require('node-fetch');
const IS_DEV = process.env.NODE_ENV !== 'production';
const API_KEY = IS_DEV ? process.env.API_KEY_DEV : process.env.API_KEY_PROD;
const USER_IP = '1.1.1.1'

const headers = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const get = (uri, options = {}, userIp) => {
  return fetch(uri, {
    method: 'GET',
    headers: {
      ...headers,
      'x-user-ip': userIp || USER_IP, // USER_IP IS FOR DEV ONLY
    },
    ...options
  })
}

const post = (uri, body, userIp) => {
  return fetch(uri, {
    method: 'post',
    headers: {
      ...headers,
      'x-user-ip': userIp || USER_IP, // USER_IP IS FOR DEV ONLY
    },
    body: JSON.stringify(body)
  })
}

module.exports = { get, post }