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
		localStorage.days = localStorage.days === undefined ? 7 : localStorage.days;
	}

	/**
	 * Set number of days when clicked on save
	 */
	function setSettings() {
		$("#number_input").val(localStorage.days);

		$("#settings_save").click(function(){
			localStorage.days =  $("#number_input").val();
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
		update: function(){
			update();
		}
	};
})(jQuery);