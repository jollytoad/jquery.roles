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
 *   ui.core.js - for :tabbable/:focusable selectors
 */
(function($) {

$.support.noActiveElement = !( 'activeElement' in document );

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


if ( $.support.noActiveElement ) {
	var active = function( elem ) {
		$(document.activeElement).removeClass('focus');
		document.activeElement = elem;
		$(document.activeElement).addClass('focus');
	};
	
	active(document.body);
	
	if ( document.addEventListener ) {
		document.addEventListener('focus', function(event) {
			if ( event && event.target ) {
				active(event.target);
			}
		}, true);
	}

	realfocus = function( elem ) {
		if ( elem !== document.activeElement ) {
			$(document.activeElement).blur();
			active(elem);
			$(elem).trigger('focus');
		}
	};
	
	$(document)
		.bind('keydown.key:tab', function(event) {
			// Focus the next tabbable element
			return !$(document.activeElement).nextInDoc(':tabbable').focus().size();
		})
		.bind('keydown.key:shift-tab', function(event) {
			// Focus the previous tabbable element
			return !$(document.activeElement).prevInDoc(':tabbable').focus().size();
		})
		.bind('mousedown', function(event) {
			if ( !event.isDefaultPrevented() ) {
				$(event.target).closest(':focusable').focus();
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
			try {
				elem.focus();
			} catch (e) {}
		}, 0);
	};
}

})(jQuery);

