/*
 * jQuery Roles - Tablist Styling @VERSION (@DATE)
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

$(':role(tablist)')
	.roleStage('style', function() {
		$(this)
			.addClass('ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-top')
			
			.bind('attr.@aria-activedescendant', function(event) {
				$.dt.idrefs(event.prevValue).removeClass('ui-state-active');
				$.dt.idrefs(event.newValue).addClass('ui-state-active');
			});
	});

$(':role(tab)')
	.roleStage('style', function() {
		$(this).addClass('ui-state-default ui-corner-top');
	});

})(jQuery);

