/*
 * jQuery Roles - Tablist Styling @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Apply jQuery UI CSS Framework
 *
 * Depends:
 *   roles.tablist.js
 */
(jQuery.roles && jQuery.roles.widgets.tablist && (function($) {

$.roles.widgets.tablist.style = function() {
	$(this)
		.bind('attr.@aria-activedescendant', function(event) {
			$.dt.idrefs(event.prevValue).removeClass('ui-state-active');
			$.dt.idrefs(event.newValue).addClass('ui-state-active');
		});
};

$.roles.widgets.tab.style = function() {
	$(this).addClass('ui-state-default ui-corner-tl ui-corner-tr');
};

})(jQuery)
);
