/*
 * jQuery Roles - ARIA Toolbar Widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA roles: toolbar
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 *   jquery.within.js
 *   jquery.param.js
 */
(function($) {

// role: toolbar -> group -> section -> structure

$(':role(toolbar)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'toolbar')
			
			.find(':role')
				.attr('tabindex', -1)
			.end()
			
			.find(':role:first')
				.attr('tabindex', 0)
			.end()
			
			// ---- Actions ----

			// Focus previous item
			.roleAction('action-prev', function(event) {
				var prev = $(event.target).prevInDoc(':role(button)').within(this);
				if ( prev.length ) {
					$.attr(event.target, 'tabindex', -1);
					prev.attr('tabindex', 0).focus();
				}
				return false;
			})
			// Focus next item
			.roleAction('action-next', function(event) {
				var next = $(event.target).nextInDoc(':role(button)').within(this);
				if ( next.length ) {
					$.attr(event.target, 'tabindex', -1);
					next.attr('tabindex', 0).focus();
				}
				return false;
			})
			// Focus first item
			.roleAction('action-first', function(event) {
				$.attr(event.target, 'tabindex', -1);
				$(':role(button):first', this).attr('tabindex', 0).focus();
				return false;
			})
			// Focus last item
			.roleAction('action-last', function(event) {
				$.attr(event.target, 'tabindex', -1);
				$(':role(button):last', this).attr('tabindex', 0).focus();
				return false;
			})

			// ---- Mouse ----
			
			.bind('mouseup.role-toolbar', ':role(button)', $.roles.focusDescendant)
			
			// ---- Keyboard ----
			
			.roleKey('left', 'action-prev')
			.roleKey('right', 'action-next')
			.roleKey('home', 'action-first')
			.roleKey('end', 'action-last')
					
			.end();
	});

})(jQuery);

