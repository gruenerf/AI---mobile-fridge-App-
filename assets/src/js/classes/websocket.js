/**
 * This file handels all calls to the websocket
 *
 * @class ajax
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var websocket = (function ($) {

	var alle;

	/**
	 * Singleton instance of websocket connection
	 */
	var con = (function () {
		var con;

		function createInstance() {
			var con = new WebSocket('ws://128.39.82.37:9999/ws');
			return con;
		}

		return {
			getInstance: function () {
				if (!con) {
					con = createInstance();
				}
				return con;
			}
		};
	})();

	/**
	 * Initializing function, logs when connection is established
	 */
	function init() {
		con.getInstance().onmessage = function (msg) {
			return msg.data;
		};
	}

	/**
	 * Returns the server Response with all recipes
	 */
	function getRecipes() {
		con.getInstance().send(JSON.stringify({'get': 'recipes'}));
		con.getInstance().onmessage = function(msg){
			var response = msg.data;
			var json = JSON.parse(response);

			return json;
		};

		return con.getInstance().onmessage;
	}

	/**
	 * Returns the server Response with all current fridge items
	 */
	function getFridgeItems() {
		con.getInstance().send(JSON.stringify({'get': 'fridgeItems'}));
	}

	/**
	 * Returns the server Response with the current shoppinglist
	 */
	function getShoppingList() {
		// Read localstorage for recipes TODO make them out of localstorage

		var names = ["asd", "asdasdasd", "hurrs"];
		var recipes = [];

		names.forEach(function (name) {
				var array = {};
				array.name = name;
				recipes.push(array);
			}
		);

		var recipeString = JSON.stringify({"get": "shoppingList", "recipes": recipes});

		con.getInstance().send(recipeString);
		return con.getInstance().onmessage(msg);
	}

	return {
		init: function () {
			init();
		},

		getRecipes: function () {
			return getRecipes();
		},

		getFridgeItems: function () {
			return getFridgeItems();
		},

		getShoppingList: function () {
			return getShoppingList();
		}
	};

})(jQuery);