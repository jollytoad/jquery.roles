/*
 * jQuery Roles - Layout manager @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 */
(function($) {

// Get dimensions of surounding panels for a layout
function dims( context ) {
	return {
		top: $('.ui-layout-north', context).outerHeight(true) || 0,
		bottom: $('.ui-layout-south', context).outerHeight(true) || 0,
		right: $('.ui-layout-east', context).outerWidth(true) || 0,
		left: $('.ui-layout-west', context).outerWidth(true) || 0
	};
}

var layout, resize;

// Adjust the dimensions of layout panels
if ( $.browser.msie ) {
	layout = function() {
		var self = this;

		// Use a setTimeout to ensure the display has been refreshed
		window.setTimeout(function() {
			var d = dims(self),
				layout = $(self),
				h = layout.height() - d.top - d.bottom;

			$('.ui-layout-center,.ui-layout-east,.ui-layout-west', self)
				.css('top', d.top)
				.height(h);
			
			$('.ui-layout-center,.ui-layout-north,.ui-layout-south', self)
				.css('left', d.left)
				.width(layout.width() - d.left - d.right);
		
			$('.ui-layout-editor textarea', self).height(h-2);
		}, 0);
	};
	
	$(document).bind('resize.ui-layout', function(event) {
		$(event.target).find('.ui-layout').andSelf().filter('.ui-layout').each(layout);
	});
} else {
	layout = function() {
		var self = this;
		window.setTimeout(function() {
			var d = dims(self);
			$('.ui-layout-center', self).css(d);
			$('.ui-layout-east,.ui-layout-west', self).css({top: d.top, bottom: d.bottom});
		}, 0);
	};
}

$(':role.ui-layout')
	.roleStage('activate', function() {
		layout.apply(this);
	});

})(jQuery);

