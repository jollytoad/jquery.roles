/*
 * jQuery Roles - aria-owns support functions @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/*
 * NOTE: These functions are not well tested or optimised
 *
 * Depends:
 *   roles.core.js
 */
(function($) {

$.fn.extend({

// Like .find() but also includes the aria-owns attribute
owns: function( selector ) {
	var include = $(this).filter('[aria-owns]').map(function() {
		return this.getAttribute('aria-owns').replace(/([^\s]+)/g, '#$1').replace(/\s+/g,',');
	});

	if ( include.length ) {
		var owned = $(Array.prototype.join.call(include,','));
		this.pushStack(this);
		return $($(this).find(selector).get().concat($(owned).filter(selector).get()).concat($(owned).find(selector).get())).filter(selector);
	}

	return this.find(selector);
},

// Find the owner of the element, check .parents, and then aria-owns attributes
owner: function( role ) {
	var owner = $(this).parents(':role('+role+'):first');
	this.pushStack(this);
	if ( owner.length ) { return owner; }
	return $(":role("+role+")[aria-owns~='"+this.attr('id')+"']");
}

}); // $.fn.extend

})(jQuery);

