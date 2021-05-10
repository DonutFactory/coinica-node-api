# API ROUTES FOR MULTI-CURRENCY (COINSWITCH)
<br />
<br />

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
      url: BASE_URL + "/multi-currency/v1/exchange-limit",
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
OfferReferenceId is required to create `ORDER` and is valid for 10 minutes.

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
      url: BASE_URL + "/multi-currency/v1/generate-offer",
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
      "depositCoin": "btc",
      "destinationCoin": "eth",
      "depositCoinAmount": 0.0849,
      "destinationCoinAmount": 1.18331,
      "offerReferenceId": "V30FYMUHC4UQ"
    }
  ```
<br />
<br />

**CREATE ORDER**
----
Create `ORDER` from `OFFER` api.

* **URL** <br />
  `/multi-currency/v1/make-order`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
	```text
	  {
      transaction: {
          depositCoin: <string, required> [`depositCoin` from `GENERATE OFFER` api response]
          destinationCoin: <string, required> [`destinationCoin` from `GENERATE OFFER` api response]
          depositCoinAmount: <number, required> [`depositCoinAmount` from `GENERATE OFFER` api response]
          destinationAddress: {
            address: <string, required>
            tag: <string, optional>
          },
          refundAddress: {
            address: <string, required>
            tag: <string, optional>
          },
          userReferenceId: <string, required>
          offerReferenceId": <string, required> [`offerReferenceId` from `GENERATE OFFER` api response]
      }
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/make-order",
      method : "post",
      headers,
      data: {
        transaction: {
          depositCoin: "btc",
          destinationCoin: "eth",
          depositCoinAmount: 0.0849,
          destinationAddress: {
            address: "destinationAddress_here",
            tag: ""
          },
          refundAddress: {
            address: "refundAddress_here",
            tag: ""
          },
          userReferenceId: "userReferenceId_here",
          offerReferenceId: "V30FYMUHC4UQ"
        }
      }
    });
  ```

* **Success Response:**
  ```json
    {
      "orderId": "11111111-6c9e-4c53-9a6d-55e089aebd04",
      "exchangeAddress": {
        "address": "MOCKED-EXCHANGE-DEPOSIT-ADDRESS",
        "tag": null
      }
    }
  ```
<br />
<br />

**ORDER STATUS**
----
Returns status for that specific `orderId` from `CREATE ORDER` api.

* **URL** <br />
  `/multi-currency/v1/order`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
	```text
	  {
        orderId: <string> [`orderId` from `CREATE ORDER` api response]
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/order",
      method : "post",
      headers,
      data: {
        orderId: "11111111-6c9e-4c53-9a6d-55e089aebd04"
      }
    });
  ```

* **Success Response:**
  ```json
    {
      "orderId": "11111111-6c9e-4c53-9a6d-55e089aebd04",
      "exchangeAddress": {
        "address": "MOCKED-EXCHANGE-DEPOSIT-ADDRESS",
        "tag": null
      },
      "destinationAddress": {
        "address": "MOCKED-DESTINATION-COIN-ADDRESS",
        "tag": null
      },
      "createdAt": 1531420776000,
      "status": "timeout",
      "inputTransactionHash": null,
      "outputTransactionHash": null,
      "depositCoin": "ltc",
      "destinationCoin": "btc",
      "depositCoinAmount": null,
      "destinationCoinAmount": null,
      "validTill": "1531463976000",
      "userReferenceId": "1"
    }
  ```
<br />
<br />

**LIST OF ORDERS**
----
Returns list of client orders in paginated format.

* **URL** <br />
  `/multi-currency/v1/orders`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
	```text
	  {
        start: <int, optional, default = 0> 
        count: <int, optional, default = 25> 
        userRefId: <string, optional> (Optional parameter to filter orders for that userReferenceId)
	  }
   ```

* **Sample Call:**
  ```javascript
    axios({
      url: BASE_URL + "/multi-currency/v1/orders",
      method : "post",
      headers,
      data: {
        start: 0,
        count: 25,
        userRefId: ""
      }
    });
  ```

* **Success Response:**
  ```json
    {
      "count": 25,
      "items": [
        {
          "orderId": "c526ae9b-f481-4015-b362-369f4880ed3c",
          "exchangeAddress": {
            "address": "rMvo4VQoutQm3P1eMXghcXrTdHNxxUTU3X",
            "tag": "160910"
          },
          "destinationAddress": {
            "address": "LWzvV5f5fQuNiX5XobR8bMXdf355f3Bz4H",
            "tag": null
          },
          "createdAt": 1592483554382,
          "status": "timeout",
          "inputTransactionHash": null,
          "outputTransactionHash": null,
          "depositCoin": "xrp",
          "destinationCoin": "ltc",
          "depositCoinAmount": null,
          "destinationCoinAmount": null,
          "validTill": 1592526754382,
          "userReferenceId": null,
          "callbackUrl": ""
        },  
        +{...},
        +{...},
      ]
    }
  ```
<br />
