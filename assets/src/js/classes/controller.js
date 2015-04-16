/**
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

})(jQuery);