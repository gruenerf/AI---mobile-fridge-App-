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
			settings.init();
			ajax.init();
			websocket.init();
			recipe.init();
		}
	};

}( jQuery );


jQuery(document).ready(function() {

	// Cordova eventbinding on the backkey of the phone
	function onBackKeyDown() {
		var content = jQuery('#content');

		if(content.hasClass('home')){
			navigator.app.exitApp();
		}else if(content.hasClass('addNewRecipe')){
			ajax.loadRecipes();
		}else{
			ajax.loadHome();
		}
	}

	document.addEventListener("backbutton", onBackKeyDown, false);

	main.init();
});

