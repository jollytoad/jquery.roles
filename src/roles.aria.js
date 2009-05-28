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

	// Bind to 'click' or 'focus' of an owned item, pass the parent selector as data
	setActivedescendant: function(event) {
		$(this).closest(event.data).attr('aria-activedescendant', $.id(this));
		event.stopPropagation();
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
	
	// Handler to ensures descendant items are focused correctly on a mouse click.
	// Bind to 'mouseup' event and pass the item selector as data.
	// eg: $(...).bind('mouseup', ':role(treeitem)', $.roles.focusDescendant);
	focusDescendant: function( event ) {
		// Ensure that the item is focused
		var item = $(event.target).closest(event.data || ':role').roleFocus();
				
		// Focus the active item if clicked in a blank space
		if ( !item.length ) {
			item = $.dt.attr(this, 'aria-activedescendant', 'idrefs').roleFocus();
			
			// Look for item with tabindex=0 if no activedescendant is set
			if ( !item.length ) {
				item = $(event.data || ':role', this).filter('[tabindex=0]').roleFocus();
			}
		}
	},

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

