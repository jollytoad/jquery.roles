/*
 * jQuery Roles - ARIA Tree Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA roles: tree, treeitem
 *
 * Depends:
 *   roles.core.js
 *   roles.aria.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   datatypes.attr.js
 *   jquery.param.js
 */
(function($) {

function neighbours( treeitem ) {
	var prev, curr, next;

	// All the visible tree items
	$(treeitem)
		.closest(':role(tree)')
		.find(':role(treeitem):visible')
		.each(function() {

			if ( curr ) {				// Already found current item
				next = this;
				return false;			// exit loop
			}

			if ( this === treeitem ) {	// Is this what we're looking for?
				curr = this;
			} else {
				prev = this;
			}
		});

	// clear the previous item if the current item was never found
	if ( !curr ) { prev = undefined; }

	return {prev: prev, next: next};
}

// find the sub-group belonging to a treeitem
function group( treeitem ) {
	return $(':role(group), + :role(group)', treeitem).eq(0);
}

// find the parent treeitem
function parent( treeitem ) {
	var item = $(treeitem).closest(':role(group)').closest(':role(treeitem)');
	if ( !item.length ) {
		item = item.end().prev(':role(treeitem)');
	}
	return item;
}


// role: tree -> select +-> composite -> widget
//                       \-> input -> widget
//                        \-> group -> section -> structure
// attrs:
//	 aria-activedescendant (composite) - select a treeitem

$(':role(tree)')

	// Bind state (attribute) changes
	.roleStage('bind', function() {
		$(this)
			.param('role', 'tree')
			
			// ---- ARIA States ----
			
			// Respond to the active item being changed
			.bind('attr.@aria-activedescendant.role-tree', $.roles.selectActivedescendant)
			
			// ---- Actions ----

			// Focus next treeitem
			.roleAction('action-next', function(event) {
				$(neighbours(event.target).next).focus();
				return false;
			})

			// Focus previous treeitem
			.roleAction('action-prev', function(event) {
				$(neighbours(event.target).prev).focus();
				return false;
			})

			// Climb up the tree
			.roleAction('action-climb', function(event) {
				// Is active item expanded?
				if ( $.dt.attr(event.target, 'aria-expanded', 'bool') === true ) {
					// Collapse the node
					$.attr(event.target, 'aria-expanded', false);
				} else {
					// Move to parent item
					parent(event.target).focus();
				}
				return false;
			})

			// Drill-down through treeitems
			.roleAction('action-drill', function(event) {
				// Is active item expanded?
				if ( $.dt.attr(event.target, 'aria-expanded', 'bool') === false ) {
					// Expand the node
					$.attr(event.target, 'aria-expanded', true);
				} else {
					// Move to first child item
					group(event.target).find(':role(treeitem):first').focus();
				}
				return false;
			})

			// Toggle expanded state
			.roleAction('action-toggle', function(event) {
				$(event.target).attrToggle('aria-expanded');
				return false;
			})

			// Focus the first node in the tree
			.roleAction('action-first', function() {
				$(this).find(':role(treeitem):first').focus();
				return false;
			})

			// Focus the last visible node in the tree
			.roleAction('action-last', function() {
				$(this).find(':role(treeitem):visible:last').focus();
				return false;
			})
			
			// ---- Mouse ----

			// Expand/collapse on a double click
			.bind('dblclick.role-tree', function(event) {
				$(event.target).closest(':role(treeitem)').trigger('action-toggle');
				return false;
			})
			
			// ---- Keyboard ----

			.roleKey('down', 'action-next')
			.roleKey('up', 'action-prev')
			.roleKey('left', 'action-climb')
			.roleKey('right', 'action-drill')
			.roleKey('enter', 'action-toggle')
			.roleKey('home', 'action-first')
			.roleKey('end', 'action-last')

			.end();

		// TODO: If a character key is pressed look for the next item
		// starting with that character.
	})

	.roleStage('activate', $.roles.activateActivedescendant(':role(treeitem):first'));


// role: treeitem +-> option -> input -> widget
//                 \-> listitem -> section -> structure
// attrs:
//   tabindex - indicates active item
//   aria-expanded - show/hide the related group

$(':role(treeitem)')

	.roleStage('bind', function() {
		$(this)
			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', -1)
			
			// ---- ARIA States ----

			// Show/hide the related group if expanded state has changed
			.bind('attr.@aria-expanded.role-treeitem', function(event) {
				// Find the group belonging to this treeitem and show/hide it
				group(event.target).attr('aria-hidden', !$.dt.bool(event.newValue));
			})

			// ---- Focus ----

			// Set this item as the activedescendant of the tree
			.bind('focus.role-treeitem', ':role(tree)', $.roles.setActivedescendant);
	})

	.roleStage('init', function() {
		$(this)
			// Initialise the hidden state of the related group
			.initMutation('attr', 'aria-expanded');
	});

})(jQuery);

