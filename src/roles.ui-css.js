/*
 * jQuery Roles - jQuery UI CSS framework integration @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Set jQuery UI class names in response to ARIA events.
 *
 * Depends:
 *   roles.core.js
 */
(jQuery.roles && (function($) {

$.roles.uiCSS = {

	setup: function() {
		$(document)
			.bind('attr.roles-ui-css', function(event) {
				var roles = $.roles.get(event.target);
				if ( roles ) {
					$.dt.tokens(roles).each(function(n, role) {
						var fn = $.roles.uiCSS.rules[role+'.'+event.attrName];
						if ( fn ) {
							fn.call(event.target, event.newValue);
						}
					});
				}
			});
	},
	
	teardown: function() {
		$(document).unbind('.roles-ui-css');
	},
	
	rules: {
		'tab.tabindex': function( value ) {
			$(this).toggleClass('ui-state-active', !$.dt.integer(value));
		},
		'treeitem.tabindex': function( value ) {
			$(this).toggleClass('ui-state-highlight', !$.dt.integer(value));
		}
	}
};

})(jQuery)
);


