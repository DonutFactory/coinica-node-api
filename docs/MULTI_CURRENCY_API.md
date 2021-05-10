**GET COINS**
----
Returns list of all supported deposit coins.

* **URL** <br />
  /multi-currency/v1/coins

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
  `{}`

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/coins",
      method : "post",
      headers: {},
      data: {}
    });
  ```

* **Success Response:**
  ```[
    {
      "symbol": "bnb",
      "name": "Binance Coin",
      "isActive": true
    },
    {
      "symbol": "xrp",
      "name": "Ripple",
      "isActive": true
    },
    {...},
    {...},
    +...
  ]```
