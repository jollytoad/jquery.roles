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
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   jquery.param.js
 */
(function($) {

// role: dialog -> window
// attrs:
//  aria-hidden

$(':role(dialog)')

	.roleStage('bind', function() {
		$(this)
			.bind('attr.@aria-hidden.role-dialog', function(event) {
				$(this).trigger($.dt.bool(event.newValue) ? 'action-closed' : 'action-opened');
			})
			
			.param('role', 'dialog')
			.roleKey('esc', 'action-cancel')
			.end();
	});

})(jQuery);

