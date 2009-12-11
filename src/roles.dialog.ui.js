/*
 * jQuery Roles - Dialog implemented with jQuery UI @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 *   jquery.param.js
 *   ui.core.js
 *   ui.draggable.js
 *   ui.resizable.js
 */
(function($) {

function position( elem ) {
	var that = $(elem),
		elemH = that.outerHeight(true),
		elemW = that.outerWidth(true),
		winH = $(window).height(),
		winW = $(window).width(),
		top = $(document).scrollTop();
	
	if ( elemW > winW ) { elemW = that.width(winW - 20).outerWidth(true); }
	if ( elemH > winH ) { elemH = that.height(winH - 20).outerHeight(true); }
	
	that.css({
		'left': (winW - elemW)/2 + $(document).scrollLeft(),
		'top': Math.max(top, (winH - elemH)/2 + top)
	});
}

// role: dialog -> window
// attrs:
//  aria-hidden

$(':role(dialog)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'dialog')
			
			.roleAction('action-opened', function(event) {
				$(event.target)
					.prepend('<div class="ui-widget-shadow ui-widget-overlay ui-corner-all"></div>')
					.draggable({
						handle: ':role(heading)',
						distance: 10
					})
					.resizable({
						handles: 'all'
					})
					.css('position', 'absolute')
					.trigger('layout');
				
				position(event.target);
			})
			
			.roleAction('action-closed', function(event) {
				$(event.target)
					.resizable('destroy')
					.draggable('destroy')
					.find('.ui-widget-shadow:first').remove();
			});
	})
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-widget-content ui-corner-all');
	});

})(jQuery);

