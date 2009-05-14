/*
 * jQuery Roles - ARIA Tablist Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA roles: tablist, tab, tabpanel
 *
 * Depends:
 *   roles.core.js
 *   roles.aria.js
 *   roles.keys.js
 */
(jQuery.roles && (function($) {

// Register widgets
$.extend($.roles.widgets, {

// role: tablist +-> composite -> widget
//                \-> directory -> list -> region -> section -> structure
// attrs:
//  activedescendant (composite) - will select a tab
//	expanded (structure) - not yet supported
tablist: function() {

	return this
		// Ensure tabs are initialised before the tablist
		.find(':role(tab)').role().end()
		
		// Select the first tab if aria-activedescendant is not set
		.filter(':not([aria-activedescendant])')
			.each(function() {
				$.attr(this, 'aria-activedescendant', $(':role(tab):first', this).attr('id'));
			})
		.end()
		
		// Respond to the active tab being changed
		.bind('attr.@aria-activedescendant.role-tablist', $.roles.selectActivedescendant)

		// Select the initial tab
		.initMutation('attr', 'aria-activedescendant');

},

// role: tab +-> sectionhead -> structure
//            \-> widget
// attrs: selected
tab: function() {
	return this
		// Add a tabindex=-1 to allow click focus
		.attr('tabindex', '-1')

		// Ensure that a click causes the tab to be focused
		.bind('click.role-tab', function() { $(this).focus(); })
		
		// Respond to keyboard events
		.bind('keydown.role-tablist', function(event) {
			var k = $.roles.keyCode;
			switch (event.keyCode) {
			case k.LEFT:
			case k.UP:		$(this).prev(':role(tab)').focus(); return false;
			case k.RIGHT:
			case k.DOWN:	$(this).next(':role(tab)').focus(); return false;
			case k.HOME:	$(this).siblings(':role(tab):first').focus(); return false;
			case k.END:		$(this).siblings(':role(tab):last').focus(); return false;
			}
		})

		// Set this tab as the activedescendant of the tablist
		.bind('focus.role-tab', 'tablist', $.roles.setActivedescendant)

		.bind('attr.@aria-selected.role-tab', function(event) {
			// Expand the associated 'tabpanel'
			$.roles.targets(this).filter(':role(tabpanel)').attr('aria-expanded', $.dt.bool(event.newValue));
		});
},

// role: tabpanel -> region -> section -> structure
// attrs: expanded
tabpanel: function() {
	return this
		// Show or hide the tabpanel if the expanded state is changed
		.bind('attr.@aria-expanded.role-tabpanel', function(event) {
			$.attr(this, 'aria-hidden', !$.dt.bool(event.newValue));
		})
		
		// Set the initial hidden state
		.initMutation('attr', 'aria-expanded');
}

}); // $.extend

})(jQuery)
);

