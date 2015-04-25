/**
 * This file handels recipe calendar and so on
 *
 * @class recipe
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */


/**
 * TODO function, that easch time the app start updates local storage regarding old recipes
 */

var recipe = (function ($) {

	/**
	 * Defines a recipe object
	 * @param id
	 * @param date
	 * @param name
	 */
	function Recipe(id, date, name) {
		this.id = id;
		this.date = date;
		this.name = name;
	}

	/**
	 * Get recipe Array out of local storage
	 * @returns {Array}
	 */
	function retrieveRecipes() {
		var storageString = localStorage.recipes;
		var splitString = storageString.split(";");
		var storageArray = [];
		for (var i = 0; i < splitString.length; i++) {
			if (splitString[i] !== '') {
				storageArray.push(getJson(splitString[i]));
			}
		}
		return storageArray;
	}

	/**
	 * Transfers object to json
	 * @param object
	 * @returns {*}
	 */
	function toJson(object) {
		return JSON.stringify(object);
	}

	/**
	 * Returns parsed Json
	 * @param object
	 * @returns {*}
	 */
	function getJson(object) {
		return JSON.parse(object);
	}

	/**
	 * Initializing function
	 */
	function addNew() {
		$('#addNew').click(function () {
			var date = $('#calendar').val();
			var recipe = $("#select_recipe").val();
			if (date !== undefined && recipe !== null) {
				var counter = localStorage.recipes !== undefined ? retrieveRecipes()[retrieveRecipes().length - 1].id : 0;
				var object = new Recipe(++counter, date, recipe);
				localStorage.recipes = localStorage.recipes === undefined ? '' : localStorage.recipes;
				localStorage.recipes += toJson(object) + ';';
				ajax.loadRecipes();
			}
			else {
				$("#add_new_error").empty().append("Fill out both fields.");
			}
		});
	}

	/**
	 * Returns all Recipes
	 */
	function getAllRecipes() {
		var recipeArray = retrieveRecipes();
		var string = "";

		if (recipeArray.length) {
			string += "<tr>" +
			"<td>Recipe</td>" +
			"<td>Date</td>" +
			"<td>Delete</td>" +
			"</tr>";
			for (var i = 0; i < recipeArray.length; i++) {
				string += "<tr class='recipe_item'>" +
				"<td class='item_name'>" + recipeArray[i].name + "</td>" +
				"<td class='item_date'>" + recipeArray[i].date + "</td>" +
				"<td class='item_delete' data-id='" + recipeArray[i].id + "'>delete</td>" +
				"</tr>";
			}
		} else {
			string = "<tr class='no_items'>" +
			"<td>Currently no recipes.</td>" +
			"</tr>";
		}

		$(".recipe_list").append(string);
	}

	/**
	 * Deletes a Recipe with a certian id out of json in localstorage
	 */
	function deleteRecipe() {
		$(".item_delete").click(function () {
			var id = $(this).data("id");
			var recipeArray = retrieveRecipes();

			if (recipeArray.length) {
				recipeArray = $.grep(recipeArray, function (n, i) {
					return n.id !== id;
				});
			}

			localStorage.removeItem('recipes');
			localStorage.recipes = '';

			if (recipeArray.length) {
				for (var i = 0; i < recipeArray.length; i++) {
					localStorage.recipes += toJson(recipeArray[i]) + ';';
				}
			}

			ajax.loadRecipes();
		});
	}


	return {
		init: function () {
		},
		addNew: function () {
			addNew();
		},
		recipe: function () {
			getAllRecipes();
			deleteRecipe();
		},
		getAll: function () {
			return retrieveRecipes();
		}
	};
})(jQuery);