# API ROUTES (MAHJONG HI-LO)
<br />
<br />

**GET_TABLE**
----
Get user mahjong hi-lo data

* **URL** <br />
  `/mahjong-hilo/get-table`

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

**START_GAME**
----
Initialize mahjong hi-lo data for user

* **URL** <br />
  `/mahjong-hilo/start`

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

**ADD_BET**
----
Add's funds to the user's bet pool

* **URL** <br />
  `/mahjong-hilo/addbet`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "quantity": "<QUANTITY>"
	  }
   ```

<br />
<br />

**BET_TOKEN**
----
Applies the user's bet to the game

* **URL** <br />
  `/mahjong-hilo/startbet`

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

**PLAY_HILO**
----
The user plays Hi-Lo and selects whether to bet 'High', 'Low', or 'Draw'

* **URL** <br />
  `/mahjong-hilo/startbet`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "option": "<OPTION>"
	  }
   ```

<br />
<br />


**DISCARD_TILE**
----
Discard a tile from hand

* **URL** <br />
  `/mahjong-hilo/discard-tile`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "idx": "<CARD_ID>"
	  }
   ```

<br />
<br />

**DECLARE_KONG**
----
Declare kong when the user has the right tiles on hand

* **URL** <br />
  `/mahjong-hilo/declare-kong`

* **Method:** <br />
  `POST`

*  **BODY Params** <br />
    ```text
	  {
	    "id" "<USER_GAME_ID>",
      "idx": "<KONG_TILES>"
	  }
   ```

<br />
<br />

**DECLARE_WIN_HAND**
----
Declare Win

* **URL** <br />
  `/mahjong-hilo/declare-win-hand`

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

**END_GAME**
----
End current game

* **URL** <br />
  `/mahjong-hilo/end`

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

**RESET_GAME**
----
Reset the game

* **URL** <br />
  `/mahjong-hilo/reset`

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