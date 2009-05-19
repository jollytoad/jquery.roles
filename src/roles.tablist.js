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
 *   roles.keymap.js
 */
(jQuery.roles && (function($) {

function tabpanel( tab ) {
	return $.roles.slaves(tab).filter(':role(tabpanel)');
}

function tab( tabpanel ) {
	return $.roles.masters(tabpanel).filter(':role(tab)');
}

function tablist( tabpanel ) {
	return tab(tabpanel).closest(':role(tablist)');
}

function activedescendant( tabpanel ) {
	return $.dt.idrefs(tablist(tabpanel).attr('aria-activedescendant'));
}

// Register widgets
$.extend($.roles.widgets, {

// role: tablist +-> composite -> widget
//                \-> directory -> list -> region -> section -> structure
// attrs:
//  activedescendant (composite) - will select a tab
//	expanded (structure) - not yet supported
tablist: {
	setup: function() {
		$(this)
			// Respond to the active tab being changed
			.bind('attr.@aria-activedescendant.role-tablist', $.roles.selectActivedescendant);
	},
	
	active: function() {
		$(this)
			// Select the first tab if aria-activedescendant is not set
			.filter(':not([aria-activedescendant])')
				.each(function() {
					$.attr(this, 'aria-activedescendant', $(':role(tab):first', this).attr('id'));
				})
			.end()
			
			// Activate the activedescendant
			.initMutation('attr', 'aria-activedescendant');
	}
},

// role: tab +-> sectionhead -> structure
//            \-> widget
// attrs: selected
tab: {
	setup: function() {
		$(this)
			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', '-1')

			// Ensure that a click causes the tab to be focused
//			.bind('click.role-tab', function() { $(this).focus(); })

			// Set this tab as the activedescendant of the tablist
			.bind('focus.role-tab', 'tablist', $.roles.setActivedescendant)

			// Expand the associated 'tabpanel' when its tab is selected
			.bind('attr.@aria-selected.role-tab', function(event) {
				tabpanel(event.target).attr('aria-expanded', $.dt.bool(event.newValue));
			});
	},

	keys: $.roles.usekeymap,
	
	init: function() {
		$(this)
			// Set the initial state of the tab and tabpanel
			.initMutation('attr', 'aria-selected', false);
	},
	
	keymap: {
		'left':  'prev',
		'right': 'next',
		'up':    'prev',
		'down':  'next',
		'home':  'first',
		'end':   'last'
	},
	
	actions: {
		prev: function() {
			$(this).prev(':role(tab)').focus();
		},
		next: function() {
			$(this).next(':role(tab)').focus();
		},
		first: function() {
			$(this).siblings(':role(tab):first').focus();
		},
		last: function() {
			$(this).siblings(':role(tab):last').focus();
		}
	}
},

// role: tabpanel -> region -> section -> structure
// attrs: expanded
tabpanel: {
	setup: function() {
		$(this)
			// Show or hide the tabpanel if the expanded state is changed
			.bind('attr.@aria-expanded.role-tabpanel', function(event) {
				$.attr(this, 'aria-hidden', !$.dt.bool(event.newValue));
			});
	},
	
	keys: $.roles.usekeymap,
	
	keymap: {
		'ctrl-pageup':   'prevtab',
		'ctrl-pagedown': 'nexttab',
		'ctrl-up':       'currtab'
	},
	
	actions: {
		// Focus the next tab
		nexttab: function() {
			activedescendant(this).prev(':role(tab)').focus();
		},
		// Focus the previous tab
		prevtab: function() {
			activedescendant(this).next(':role(tab)').focus();
		},
		// Focus the tab of this tabpanel
		currtab: function() {
			tab(this).focus();
		}
	},
	
	desc: {
		nexttab: "Activate the next tab",
		prevtab: "Activate the previous tab",
		currtab: "Focus the current tab"
	}
}

}); // $.extend

})(jQuery)
);

