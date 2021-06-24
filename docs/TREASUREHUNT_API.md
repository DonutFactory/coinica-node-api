# API ROUTES (TREASUREHUNT)
<br />
<br />

**TH_ACTION_GET_USER_DATA**
----
Get user treasurehunt data

* **URL** <br />
  `/treasurehunt/get_data`

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

**TH_ACTION_GAME_START**
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

**TH_ACTION_WITHDRAW_GAME**
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

**TH_ACTION_INITIALIZE_GAME**
----
Initialize treasurehunt data for user

* **URL** <br />
  `/treasurehunt/initialize`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
	  }
   ```

<br />
<br />

**TH_ACTION_REMOVE_EXISTING_GAME**
----
Remove existing treasurehunt data on user

* **URL** <br />
  `/treasurehunt/end`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
	  }
   ```

<br />
<br />

**TH_ACTION_SET_GAME_PANEL**
----
Set panel data

* **URL** <br />
  `/treasurehunt/setpanel`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
	  }
   ```

<br />
<br />

**TH_ACTION_SET_DESTINATION**
----
Set destination data

* **URL** <br />
  `/treasurehunt/destination`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
      "destination": "<MAP_PRICE (options: 1, 10, 20)"
	  }
   ```

<br />
<br />

**TH_ACTION_SET_ENEMY**
----
Set enemy count data

* **URL** <br />
  `/treasurehunt/setenemy`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
      "enemy_count": "<ENEMY_COUNT (range: 1 - 15)"
	  }
   ```

<br />
<br />

**TH_ACTION_OPEN_TILE**
----
Open tile

* **URL** <br />
  `/treasurehunt/opentile`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
      "index": "<TILE_INDEX>"
	  }
   ```

<br />
<br />

**TH_ACTION_AUTOPLAY_OPT**
----
Play TH autoplay mode

* **URL** <br />
  `/treasurehunt/autoplay`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "username": "<USER_GAME_NAME>"
      "panelset": "<PANELS_TO_BE_OPENED>"
	  }
   ```

<br />
<br />
