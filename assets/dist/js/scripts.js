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
			});
		});

		body.on('click', "#fridge", function () {
			content.load("view/fridge.html", function () {
			});
		});

		body.on('click', "#shoppinglist", function () {
			content.load("view/shoppinglist.html", function () {
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
 * This file handels requests by views
 *
 * @class controller
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var controller = (function ($) {

	function init() {
		var content = $("#content");

		content.on("change", "#fridge_list", function(){
			var fridgeItems = websocket.getFridgeItems();
			var json = JSON.parse(fridgeItems);

		});
	}

	return {
		init: function () {
			init();
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

})(jQuery);;/**
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