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
     "txhash": "0xb325049f5b91851a0a5c88043035cc735bcdb5476f46ad313b4c06c2d5857977"
   }
  ```
- **Success Response:**
  Note: isError":"0" = Pass , isError":"1" = Error
  ```json
    {
    "status": "1",
    "message": "OK",
    "result": {
        "isError": "1",
        "errDescription": "Out of gas"
    }
  ```
