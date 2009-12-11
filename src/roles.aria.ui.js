/*
 * jQuery Roles - ARIA to jQuery UI styling @VERSION
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
 */
(function($) {

$(':role')
	.roleStage('style', function() {
		$(this)
			.bind('attr.@aria-hidden', function(event) {
				$(this).toggleClass('ui-helper-hidden', $.dt.bool(event.newValue));
			});
	})
	
	.roleStage('init', function() {
		$(this)
			.initMutation('attr', 'aria-hidden', false);
	});

})(jQuery);

