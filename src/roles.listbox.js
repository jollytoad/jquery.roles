/*
 * jQuery Roles - ARIA Listbox Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA role: listbox
 *
 * Depends:
 *   roles.core.js
 *   roles.aria.js
 *   roles.composite.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   jquery.param.js
 *   jquery.within.js
 */
(function($) {

$.roles
	.add('listbox', ['select','composite','widget']);

// roles: listbox +-> select +-> composite -> widget
//                 \          \-> input -> widget
//                  \          \-> group -> section -> structure
//                   \-> list -> region -> section -> structure

$(':role(listbox)')

	.roleStage('bind', function() {
		$(this)
			.data('role-composite-descendants', ':role(option)')
			
			.param('role', 'listbox')

			// ---- Mouse ----
			
			.roleBind('mouseup', 'action-focus')
			
			// ---- Keyboard ----
			
			.roleKey('left', 'action-prev')
			.roleKey('right', 'action-next')
			.roleKey('up', 'action-prev')
			.roleKey('down', 'action-next')
			.roleKey('home', 'action-first')
			.roleKey('end', 'action-last')
			
			.end();
	});

})(jQuery);

