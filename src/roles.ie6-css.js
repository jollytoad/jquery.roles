/*
 * jQuery Roles - Set ARIA class names @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Add/remove css class names to elements to represent the current ARIA attributes,
 * for backwards compatibility with backwards browsers - you know who you are!
 *
 * I'd recommend including this, and the supporting CSS file in a conditional comment:
 *
 * <!--[if lt IE 6]>
 * <link rel="stylesheet" href="theme/roles-ie6.css"/>
 * <script type="text/javascript" src="roles.ie6-css.js"/>
 * <![endif]-->
 *
 * Depends:
 *   roles.core.js
 */
(jQuery.roles && (function($) {

// Convert an ARIA name and value into CSS class names
function classNames( attr, value ) {
	return value ? attr + value.replace(/(^|\s+)(?=\S)/g, ' '+attr+'-') : '';
}

var isEnabled = false;

$.extend($.roles, {

// Enabled/disable the addition of class names
ieCSS: function( enabled ) {

	if ( enabled === false && isEnabled ) {

		$(':role')
			.die('attr.aria-set-class')
			.die('role.aria-set-class');
		
		isEnabled = false;

	} else if ( !isEnabled ) {

		$(':role')
			.live('attr.aria-set-class', function(event) {
				if ( /^aria-./.test(event.attrName) ) {
					$(event.target)
						.removeClass(classNames(event.attrName, event.prevValue))
						.addClass(classNames(event.attrName, event.newValue));
				}
			})
			.live('role.aria-set-class', function(event) {
				var classes = [];

				// Add classes to reflect initial attribute values
				$.each(event.target.attributes, function(i, node) {
					if (node && /^(aria-.+|role)$/i.test(node.nodeName)) {
						classes.push(classNames(node.nodeName, node.nodeValue));
					}
				});

				$(event.target).addClass(classes.join(' '));
			});
		
		isEnabled = true;
	}
}

});

// Auto enable this, so it can just be included within a conditional comment
$.roles.ieCSS();

})(jQuery)
);

