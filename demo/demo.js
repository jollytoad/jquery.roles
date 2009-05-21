(function($) {

$(':role[aria-hidden=true][data-load]')

	.roleStage('custom', function() {
		$(this)
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
			});
	});

$(':role(button)[aria-controls]')
	
	.roleStage('interaction', function() {
		$(this)
			.bind('click.role-button', function(event) {
				console.log('CLICK');
				$.dt.attr(this, 'aria-controls', 'idrefs').attr('aria-hidden', false);
			});
	});

})(jQuery);

