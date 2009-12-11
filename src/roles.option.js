/*
 * jQuery Roles - ARIA Option Widgets @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA role: option
 *
 * Depends:
 *   roles.core.js
 *   roles.composite.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   datatypes.attr.js
 *   jquery.param.js
 *   jquery.within.js
 */
(function($) {

// role: option -> input -> widget
// attrs:
//   tabindex - indicates active item

$(':role(option)')

	.roleStage('bind', function() {
		$(this)
			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', -1)

			// ---- Focus ----

			// Set this item as the activedescendant of the tree
			.roleBind('focus', 'set-activedescendant');
	});

})(jQuery);

