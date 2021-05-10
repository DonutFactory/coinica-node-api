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
    ```text
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
  	```text
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
	```text
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

**GENERATE OFFER**
----
View offers available for the currency pair. \
DepositAmount must be inside the limit specified by `LIMITS` api. \
OfferReferenceId is required to create order and is valid for 10 minutes.

* **URL** <br />
  `/multi-currency/v1/generate-offer`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
	```text
	  {
      depositCoin: <`depositCoin` from get `LIMITS` api response>,
      destinationCoin: <`destinationCoin` from get `LIMITS` api response>
      depositCoinAmount: <range value from `depositCoinMinAmount` & `depositCoinMaxAmount` data from `LIMITS` api response>
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/generate-offer`",
      method : "post",
      headers,
      data: {
        depositCoin: "btc",
        destinationCoin: "eth",
        depositCoinAmount: 0.0849
      }
    });
  ```

* **Success Response:**
  ```json
    {
      depositCoin: "btc",
      destinationCoin: "eth",
      depositCoinAmount: 0.0849,
      destinationCoinAmount: 1.18331,
      offerReferenceId: "V30FYMUHC4UQ"
    }
  ```
<br />
<br />

