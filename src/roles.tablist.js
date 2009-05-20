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

// Register widgets
$.extend($.roles.widgets, {

// role: tablist +-> composite -> widget
//                \-> directory -> list -> region -> section -> structure
// attrs:
//  activedescendant (composite) - will select a tab
//	expanded (structure) - not yet supported
tablist: {
	setup: 'states actions keys style',
	
	states: function() {
		$(this)
			// Respond to the active tab being changed
			.bind('attr.@aria-activedescendant.role-tablist', $.roles.selectActivedescendant);
	},
	
	actions: function() {
		$(this)
			// Focus previous tab
			.bind('action-prev.role-tablist', function(event) {
				$(event.target).prev(':role(tab)').focus();
			})
			// Focus next tab
			.bind('action-next.role-tablist', function(event) {
				$(event.target).next(':role(tab)').focus();
			})
			// Focus first tab
			.bind('action-first.role-tablist', function(event) {
				$(event.target).siblings(':role(tab):first').focus();
			})
			// Focus last tab
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

	activate: $.roles.activateActivedescendant(':role(tab):first')
},

// role: tab +-> sectionhead -> structure
//            \-> widget
// attrs: selected
tab: {
	setup: 'states style',
	
	states: function() {
		function tabpanel( tab ) {
			return $.roles.slaves(tab).filter(':role(tabpanel)');
		}

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
	setup: 'states actions keys style',
	
	states: function() {
		$(this)
			// Show or hide the tabpanel if the expanded state is changed
			.bind('attr.@aria-expanded.role-tabpanel', function(event) {
				$.attr(this, 'aria-hidden', !$.dt.bool(event.newValue));
			});
	},
	
	actions: function() {
		function tab( tabpanel ) {
			return $.roles.masters(tabpanel).filter(':role(tab)');
		}

		$(this)
			// Focus the tab after our tab (ie. the tab for this tabpanel)
			.bind('action-next-tab.role-tabpanel', function() {
				tab(this).next(':role(tab)').focus();
				return false;
			})
			// Focus the tab preceding our tab
			.bind('action-prev-tab.role-tabpanel', function() {
				tab(this).prev(':role(tab)').focus();
				return false;
			})
			// Focus our tab
			.bind('action-focus-tab.role-tabpanel', function() {
				tab(this).focus();
				return false;
			});
	},
	
	keys: $.roles.usekeymap,
	
	keymap: {
		'ctrl-pageup':   'action-prev-tab',
		'ctrl-pagedown': 'action-next-tab',
		'ctrl-up':       'action-focus-tab'
	}
}

}); // $.extend

})(jQuery)
);

