/**
 * This file handels recipe calendar and so on
 *
 * @class recipe
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
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

	function toJson(object) {
		return JSON.stringify(object);
	}

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

	function getAllRecipes() {
		var recipeArray = retrieveRecipes();
		var string = "";

		if (recipeArray.length) {
			for (var i = 0; i < recipeArray.length; i++) {
				string += "<div class='recipe_item'>" +
				"<div class='item_name'>" + recipeArray[i].name + "</div>" +
				"<div class='item_date'>" + recipeArray[i].date + "</div>" +
				"<div class='delete' data-id='" + recipeArray[i].id + "'>delete</div>" +
				"</div>";
			}
		} else {
			string = "<div class='recipe_item'>" +
			"<div class='item_name'>Currently no recipes.</div>" +
			"</div>";
		}

		$(".recipe_list").append(string);
	}


	return {
		init: function () {

		},
		addNew: function () {
			addNew();
		},
		getAll: function () {
			getAllRecipes();
		}
	};
})(jQuery);