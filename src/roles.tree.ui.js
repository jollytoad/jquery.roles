/*
 * jQuery Roles - Tree Styling @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Apply jQuery UI CSS Framework
 *
 * Depends:
 *   roles.core.js
 *   datatypes.core.js
 *   datatypes.attr.js
 */
(function($) {

// TODO: Allow this to be configured somewhere, eg:
var icons = [ 'ui-tree-toggle-none', 'ui-icon-triangle-1-e', 'ui-icon-triangle-1-s' ]; 

$(':role(tree)')
	.roleStage('style', function() {
		$(this)
			.addClass('ui-tree')
			
			.bind('attr.@aria-activedescendant.role-tree', function(event) {
				$.dt.idrefs(event.prevValue).removeClass('ui-state-highlight');
				$.dt.idrefs(event.newValue).addClass('ui-state-highlight');
			})
			
			// Toggle expanded state of an iten when it's expander is clicked
			.bind('click.role-tree', function(event) {
				$(event.target).closest('.ui-tree-toggle').closest(':role(treeitem)').attrToggle('aria-expanded');
			})
			
			// Set the toggle icon according to the expanded state of a treeitem
			.bind('attr.aria-expanded.role-tree', function(event) {
				if ( event.attrName === 'aria-expanded' ) {
					var state = $.dt.bool(event.newValue),
						toggle = $(event.target).closest(':role(treeitem)').find('.ui-tree-toggle:first');
				
					toggle.removeClass(icons.join(' '));
				
					toggle.addClass(icons[state === undefined ? 0 : (state ? 2 : 1)]);
				}
			});
	});

$(':role(treeitem)')
	.roleStage('dom', function() {
		// Add a toggle widget to each treeitem
		$('<div class="ui-icon ui-tree-toggle" role="presentation"></div>')
			.addClass(icons[0])
			.prependTo(this);
	})
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-tree-item')
			
			.each(function() {
				// Find the group belonging to this item
				$(':role(group), + :role(group)', this).eq(0).addClass('ui-tree-group');
			});
	});

})(jQuery);

