** GET COINS **
----
Returns list of all supported deposit coins.

* **URL**
  /multi-currency/v1/coins

* **Method:**
  `POST`

*  **BODY Params**
  NONE

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `
      [
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
      ]
    `

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/coins",
      method : "post",
      headers: {},
      data: {}
    });
  ```
