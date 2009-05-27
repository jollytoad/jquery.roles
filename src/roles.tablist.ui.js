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
//	.roleStage('dom', function() {
//		var all = $(this).find(':role(tab)');
//		$(all).each(function() {
//			Array.prototype.push.apply(all, $.roles.slaves(this).filter(':role(tabpanel)').get());
//		});
//		all.andSelf().parent('.ui-tabs').addClass('ui-widget');
//		
//		console.log(all);
//		
////		if ( !all.length ) {
////			all.end().wrapAll('<div class="ui-tabs"></div>');
////		}
//	})
	.roleStage('style', function() {
		$(this)
			.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-top')
			
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
			.addClass('ui-state-default ui-corner-top')

			.bind('focus.role-tab', function() {
				$(this).closest(':role(tablist)').andSelf().addClass('ui-state-focus');
			})
			
			.bind('blur.role-tab', function() {
				$(this).closest(':role(tablist)').andSelf().removeClass('ui-state-focus');
			});
	});

$(':role(tabpanel')
	.roleStage('style', function() {
		$(this)
			.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom');
	});

})(jQuery);

