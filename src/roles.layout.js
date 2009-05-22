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
	
	// Adjust the dimensions of layout panels
function layout() {
	var self = this;
	window.setTimeout(function() {
		var d = dims(self);
		$('.ui-layout-center', self).css(d);
		$('.ui-layout-east,.ui-layout-west', self).css({top: d.top, bottom: d.bottom});
	}, 0);
}

$(':role.ui-layout')
	.roleStage('activate', function() {
		layout.apply(this);
	});

})(jQuery);

