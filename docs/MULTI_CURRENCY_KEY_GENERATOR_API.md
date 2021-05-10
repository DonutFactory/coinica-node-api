# API ROUTES FOR MULTI-CURRENCY (KEY PAIR GENERATOR)
<br />
<br />

**ADDRESS GENERATOR**
----
Generates address, private key, and public key for BTC, ETH and USDC.

* **URL** <br />
  `/multi-currency/v1/generate_keypairs`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "coin": "btc" [AVALIABLE COIN GENERATORS: "btc", "eth", "usdc"]
	  }
   ```

* **Success Response:**
  ```json
    {
      "currency": "BTC",
      "address": "1BnoygUdoWfzjDck8mUSYrGAABZCfU3Fh7",
      "privateKey": "L2dCN7gB8dgV8q9saKfeKrAxtTvkcqqy21Ygz3tj9qgKrrKvaWJz",
      "publicKey": "0221f0d56e22673cb0a347c1be93d1a35defd4e67a3b2b7748e291e5d381521339"
    }
  ```
<br />
