/*!
 * jQuery - fix fn.focus() and focus-broken browsers 0.1
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* Make the jQuery focus() perform an actual focus on the first element.
 * Also adds support for document.activeElement if not present, and supports
 * focusing of any element with a tabindex.
 *
 * Depends:
 *   keys.core.js
 */
(function($) {

$.support.activeElement = ( 'activeElement' in document );

var origfocus = $.fn.focus,
	realfocus;

$.fn.focus = function() {
	if ( arguments.length ) {
		return origfocus.apply(this, arguments);
	}
	if ( this[0] ) {
		realfocus(this[0]);
	}
	return this;
};


if ( !$.support.activeElement ) {
	document.activeElement = document.body;
	
	if ( document.addEventListener ) {
		document.addEventListener('focus', function(event) {
			if ( event && event.target ) {
				document.activeElement = event.target;
			}
		}, true);
	}

	realfocus = function( elem ) {
		if ( elem !== document.activeElement ) {
			$(document.activeElement).blur();
			document.activeElement = elem;
			$(elem).trigger('focus');
		}
	};
	
	$(document)
		.bind('keydown.key:tab', function(event) {
			// Find the next tabindex
			// TODO
			
			// Prevent the default tab action
			return false;
		})
		.bind('keydown.key:shift-tab', function(event) {
			if ( document.activeElement === document.body ) {
				// Perform default tab action
				return;
			}
			
			// Find the previous tab element
			// TODO
			
			// Prevent default tab action
			return false;
		})
		.bind('mousedown', function(event) {
			if ( !event.isDefaultPrevented() ) {
				// TODO: extend this selector to include other tabbable elements
				$(event.target).closest('[tabindex],body').focus();
			}
		})
		.bind('keydown keyup keypress', function(event) {
			if ( event.target === document.body && document.activeElement !== document.body ) {
				// Re-trigger the event on the activeElement
				$(document.activeElement).trigger(event);
			}
		});
} else {
	realfocus = function( elem ) {
		window.setTimeout(function() {
			elem.focus();
		}, 0);
	};
}

})(jQuery);

