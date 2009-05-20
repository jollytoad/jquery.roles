/*
 * jQuery Roles - Tree Styling @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Apply jQuery UI CSS Framework
 *
 * Depends:
 *   roles.tree.js
 */
(jQuery.roles && jQuery.roles.widgets.tree && (function($) {

$.roles.widgets.tree.style = function() {
	$(this)
		.bind('attr.@aria-activedescendant', function(event) {
			$.dt.idrefs(event.prevValue).removeClass('ui-state-highlight');
			$.dt.idrefs(event.newValue).addClass('ui-state-highlight');
		});
};

})(jQuery)
);
