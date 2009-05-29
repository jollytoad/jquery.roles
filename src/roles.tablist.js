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
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   jquery.param.js
 *   jquery.within.js
 */
(function($) {

// role: tablist +-> composite -> widget
//                \-> directory -> list -> region -> section -> structure
// attrs:
//  activedescendant (composite) - will select a tab
//	expanded (structure) - not yet supported

$(':role(tablist)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'tablist')
			
			// ---- ARIA States ----
			
			// Respond to the active tab being changed
			.bind('attr.@aria-activedescendant.role-tablist', $.roles.selectActivedescendant)

			// ---- Actions ----

			// Focus previous tab
			.roleAction('action-prev', function(event) {
				$(event.target).prevInDoc(':role(tab):visible').within(this).roleFocus();
				return false;
			})
			// Focus next tab
			.roleAction('action-next', function(event) {
				$(event.target).nextInDoc(':role(tab):visible').within(this).roleFocus();
				return false;
			})
			// Focus first tab
			.roleAction('action-first', function(event) {
				$(this).find(':role(tab):visible:first').roleFocus();
				return false;
			})
			// Focus last tab
			.roleAction('action-last', function(event) {
				$(this).find(':role(tab):visible:last').roleFocus();
				return false;
			})

			// ---- Mouse ----
			
			.bind('mouseup.role-tablist', ':role(tab)', $.roles.focusDescendant)
			
			// ---- Keyboard ----
			
			.roleKey('left', 'action-prev')
			.roleKey('right', 'action-next')
			.roleKey('up', 'action-prev')
			.roleKey('down', 'action-next')
			.roleKey('home', 'action-first')
			.roleKey('end', 'action-last')
			
			.end();
	})

	.roleStage('activate', $.roles.activateActivedescendant(':role(tab):first'));


// role: tab +-> sectionhead -> structure
//            \-> widget
// attrs: selected

$(':role(tab)')

	.roleStage('bind', function() {
		function tabpanel( tab ) {
			return $.roles.slaves(tab).filter(':role(tabpanel)');
		}

		$(this)
			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', '-1')
			
			// ---- ARIA States ----

			// Expand the associated 'tabpanel' when its tab is selected
			.bind('attr.@aria-selected.role-tab', function(event) {
				tabpanel(event.target).attr('aria-expanded', $.dt.bool(event.newValue));
			})
			
			// ---- Focus ----
			
			// Set this tab as the activedescendant of the tablist
			.bind('focus.role-tab', ':role(tablist)', $.roles.setActivedescendant);
	})

	.roleStage('init', function() {
		$(this)
			// Set the initial state of the tab and tabpanel
			.initMutation('attr', 'aria-selected', false);
	});


// role: tabpanel -> region -> section -> structure
// attrs: expanded

$(':role(tabpanel)')

	.roleStage('bind', function() {
		function tab( tabpanel ) {
			return $.roles.masters(tabpanel).filter(':role(tab)');
		}
		
		$(this)
			.param('role', 'tabpanel')
			
			// ---- ARIA States ----
		
			// Show or hide the tabpanel if the expanded state is changed
			.bind('attr.@aria-expanded.role-tabpanel', function(event) {
				$.attr(this, 'aria-hidden', !$.dt.bool(event.newValue));
			})
			
			// ---- Actions ----
			
			// Focus the tab after our tab (ie. the tab for this tabpanel)
			.roleAction('action-next-tab', function() {
				tab(this).next(':role(tab)').roleFocus();
				return false;
			})
			// Focus the tab preceding our tab
			.roleAction('action-prev-tab', function() {
				tab(this).prev(':role(tab)').roleFocus();
				return false;
			})
			// Focus our tab
			.roleAction('action-focus-tab', function() {
				tab(this).roleFocus();
				return false;
			})
			
			// ---- Keyboard ----
			
			.roleKey('ctrl-pageup', 'action-prev-tab')
			.roleKey('ctrl-pagedown', 'action-next-tab')
			.roleKey('ctrl-up', 'action-focus-tab')
			
			.end();
	});

})(jQuery);

