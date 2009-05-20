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
	setup: 'states actions keys',
	
	states: function() {
		$(this)
			// Respond to the active tab being changed
			.bind('attr.@aria-activedescendant.role-tablist', $.roles.selectActivedescendant);
	},
	
	actions: function() {
		$(this)
			.bind('action-prev.role-tablist', function(event) {
				$(event.target).prev(':role(tab)').focus();
			})
			.bind('action-next.role-tablist', function(event) {
				$(event.target).next(':role(tab)').focus();
			})
			.bind('action-first.role-tablist', function(event) {
				$(event.target).siblings(':role(tab):first').focus();
			})
			.bind('action-last.role-tablist', function(event) {
				$(event.target).siblings(':role(tab):last').focus();
			});
	},
	
	keys: $.roles.usekeymap,
	
	keymap: {
		'left':  'action-prev',
		'right': 'action-next',
		'up':    'action-prev',
		'down':  'action-next',
		'home':  'action-first',
		'end':   'action-last'
	},

	activate: function() {
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
	setup: 'states',
	
	states: function() {
		$(this)
			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', '-1')
			
			// Set this tab as the activedescendant of the tablist
			.bind('focus.role-tab', 'tablist', $.roles.setActivedescendant)

			// Expand the associated 'tabpanel' when its tab is selected
			.bind('attr.@aria-selected.role-tab', function(event) {
				tabpanel(event.target).attr('aria-expanded', $.dt.bool(event.newValue));
			});
	},

	init: function() {
		$(this)
			// Set the initial state of the tab and tabpanel
			.initMutation('attr', 'aria-selected', false);
	}
},

// role: tabpanel -> region -> section -> structure
// attrs: expanded
tabpanel: {
	setup: 'states actions keys',
	
	states: function() {
		$(this)
			// Show or hide the tabpanel if the expanded state is changed
			.bind('attr.@aria-expanded.role-tabpanel', function(event) {
				$.attr(this, 'aria-hidden', !$.dt.bool(event.newValue));
			});
	},
	
	actions: function() {
		// Focus the next tab
		$(this)
			.bind('action-next.role-tabpanel', function() {
				activedescendant(this).prev(':role(tab)').focus();
			})
			.bind('action-prev.role-tabpanel', function() {
				activedescendant(this).next(':role(tab)').focus();
			})
			.bind('action-focus.role-tabpanel', function() {
				tab(this).focus();
			});
	},
	
	keys: $.roles.usekeymap,
	
	keymap: {
		'ctrl-pageup':   'action-prev',
		'ctrl-pagedown': 'action-next',
		'ctrl-up':       'action-focus'
	}
}

}); // $.extend

})(jQuery)
);

