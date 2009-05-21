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
 *   mutations.core.js
 *   mutations.attr.js
 */
(jQuery.roles && (function($) {

$.extend($.roles, {

	// Re-usable event handlers

	// Bind to 'attr.@aria-activedescendant'
	selectActivedescendant: function(event) {
		// Deselect the previously activedescendant
		$.dt.idrefs(event.prevValue)
			.attr('aria-selected', false)
			.attr('tabindex', -1);

		// Select the new activedescendant
		$.dt.idrefs(event.newValue)
			.attr('aria-selected', true)
			.attr('tabindex', 0);
	},

	// Bind to 'click' or 'focus' of an owned item, pass the parent 'role' as data
	setActivedescendant: function(event) {
		$(this).owner(event.data).attr('aria-activedescendant', this.id);
	},

	// Create an 'activate' function that activates the activedescendant,
	// or sets the activedescendant using the given selector if not already set.
	activateActivedescendant: function( selector ) {
		return function() {
			$(this)
				// Select the first item if aria-activedescendant is not set
				.filter(':not([aria-activedescendant])')
					.each(function() {
						$.attr(this, 'aria-activedescendant', $(selector, this).attr('id'));
					})
				.end()

				// Activate the activedescendant
				.initMutation('attr', 'aria-activedescendant');
		};
	},

	// Find the elements controlled by the given element
	controls: function( elem ) {
		return $.dt.attr(elem, 'aria-controls', 'idrefs');
	},

	// Find the elements labelledby the given element
	labelledby: function( elem ) {
		return $("[aria-labelledby~='"+elem.id+"']");
	},

	// Find elements controlled or labelled by the given element
	slaves: function( elem ) {
		return $.dt.attr(elem, 'aria-controls', 'idrefs').add("[aria-labelledby~='"+elem.id+"']");
	},

	// Opposite of slaves
	masters: function( elem ) {
		return $.dt.attr(elem, 'aria-labelledby', 'idrefs').add("[aria-controls+='"+elem.id+"']");
	}

});


// jQuery plugins

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

})(jQuery)
);

