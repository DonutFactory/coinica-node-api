# API ROUTES FOR ETHERSCAN

<br />
<br />

## **Get transaction hash status**

returns the status of a specific transaction hash

- **URL** <br />
  `/etherscan/txhash-status`

- **Method:** <br />
  `GET`

- **BODY Params** <br />
  ```text
   {
     "username: "johndoe",
     "txhash": "0xb325049f5b91851a0a5c88043035cc735bcdb5476f46ad313b4c06c2d5857977"
   }
  ```
- **Success Response:**
  Note: isError":"0" = Pass , isError":"1" = Error
  ```json
  {
    "username": "johndoe",
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "blockHash": "0xab644ff473ebc76c5b738194bab1fb29bc729ee1a248037678e6ffcf4790ee26",
      "blockNumber": "0xbf1464",
      "from": "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740",
      "gas": "0x5208",
      "gasPrice": "0x737be7600",
      "hash": "0x129f7f9f6f5d8a02a12babba83ff476d829410f4684ed1c9bdda5722a22d509f",
      "input": "0x",
      "nonce": "0x4dfe0",
      "to": "0x43a0f7c69388b5880fb7e30c6e9999c83f9290c6",
      "transactionIndex": "0x70",
      "value": "0x5d91caf72661800",
      "type": "0x0",
      "v": "0x25",
      "r": "0x68fd9c3c5f5dd6c8ac3c11090a48a89b5775bb1998ee119a242a6c4de29c9f2f",
      "s": "0x1fdd07d8eee630cb646fdb1d917a982e61236376f2138488efad5f45e58e5b00"
    }
  }
  ```
