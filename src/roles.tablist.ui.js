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
			.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix')
			
			.bind('attr.@aria-activedescendant', function(event) {
				$.dt.idrefs(event.prevValue).removeClass('ui-state-active');
				$.dt.idrefs(event.newValue).addClass('ui-state-active');
			});
	});

$(':role(tab)')
	.roleStage('dom', function() {
		// Ensure that tab content is wrapped in an <a>
		$(this)
			.filter('li:not(:has(a))')
			.wrapInner('<a href="#" tabindex="-1"></a>')
			.find('a')
			.bind('click.role-tab', function(event) { event.preventDefault(); });
	})
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-widget ui-state-default ui-corner-top')

			.bind('focus.role-tab', function() {
				$(this).addClass('ui-state-focus');
			})
			
			.bind('blur.role-tab', function() {
				$(this).removeClass('ui-state-focus');
			});
	});

})(jQuery);

