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
 *   roles.composite.js
 *   roles.option.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 *   datatypes.attr.js
 *   jquery.param.js
 *   jquery.within.js
 */
(function($) {

$.roles
	.add('tree', ['select','input','composite','widget'])
	.add('treeitem', ['option','input','widget']);


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

$(':role(tree)')

	// Bind state (attribute) changes
	.roleStage('bind', function() {
		$(this)
			.data('role-composite-descendants', ':role(treeitem)')
			
			.param('role', 'tree')
						
			// ---- Actions ----

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
			
			// ---- Mouse ----

			// Expand/collapse on a double click
			.roleBind('dblclick', 'action-toggle')
			
			// Ensure focus
			.roleBind('mouseup', 'action-focus')
			
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
	});


// role: treeitem +-> option -> input -> widget
//                 \-> listitem -> section -> structure
// attrs:
//   tabindex - indicates active item
//   aria-expanded - show/hide the related group

$(':role(treeitem)')

	.roleStage('bind', function() {
		$(this)			
			// ---- ARIA States ----

			// Show/hide the related group if expanded state has changed
			.bind('attr.@aria-expanded.role-treeitem', function(event) {
				// Find the group belonging to this treeitem and show/hide it
				group(event.target).attr('aria-hidden', !$.dt.bool(event.newValue));
			});
	})

	.roleStage('init', function() {
		$(this)
			// Initialise the hidden state of the related group
			.initMutation('attr', 'aria-expanded');
	});

})(jQuery);

