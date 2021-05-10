**GET COINS**
----
Returns list of all supported deposit coins.

* **URL** <br />
  `/multi-currency/v1/coins`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
  `{}`

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/coins",
      method : "post",
      headers,
      data: {}
    });
  ```

* **Success Response:**
  ```json
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
      ...
    ]
  ```
<br />
<br />

**SUPPORTED PAIRS**
----
Returns list of all supported destination coins for the coin symbol.

* **URL** <br />
  `/multi-currency/v1/supported-pairs`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```json
	  {
	    coin_symbol: <symbol from get `GET COINS` api response>
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/supported-pairs",
      method : "post",
      headers,
      data: { coin_symbol: "btc" }
    });
  ```

* **Success Response:**
  ```json
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
      ...
    ]
  ```
<br />
<br />

**SUPPORTED DEPOSIT COINS**
----
Returns list of all supported deposit coins for the coin symbol.

* **URL** <br />
  `/multi-currency/v1/supported-deposit-coins`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
  	```json
	  {
	    coin_symbol: <symbol from get `GET COINS` api response>
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/supported-deposit-coins",
      method : "post",
      headers,
      data: { coin_symbol: "btc" }
    });
  ```

* **Success Response:**
  ```json
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
      ...
    ]
  ```
<br />
<br />

**LIMITS**
----
Get max and min limit of deposit coin allowed by `ORDER` or `OFFER` api.

* **URL** <br />
  `/multi-currency/v1/exchange-limit`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
	```json
	  {
	    depositCoin: <symbol from get `GET COINS` api response>
	    destinationCoin: <symbol from get `GET COINS` api response>
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/exchange-limit`",
      method : "post",
      headers,
      data: {
			depositCoin: "btc",
			destinationCoin: "eth"
      }
    });
  ```

* **Success Response:**
  ```json
    {
	    "depositCoin": "btc",
	    "destinationCoin": "eth",
	    "depositCoinMinAmount": 0.0001,
	    "depositCoinMaxAmount": 0.0849
	}
  ```
<br />
<br />
