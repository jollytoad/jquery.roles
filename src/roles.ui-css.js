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

function setClass( elem, state, value ) {
	switch (state) {
	case 'aria-selected':
		value = $.dt.bool(value);
		$(elem)
			.filter(':role(tab)')
				.toggleClass('ui-state-default', !value)
				.toggleClass('ui-state-active', value)
			.end()
			.filter(':role(treeitem)')
				.toggleClass('ui-state-highlight', value)
			.end()
		break;
	}
}

var isEnabled = false;

$.extend($.roles, {

// Enabled/disable the addition of class names
uiCSS: function( enabled ) {

	if ( enabled === false && isEnabled ) {

		$(':role')
			.die('attr.aria-ui-class')
			.die('role.aria-ui-class');
			
		isEnabled = false;

	} else if ( !isEnabled ) {

		$(':role')
			.live('attr.aria-ui-class', function(event) {
				setClass(event.target, event.attrName, event.newValue);
			})
			.live('role.aria-ui-class', function(event) {
				// Add classes to reflect initial attribute values
				$.each(event.target.attributes, function(i, node) {
					if (node && /^aria-./i.test(node.nodeName)) {
						setClass(event.target, node.nodeName, node.nodeValue);
					}
				});
			});
		
		isEnabled = true;
	}
}

});

})(jQuery)
);


