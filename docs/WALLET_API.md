<br />
<br />

## **Withdraw ETH/USDC**

withdraw assets from EGS wallet

- **URL for ETH** <br />
  `/wallet/withdraw-eth`
- **URL for USDC** <br />
  `/wallet/withdraw-usdc`

- **Method:** <br />
  `POST`

- **BODY Params** <br />
  ```text
   {
     "address": "<ERC20_ADDRESS_(STRING)>",
     "value": "<VALUE_TO_BE_WITHDRAWN_(STRING)>",
     "gasPrice": "<GAS_PRICE_IN_WEI>"
   }
  ```
- **Success Response:**
  ```json
  {
    "error": false,
    "message": "success",
    "tx_hash": "<TRANSACTION_HASH>",
  }
  ```
  