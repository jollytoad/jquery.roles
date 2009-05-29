/*
 * jQuery Roles - ARIA Toolbar Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA roles: toolbar
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 *   jquery.within.js
 *   jquery.param.js
 */
(function($) {

// NOTE: This is not technically a 'composite' widget according to the spec,
// but it operates very much like one so we inherit it here.

$.roles.add('toolbar', ['composite']);


// role: toolbar -> group -> section -> structure

$(':role(toolbar)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'toolbar')
			
			.find(':role(widget)')
				.attr('tabindex', -1)
			.end()
			
			.find(':role(widget):first')
				.attr('tabindex', 0)
			.end()

			// ---- Mouse ----
			
			.roleBind('mouseup', 'action-focus')
			
			// ---- Keyboard ----
			
			.roleKey('left', 'action-prev')
			.roleKey('right', 'action-next')
			.roleKey('home', 'action-first')
			.roleKey('end', 'action-last')
					
			.end();
	});

})(jQuery);

