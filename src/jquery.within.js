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

// Search descendants
function descendants( jq, expr, prev ) {
	var found = $(jq).find(expr || '*');
	return found[prev ? found.length-1 : 0];
}

// Search siblings
function siblings( jq, expr, prev ) {
	var found;
	
	// Search siblings and their descendants
	$(jq)[prev ? 'prevAll' : 'nextAll']().each(function() {
		if ( $(this).is(expr || '*') ) {
			found = this;
			return false;
		}
		
		found = descendants(this, expr, prev);
		return !found;
	});
	
	return found;
}

// Find the next matching element within the document
$.fn.nextInDoc = function( expr ) {
	return this.pushStack(descendants(this, expr) || siblings(this, expr) || siblings($(this).parents(), expr),
			'nextInDoc', expr);
};

// Find the previous matching element within the document
$.fn.prevInDoc = function( expr ) {
	return this.pushStack(siblings(this, expr, true) || siblings($(this).parents(), expr, true),
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

