/*
 * jQuery Roles - ARIA Dialog Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA role: dialog
 *
 * Depends:
 *   roles.core.js
 *   roles.aria.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   jquery.param.js
 *   
 */
(function($) {

// role: dialog -> window
// attrs:
//  aria-hidden

$(':role(dialog)')

	.roleStage('states', function() {
		$(this)
			.bind('attr.@aria-hidden.role-dialog', function(event) {
				if ( !$.dt.bool(event.newValue) ) {
					// Open dialog
					$(event.target)
						.draggable()
						.resizable();
				} else {
					// Close dialog
					$(event.target)
						.resizable('destroy')
						.draggable('destroy');
				}
			});
	})
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-widget ui-widget-content ui-corner-all');
	});

})(jQuery);

