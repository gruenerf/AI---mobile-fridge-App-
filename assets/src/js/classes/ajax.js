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

})(jQuery);