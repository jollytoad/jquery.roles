jQuery(function($) {

//	$(document).bind('role', function(event, data) {
//		console.log('role: %s -> %o', data.role, event.target); 
//	});

//	$(document).bind('aria.activedescendant', function(event) {
//		if (event.ariaName === 'activedescendant') {
//			console.log('%s = %s <- %s %o', event.attrName, event.newValue, event.prevValue, event.target);
//		}
//	});

	$.aria.uiClass();

	function setup( context ) {
	
		// Find elements that load content when expanded
		$(':role[data-load]', context)
			// Listen for an expanded event
			.bind('attr.aria-expanded', function(event) {
				if ( this === event.target && event.attrName === 'aria-expanded' && $.dt.bool(event.newValue) ) {
					console.log('LOAD', event);
					$(this)
						.attr('aria-busy', true)
						.load($.attr(this, 'data-load'), function() {
							setup(event.target);
							$.attr(event.target, 'aria-busy', false);
						})
						.unbind('attr.aria-expanded', arguments.callee);
				}
			});
			
		// Add an expander widget to each treeitem
		$(':role(tree)', context)
			.find(':role(treeitem)', context)
				.prepend('<div class="expander" role="presentation"></div>')
			.end()
			.bind('click.role-treeitem-expander', function(event) {
				$(event.target).closest('.expander').closest(':role(treeitem)').attrToggle('aria-expanded');
			});
		
		// Apply UI theme to tabs
		$(':role(tab)', context).addClass('ui-state-default ui-corner-tl ui-corner-tr');
		
		// Apply roles
		$(':role', context).role();
		
		// Make items sortable
//		$(':role(tree)', context)
//			.sortable({
//				items: 'li',
//				delay: 100,
//				distance: 5,
//				placeholder: 'ui-state-highlight',
//				forcePlaceholderSize: true
//			});
	}
	
	setup(document);
});

