# API ROUTES (GHOST QUEST)

**GENERATE CHARACTERS**
----
Generates character for ghost quest

* **URL** <br />
  `/ghostquest/gen_char`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "username" "user3",
      "amount": 1,
      "battleLimit": 10
	  }
   ```

<br />
<br />

**ADD LIFE**
----
Adding life on a specific ghost (DEPOSIT)

* **URL** <br />
  `/ghostquest/add_life`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "username": "user3",
	    "ghost_id": "a03557a52f5586a930eb898a1ea8022"
	  }
   ```

<br />
<br />

**GET TABLE**
----
Returns table data from smart contract

* **URL** <br />
  `/ghostquest/get_table`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "code" -> req.code,
      "table" -> req.table,
      "scope" -> req.scope,
      "index_position" -> req.index_position.getOrElse(null),
      "key_type" -> req.key_type.getOrElse(null),
      "encode_type" -> req.encode_type.getOrElse(null),
      "upper_bound" -> req.upper_bound.getOrElse(null),
      "lower_bound" -> req.lower_bound.getOrElse(null),
      "json" -> true, // add this to format result into JSON
      "limit" -> 10, // set max result to 250 active users per request
      "show_payer" -> false
	  }
   ```

<br />
<br />

**ELIMINATE**
----
Eliminates ghost (remove ghost from IN-BATTLE category)

* **URL** <br />
  `/ghostquest/eliminate`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "username": "user3",
	    "ghost_id": "a03557a52f5586a930eb898a1ea8022"
	  }
   ```

<br />
<br />

**BATTLE RESULT**
----
Eliminates ghost (remove ghost from IN-BATTLE category)

* **URL** <br />
  `/ghostquest/battle_result`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "gameid": "ec94f6b3-a9a0-4d0f-ab99-649af23ab328",
      "winner": { "first": "f756f6bfddf724a4919bb1f82d2fa332", "second": "user1"},
      "loser": { "first": "88ef9b0ddb53535282871125a9b38c21", "second": "user2"}
	  }
   ```

<br />
<br />
