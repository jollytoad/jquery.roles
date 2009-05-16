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
 *   roles.keys.js
 */
(jQuery.roles && (function($) {

function neighbours( tree, itemId ) {
	var prev = null, curr = null, next = null;

	// All the visible tree items
	$(':role(treeitem):visible', tree).each(function() {

		if ( curr ) {				// Already found current item
			next = this;
			return false;			// exit loop
		}

		if ( this.id === itemId ) {	// Is this what we're looking for?
			curr = this;
		} else {
			prev = this;
		}
	});

	// clear the previous item if the current item was never found
	if ( !curr ) { prev = null; }

	return {prev: prev, curr: curr, next: next};
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

			// Keyboard navigation
			.bind('keydown.role-tree', function(event) {
				var activeItem = $.dt.attr(this, 'aria-activedescendant', 'idrefs'),
					activeId = activeItem[0].id,
					k = $.roles.keyCode;

				switch (event.keyCode) {
				case k.DOWN:
					// Move to next visible item
					$(neighbours(this, activeId).next).focus();
					return false;

				case k.UP:
					// Move to prev visible item
					$(neighbours(this, activeId).prev).focus();
					return false;

				case k.LEFT:
					// Is active item expanded?
					if ( $.dt.bool(activeItem.attr('aria-expanded')) === true ) {
						// Collapse the node
						activeItem.attr('aria-expanded', false);
					} else {
						// Move to parent item
						parent(activeItem).focus();
					}
					return false;

				case k.RIGHT:
					// Is active item expanded?
					if ( $.dt.bool(activeItem.attr('aria-expanded')) === false ) {
						// Expand the node
						activeItem.attr('aria-expanded', false);
					} else {
						// Move to first child item
						group(activeItem).find(':role(treeitem):first').focus();
					}
					return false;

				case k.ENTER:
					// Trigger a double-click event
					activeItem.trigger('dblclick');
					return false;

				case k.HOME:
					// Move to first node in tree
					$(':role(treeitem):first', this).focus();
					return false;

				case k.END:
					// Move to last visible node in tree
					$(':role(treeitem):visible:last', this).focus();
					return false;
				}
				// TODO: If a character key is pressed look for the next item
				// starting with that character.
			})

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
	
	init: function() {
		$(this)
			// Initialise the hidden state of the related group
			.initMutation('attr', 'aria-expanded');
	}
}

}); // $.extend

})(jQuery)
);

