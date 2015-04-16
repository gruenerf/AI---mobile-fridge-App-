/**
 * This file handels ajax calls
 *
 * @class ajax
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var ajax = (function ($) {

	/**
	 * Initializing function, loads initial view
	 */
	function init() {
		var content = $("#content");
		content.load("view/home.html");
	}

	/**
	 * Function that binds ajax calls to click
	 */
	function reload() {

		var content = $("#content");
		var body = $("body");

		body.on('click', "#home", function () {
			content.load("view/home.html", function () {

			});
		});

		body.on('click', "#recipes", function () {
			content.load("view/recipes.html", function () {
				websocket.getRecipes();
			});
		});

		body.on('click', "#fridge", function () {
			content.load("view/fridge.html", function () {
				websocket.getFridgeItems();
			});
		});

		body.on('click', "#shoppinglist", function () {
			content.load("view/shoppinglist.html", function () {
				websocket.getShoppingList();
			});
		});
	}

	return {
		init: function () {
			init();
			reload();
		}
	};

})(jQuery);;/**
 * This file handels all calls to the websocket
 *
 * @class ajax
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var websocket = (function ($) {

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
		con.getInstance().onmessage = function (msg) {
			var recipe_list = $("#select_recipe");
			var string = "";

			var response = JSON.parse(msg.data);
			var recipes = response.recipes;

			console.log(recipes);
			for (var i = 0; i < recipes.length; i++) {
				string += "<option value=" + recipes[i].name + " >" + recipes[i].name + "</option>";
			}

			//TODO if empty make other string
			recipe_list.append(string);
		};
	}

	/**
	 * Returns the server Response with all current fridge items
	 */
	function getFridgeItems() {
		con.getInstance().send(JSON.stringify({'get': 'fridgeItems'}));
		con.getInstance().onmessage = function (msg) {
			var fridge_list = $("#fridge_list");
			var string = "";

			var response = JSON.parse(msg.data);
			var fridgeItems = response.fridgeItems;

			for (var i = 0; i < fridgeItems.length; i++) {
				string += "<li>" +
				"<div class='item_name'>" + fridgeItems[i].name + "</div>" +
				"<div class='item_percentage'>" + fridgeItems[i].percentage + "</div>" +
				"<div class='item_size'>" + fridgeItems[i].size + "</div>" +
				"</li>";
			}

			fridge_list.append(string);
		};
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

})
(jQuery);;/**
 * This file initializes div classes
 *
 * @class main
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var main = function ( $ ) {

	/* *************************************
	 * Public Functions / Initialization
	 * *************************************/

	return {
		init : function() {
			ajax.init();
			websocket.init();
		}
	};

}( jQuery );


jQuery(document).ready(function() {
	main.init();
});