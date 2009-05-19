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
usekeymap: function(role) {
	var prefixrole = 'role-'+role,
		widget = $.data(this, prefixrole),
		that = this;
	
	if ( widget.keymap && widget.actions ) {
		$.each(widget.keymap, function(combo, action) {
			$.event.add(that, 'keydown.' + prefixrole + '.key:' + combo, function(event) {
				if ( !event.isDefaultPrevented() ) {
					widget.actions[action].call(this, arguments);
				}
				event.preventDefault();
			});
/*DEBUG*keymap*
			console.log('keymap %s: %s -> %s', role, combo, action);
*DEBUG*keymap*/
		});
	}
}

});

})(jQuery)
);
