/*
 * jQuery Roles - Common functionality for ARIA Composite Widgets @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA roles: composite
 *
 * Depends:
 *   roles.core.js
 *   roles.aria.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   jquery.param.js
 *   jquery.within.js
 */
(function($) {

function selector( elem ) {
	return ($.data(elem, 'role-composite-descendants') || ':role(widget)') + ':visible';
}

// role: composite -> widget
// attrs: aria-activedescendant
// data: role-composite-descendants - a selector to restrict the composite items, defaults to ':role(widget)'

$(':role(composite)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'composite')
			
			// ---- ARIA States ----
			
			// Respond to the activedescendant being changed
			.bind('attr.@aria-activedescendant.role-composite', function(event) {
				// Deselect the previously activedescendant
				$.dt.idrefs(event.prevValue)
					.attr('aria-selected', false)
					.attr('tabindex', -1);

				// Select the new activedescendant
				$.dt.idrefs(event.newValue)
					.attr('aria-selected', true)
					.attr('tabindex', 0);
			})

			// ---- Actions ----

			// Focus previous descendant
			.roleAction('action-prev', function(event) {
				$(event.target).prevInDoc(selector(this)).within(this).focus();
				return false;
			})
			
			// Focus next descendant
			.roleAction('action-next', function(event) {
				$(event.target).nextInDoc(selector(this)).within(this).focus();
				return false;
			})
			
			// Focus first descendant
			.roleAction('action-first', function(event) {
				$(this).find(selector(this)+':first').focus();
				return false;
			})
			
			// Focus last descendant
			.roleAction('action-last', function(event) {
				$(this).find(selector(this)+':last').focus();
				return false;
			})
			
			// Focus the active descendant
			.roleAction('action-focus', function(event) {
				// Ensure that the item is focused
				var sel = selector(this),
					item = $(event.target).closest(sel).focus();
				
				// Focus the active item if clicked in a blank space
				if ( !item.length ) {
					item = $.dt.attr(this, 'aria-activedescendant', 'idrefs').focus();
			
					// Look for item with tabindex=0 if no activedescendant is set
					if ( !item.length ) {
						item = $(sel + '[tabindex=0]', this).focus();
					}
				}
			})
			
			.roleAction('set-activedescendant', function(event) {
				if ( $(event.target).is(selector(this)) ) {
					$.attr(this, 'aria-activedescendant', $.id(event.target));
					return false;
				}
			})

			.end();
	})

	.roleStage('activate', function() {
		$(this)
			// Activate the activedescendant
			.initMutation('attr', 'aria-activedescendant')
		
			// Select the first item if aria-activedescendant is not set
			.filter(':not([aria-activedescendant])')
				.find(selector(this)+':first')
					.trigger('set-activedescendant');
	});

})(jQuery);

