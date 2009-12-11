/*
 * jQuery Roles IE6-CSS @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Enable IE6CSS and tune it specifically for jQuery Roles.
 *
 * I'd recommend including this, and the supporting CSS file in a conditional comment:
 *
 * <!--[if lt IE 6]>
 * <link rel="stylesheet" href="theme/jquery-roles.ie6.css"/>
 * <script type="text/javascript" src="mutations.ie6css.js"/>
 * <script type="text/javascript" src="roles.ie6css.js"/>
 * <![endif]-->
 *
 * Depends:
 *   mutations.ie6css.js
 *   roles.core.js
 */
(jQuery.ie6css && (function($) {

/*
var ae = document.activeElement;

$(document)
	.bind('propertychange.ie6css', function(event) {
		if ( event.originalEvent.propertyName === 'activeElement' ) {
			if ( ae ) {
				// Remove focus class names
				//ae.className = ae.className.replace(/(\S+-)?focus(?=\s|$)/g, '');
				$(ae).removeClass('focus');
			}
			ae = document.activeElement;
			if ( ae ) {
				// Add focus class names
				//ae.className = ae.className.replace(/(\S+)(\s|$)/g, '$1-focus ') + 'focus';
				$(ae).addClass('focus');
			}
		}
	})
	.bind('mouseenter.ie6css', function(event) {
		$(event.target).addClass('hover');
	})
	.bind('mouseleave.ie6css', function(event) {
		$(event.target).removeClass('hover');
	});
*/

$.ie6css.setup({
	selector: ':role',
	filterAttr: function( attrName ) {
		return (/^(aria-.+|role|tabindex)$/i).test(attrName);
	}
});

})(jQuery)
);

