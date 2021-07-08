# API ROUTES (GHOST QUEST)
<br />
<br />

**GET USER DATA**
----
Returns user's data for ghost quest

* **URL** <br />
  `/ghostquest/get_table`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id": "<USER_GAME_ID>"
	  }
   ```

<br />
<br />

**INITIALIZE USER DATA**
----
Add user to Ghostquest table data

* **URL** <br />
  `/ghostquest/initialize`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id": "<USER_GAME_ID>",
	    "username": "<USERNAME>"
	  }
   ```

<br />
<br />

**GENERATE CHARACTERS**
----
Summons ghost character

* **URL** <br />
  `/ghostquest/summon_ghost`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id": "<USER_GAME_ID>",
	    "username" "<USERNAME>",
	    "quantity": "<NUM_OF_GHOST_TO_SUMMON: Ranges from 1 to 50>",
	    "limit": "<BATTLE_LIMIT_OPTIONS: 10, 50, 100"
	  }
   ```

<br />
<br />

**ADD LIFE**
----
Add life on a specific ghost (DEPOSIT)

* **URL** <br />
  `/ghostquest/add_life`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id": "<USER_GAME_ID>",
	    "key": "<GHOST_KEY>"
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
	    "id": "<USER_GAME_ID>",
	    "key": "<GHOST_KEY>"
	  }
   ```

<br />
<br />

**WITHDRAW GHPST**
----
Withdraw specific ghost

* **URL** <br />
  `/ghostquest/withdraw`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id": "<USER_GAME_ID>",
	    "key": "<GHOST_KEY>"
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
	    "winner": { "first": "<WINNER_GHOST_KEY>", "second": "<WINNER_USER_ID>"},
	    "loser": { "first": "<LOSER_GHOST_KEY>", "second": "<LOSER_USER_ID>"}
	  }
   ```

<br />
<br />
