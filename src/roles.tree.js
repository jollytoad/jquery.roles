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
 *   keys.core.js
 */
(jQuery.roles && (function($) {

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

$.extend($.roles.widgets, {

/* role: tree -> select +-> composite -> widget
 *                       \-> input -> widget
 *                        \-> group -> section -> structure
 * attrs:
 *	 aria-activedescendant (composite) - select a treeitem
 */
tree: {
	setup: function() {
		$(this)
			// Respond to the active item being changed
			.bind('attr.@aria-activedescendant.role-tree', $.roles.selectActivedescendant)

			// double click to toggle the expanded state of a treeitem
			.bind('dblclick.role-tree', function(event) {
				$(event.target).closest(':role(treeitem)').attrToggle('aria-expanded');
			});
	}
},

/* role: treeitem +-> option -> input -> widget
 *                 \-> listitem -> section -> structure
 * attrs:
 *   tabindex - indicates active item
 *   aria-expanded - show/hide the related group
 */
treeitem: {
	setup: function() {
		$(this)
			// Add an id if not already present
			.not('[id]')
				.attr('id', $.roles.uniqueId)
			.end()

			// Add a tabindex=-1 to allow click focus
			.attr('tabindex', -1)

			// Set this item as the activedescendant of the tree
			.bind('focus.role-treeitem', 'tree', $.roles.setActivedescendant)

			// Show/hide the related group if expanded state has changed
			.bind('attr.@aria-expanded.role-treeitem', function(event) {
				// Find the group belonging to this treeitem and show/hide it
				group(event.target).attr('aria-hidden', !$.dt.bool(event.newValue));
			});
	},
	
	keys: function() {
		$(this)
			.bind('keydown.role-treeitem.(down)', function() {
				// Next visible item in tree
				$(neighbours(this).next).focus();
				return false;
			})
			.bind('keydown.role-treeitem.(up)', function() {
				// Previous visible item in tree
				$(neighbours(this).prev).focus();
				return false;
			})
			.bind('keydown.role-treeitem.(left)', function() {
				// Is active item expanded?
				if ( $.dt.bool( $.attr(this, 'aria-expanded') ) === true ) {
					// Collapse the node
					$.attr(this, 'aria-expanded', false);
				} else {
					// Move to parent item
					parent(this).focus();
				}
				return false;			
			})
			.bind('keydown.role-treeitem.(right)', function() {
				// Is active item expanded?
				if ( $.dt.bool( $.attr(this, 'aria-expanded') ) === false ) {
					// Expand the node
					$.attr(this, 'aria-expanded', true);
				} else {
					// Move to first child item
					group(this).find(':role(treeitem):first').focus();
				}
				return false;
			})
			.bind('keydown.role-treeitem.(enter)', function() {
				// Trigger a double-click event
				$(this).trigger('dblclick');
				return false;
			})
			.bind('keydown.role-treeitem.(home)', function() {
				// Move to first node in tree
				$(this).closest(':role(tree)').find(':role(treeitem):first').focus();
				return false;		
			})
			.bind('keydown.role-treeitem.(end)', function() {
				// Move to last visible node in tree
				$(this).closest(':role(tree)').find(':role(treeitem):visible:last').focus();
				return false;
			});
			// TODO: If a character key is pressed look for the next item
			// starting with that character.
	},
	
	init: function() {
		$(this)
			// Initialise the hidden state of the related group
			.initMutation('attr', 'aria-expanded');
	}
}

}); // $.extend

})(jQuery)
);

