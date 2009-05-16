jQuery(function($) {

	$.roles.uiCSS.setup();

	$(document).bind('html', function( event ) {
		var context = event.target;
			
		// Add an expander widget to each treeitem
		$(':role(tree)', context)
			.find(':role(treeitem)')
				.prepend('<div class="expander" role="presentation"></div>')
			.end()
			.bind('click.role-treeitem-expander', function(event) {
				$(event.target).closest('.expander').closest(':role(treeitem)').attrToggle('aria-expanded');
			});
		
		// Apply UI theme to tabs
		$(':role(tab)', context).addClass('ui-state-default ui-corner-tl ui-corner-tr');
		
		// Apply roles
		$(':role', context).role();
		
		// Load dynamic content when element is un-hidden
		$(':role[aria-hidden=true][data-load]', context)
			.bind('pre-attr.@aria-hidden', function(event) {
				var fn = arguments.callee;
				
				// Prevent the element from becoming visible until loaded
				event.preventDefault();
				
				$(this).load($.attr(this, 'data-load'), function() {
					$(event.target)
						.unbind('pre-attr', fn)
						.removeAttr('data-load')
						.removeAttr('aria-hidden');
				});
			});
		
		if ( context === document ) {
			// Focus the first tab
			$(':role(tab):first', context).focus();
		}
	})
	.initMutation('html');

});

