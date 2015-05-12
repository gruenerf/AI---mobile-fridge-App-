/**
 * Settings
 *
 * @class settings
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */


var settings = (function ($) {


	/**
	 * Initializing function
	 */
	function init() {
		if (localStorage.days) {
			localStorage.days = localStorage.days === undefined ? 7 : localStorage.days;
		}
		else {
			localStorage.days = 7;
		}
	}

	/**
	 * Set number of days when clicked on save
	 */
	function setSettings() {
		$("#number_input").val(localStorage.days);

		$("#settings_save").click(function () {
			localStorage.days = $("#number_input").val();
			ajax.loadSettings();
		});
	}

	/**
	 * Prints out notification when successfully updated
	 */
	function update() {
		$("#settings_notification").empty().append("Number of days updated.");
	}


	return {
		init: function () {
			init();
		},
		setSettings: function () {
			setSettings();
		},
		update: function () {
			update();
		}
	};
})(jQuery);