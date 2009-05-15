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

function setClass( elem, roles, attr, value ) {
	$.dt.tokens(roles).each(function() {
		var fn = $.roles.uiCSS.rules[this+'.'+attr];
		if ( fn ) {
			fn.call(elem, value);
		}
	});
}

$.roles.uiCSS = {

	setup: function() {
		$(document)
			.bind('attr.roles-ui-css', function(event) {
				var roles = $.roles.get(event.target);
				if ( roles ) {
					setClass(event.target, roles, event.attrName, event.newValue);
				}
			})
			.bind('role.roles-ui-css', function(event) {
				// Add classes to reflect initial attribute values
				var roles = $.roles.get(event.target);
				if ( roles ) {
					$.each(event.target.attributes, function(i, node) {
						setClass(event.target, roles, node.nodeName, node.nodeValue);
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


