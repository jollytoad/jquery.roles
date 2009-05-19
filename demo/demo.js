jQuery(function($) {

	$.roles.uiCSS.setup();

	$(document).bind('html', function( event ) {
	
		// Find all role elements
		$(':role', event.target)
		
			// Add an expander widget to each treeitem
			.filter(':role(treeitem)')
				.prepend('<div class="expander" role="presentation"></div>')
				.bind('click.role-treeitem-expander', function(event) {
					$(event.target).closest('.expander').closest(':role(treeitem)').attrToggle('aria-expanded');
				})
			.end()
		
			// Apply UI theme to tabs
			.filter(':role(tab)')
				.addClass('ui-state-default ui-corner-tl ui-corner-tr')
			.end()
		
			// Setup event bindings and initial states for widgets
			.role('setup keys init')
		
			// Load dynamic content when element is un-hidden
			.filter('[aria-hidden=true][data-load]')
				.bind('pre-attr.@aria-hidden', function(event) {
					var fn = arguments.callee,
						target = $(event.target);
				
					// Prevent the element from becoming visible until loaded
					event.preventDefault();
				
					target.load(target.attr('data-load'), function() {
						target
							.unbind('pre-attr', fn)
							.removeAttr('data-load')
							.removeAttr('aria-hidden');
					});
				})
			.end()
			
			// Activate active items
			.role('active');
	})
	.initMutation('html');

});

