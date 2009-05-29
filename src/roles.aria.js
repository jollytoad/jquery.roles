/*
 * jQuery Roles - ARIA Utilities @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* Useful functions to levelage the features of WAI-ARIA.
 *
 * Depends:
 *   roles.core.js
 *   datatypes.core.js
 *   datatypes.utils.js
 *   datatypes.idrefs.js
 */
(jQuery.roles && (function($) {

$.extend($.roles, {

	// Find the elements controlled by the given element
	controls: function( elem ) {
		return $.dt.attr(elem, 'aria-controls', 'idrefs');
	},

	// Find the elements labelledby the given element
	labelledby: function( elem ) {
		return $("[aria-labelledby~='"+$.id(elem)+"']");
	},

	// Find elements controlled or labelled by the given element
	slaves: function( elem ) {
		return $.dt.attr(elem, 'aria-controls', 'idrefs').add("[aria-labelledby~='"+$.id(elem)+"']");
	},

	// Opposite of slaves
	masters: function( elem ) {
		return $.dt.attr(elem, 'aria-labelledby', 'idrefs').add("[aria-controls~='"+$.id(elem)+"']");
	},
	
	// Check whether the element is disabled
	disabled: function( elem ) {
		return elem.disabled || $.dt.bool( $.attr(elem, 'aria-disabled') );
	}

});

})(jQuery)
);

