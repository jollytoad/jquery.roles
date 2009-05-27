/*
 * jQuery Roles - Dialog implemented with jQuery UI @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 */
(function($) {

$(':role(button)')
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-button ui-widget ui-state-default ui-corner-all')
			
			.bind('attr.@disabled.@aria-disabled', function(event) {
				$(this).toggleClass('ui-state-disabled', $.roles.disabled(this));
			})
			
			.bind('focus.role-button', function() {
				$(this).addClass('ui-state-focus');
			})
			
			.bind('blur.role-button', function() {
				$(this).removeClass('ui-state-focus');
			})
			
			.bind('mouseenter.role-button', function() {
				if ( $.roles.disabled(this) ) { return; }
				$(this).addClass('ui-state-hover');
			})
			.bind('mouseleave.role-button', function() {
				$(this).removeClass('ui-state-hover');
			})
			
			.filter(':not([aria-pressed])')
				.bind('mousedown.role-button', function() {
					if ( $.roles.disabled(this) ) { return; }
					$(this).addClass('ui-state-active');
				})
				.bind('mouseup.role-button mouseleave.role-button', function() {
					$(this).removeClass('ui-state-active');
				})
			.end()
			
			.filter('[aria-pressed]')
				.bind('attr.@aria-pressed.role-button', function(event) {
					var pressed = $.dt.bool(event.newValue);
					$(this).removeClass('ui-state-highlight ui-state-error');
					
					if ( pressed === true ) {
						$(this).addClass('ui-state-highlight');
					} else if ( pressed !== false ) {
						$(this).addClass('ui-state-error');
					}
				})
			.end();
	});

})(jQuery);

