/*!
 * jQuery Within 0.1
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * Provides jQuery functions to find the next/previous element within the document,
 * and to filter a set of elements on whether they are descendants of another element.
 *
 * Very useful for keyboard navigation.
 */
(function($) {

// Check given element for match, returns element or undefined
function self( jq, expr ) {
	return $(jq).filter(expr || '*')[0];
}

// Search descendants
function descendants( jq, expr, prev ) {
	var found = $(jq).find(expr || '*');
	return found[prev ? found.length-1 : 0];
}

// Search following siblings
function nextSiblings( jq, expr ) {
	var found;
	$(jq).nextAll().each(function() {
		// Check the sibling and then it's descendants
		found = self(this, expr) || descendants(this, expr);
		return !found;
	});
	return found;
}

// Search preceding siblings
function prevSiblings( jq, expr ) {
	var found;
	$(jq).prevAll().each(function() {
		// Check the siblings descendants, then the sibling itself
		found = descendants(this, expr, true) || self(this, expr);
		return !found;
	});	
	return found;
}

// Search parents and preceding elements
function preceding( jq, expr ) {
	var found;
	$(jq).parents().each(function() {
		// Check the parent and then it's preceding siblings
		found = self(this, expr) || prevSiblings(this, expr);
		return !found;
	});
	return found;
}

// Find the next matching element within the document
$.fn.nextInDoc = function( expr ) {
	return this.pushStack(descendants(this, expr) || nextSiblings(this, expr) || nextSiblings($(this).parents(), expr),
			'nextInDoc', expr);
};

// Find the previous matching element within the document
$.fn.prevInDoc = function( expr ) {
	return this.pushStack(prevSiblings(this, expr) || preceding(this, expr),
			'prevInDoc', expr);
};

// Return just the elements that are descendants of the given element or the current context
$.fn.within = function( elem ) {
	var context = elem || this.context;
	return this.filter(function() {
		var cur = this;
		while ( cur ) {
			if ( cur == context ) {
				return true;
			}
			cur = cur.parentNode;
		}
		return false;
	});
};

})(jQuery);

