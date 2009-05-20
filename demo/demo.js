jQuery(function($) {

	$(document).bind('html', function( event ) {
	
		// Find all role elements
		$(':role', event.target)
			
			// Setup event bindings and initial states for widgets
			.role('setup init')
		
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
			.role('activate');
	})
	.initMutation('html');

});

