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
// It requires a 'keymap' and 'actions' object in the widget.
// 'keymap' is a mapping of key combos to action functions in the 'actions' object.
usekeymap: function( role ) {
	var that = this;
	
	$.each( $.data(this, 'role-'+role).keymap || false, function(combo, action) {
		var fn = $.isFunction(action) ?
			action :
				function(event) {
					if ( !event.isDefaultPrevented() ) {
						$.roles.action(this, role, action, arguments);
					}
					event.preventDefault();
				};
			
			$.event.add(that, 'keydown.role-'+role + '.key:'+combo, fn);

/*DEBUG*keymap*
			console.log('keymap %s: %s -> %s', role, combo, action);
*DEBUG*keymap*/
	});
}

});

})(jQuery)
);
