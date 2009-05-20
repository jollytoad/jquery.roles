/*
 * jQuery Roles - Setup keys using a keymap @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 *   keys.core.js
 */
(jQuery.roles && (function($) {

$.extend($.roles, {

// This can be assigned as the $.roles.widgets[role].keys function.
// It uses a 'keymap' to map key combos to trigger events.
usekeymap: function( role ) {
	var that = this;
	
	$.each( $.data(this, 'role-'+role).keymap || false, function(combo, action) {
		function handler(event) {
			if ( !event.isDefaultPrevented() ) {
				$.roles.activeElement().trigger(action);
			}
			event.preventDefault();
		}
		
		$.event.add(that, 'keydown.role-'+role + '.key:'+combo, handler);
	});
}

});

})(jQuery)
);
