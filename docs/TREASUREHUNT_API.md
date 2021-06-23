# API ROUTES (GHOST QUEST)
<br />
<br />

**GAME START**
----
Start initialized game from treasurehunt

* **URL** <br />
  `/treasurehunt/gamestart`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
	    "quantity": "<SELECTED_MAP_PRICE>"
	  }
   ```

<br />
<br />

**WITHDRAW**
----
Withdraw treasurehunt winnings

* **URL** <br />
  `/treasurehunt/withdraw`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
	  }
   ```

<br />
<br />
