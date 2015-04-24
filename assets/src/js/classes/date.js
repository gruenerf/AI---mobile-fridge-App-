/**
 * This file handels all date/calender related functions
 *
 * @class date
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var date = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {
		/**
		 * Function that defines the difference between two dates
		 * @param datepart
		 * @param fromdate
		 * @param todate
		 * @returns {number}
		 */

		Date.dateDiff = function (datepart, fromdate, todate) {
			datepart = datepart.toLowerCase();
			//Difference in milliseconds
			var diff = todate - fromdate;
			var divideBy = {
				w: 604800000,
				d: 86400000,
				h: 3600000,
				n: 60000,
				s: 1000
			};

			return Math.floor(diff / divideBy[datepart]) + 1;
		};

		//Datepicker UI settings
		$('#calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'],
			dateFormat: 'dd.mm.yy',
			minDate: new Date()
		});
	}

	return {
		init: function () {
			init();
		}
	};
})(jQuery);