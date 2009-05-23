(function($) {

$(':role[data-load]')

	.roleStage('bind', function() {
		$(this)
			.bind('pre-attr.@aria-hidden', function(event) {
				if ( !$.dt.bool(event.newValue) ) {
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
				}
			});
	});

$('#editor-dialog')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'dialog')
			
			.roleAction('action-apply', function(event) {
				if ( $.dt.attr(this, 'data-modified', 'bool') ) {
//					console.log('apply');
				
					// ... save changes here ...
				
					$.attr(this, 'data-modified', false);
				}
				return false;
			})
			
			.roleAction('action-ok', function(event) {
//				console.log('ok');
				$(this)
					.trigger('action-apply')
					.attr('aria-hidden', true);
				return false;
			})
			
			.roleAction('action-cancel', function(event) {
//				console.log('cancel');
				
				// ... revert changes ...
				
				$(this)
					.attr('data-modified', false)
					.attr('aria-hidden', true);
				return false;
			})
			
			// Catch change events from inputs
			.bind('change', function(event) {
				$(this).attr('data-modified', true);
			});
	});

// Disable the APPLY button until something is changed
$(':role(dialog) :role(button)[data-trigger=action-apply]')
	.roleStage('bind', function(event) {
		var button = this;
		$(button).parents(':role(dialog)')
			.bind('attr.@data-modified', function(event) {
				$.attr(button, 'aria-disabled', !$.dt.bool(event.newValue));
			});
	})
	.roleStage('init', function(event) {
		$(this).parents(':role(dialog)')
			.initMutation('attr', 'data-modified', false);
	});

})(jQuery);

