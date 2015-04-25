/**
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
			recipe.init();
			settings.init();
		}
	};

}( jQuery );


jQuery(document).ready(function() {
	main.init();
});