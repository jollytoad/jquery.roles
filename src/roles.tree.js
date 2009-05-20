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
			.bind('attr.@aria-activedescendant.role-tree', $.roles.selectActivedescendant);
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
			})
			
			// Expand/collapse on a double click
			.bind('dblclick.role-treeitem', function(event) {
				$.roles.action(this, 'treeitem', 'toggle', arguments);
				return false;
			});
	},
	
	keys: $.roles.usekeymap,
	
	init: function() {
		$(this)
			// Initialise the hidden state of the related group
			.initMutation('attr', 'aria-expanded');
	},
	
	keymap: {
		'down':  'next',
		'up':    'prev',
		'left':  'climb',
		'right': 'drill',
		'enter': 'toggle',
		'home':  'first',
		'end':   'last'
		// TODO: If a character key is pressed look for the next item
		// starting with that character.
	},
	
	actions: {
		// Next visible item in tree
		next: function() {
			$(neighbours(this).next).focus();
		},
		
		// Previous visible item in tree
		prev: function() {
			$(neighbours(this).prev).focus();
		},
		
		// Collapse or move to parent
		climb: function() {
			// Is active item expanded?
			if ( $.dt.bool( $.attr(this, 'aria-expanded') ) === true ) {
				// Collapse the node
				$.attr(this, 'aria-expanded', false);
			} else {
				// Move to parent item
				parent(this).focus();
			}
		},
		
		// Expand or move to first child 
		drill: function() {
			// Is active item expanded?
			if ( $.dt.bool( $.attr(this, 'aria-expanded') ) === false ) {
				// Expand the node
				$.attr(this, 'aria-expanded', true);
			} else {
				// Move to first child item
				group(this).find(':role(treeitem):first').focus();
			}
		},
		
		// Toggle expanded state
		toggle: function() {
			$(this).attrToggle('aria-expanded');
		},
		
		// Move to the first node in the tree
		first: function() {
			$(this).closest(':role(tree)').find(':role(treeitem):first').focus();
		},
		
		// Move to the last visible node in the tree
		last: function() {
			$(this).closest(':role(tree)').find(':role(treeitem):visible:last').focus();
		}
	},
	
	desc: {
		next:   "Focus next item",
		prev:   "Focus previous item",
		climb:  "Collapse item or focus parent item",
		drill:  "Expand item or focus first child",
		toggle: "Expand or collapse item",
		first:  "Focus first item in tree",
		last:   "Focus last item in tree"
	}
}

}); // $.extend

})(jQuery)
);

