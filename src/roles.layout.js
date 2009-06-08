/*
 * jQuery Roles - Layout manager @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 */
(function($) {

// TODO: Allow options to be configured
var opts = {
	container: '.ui-layout',
	center: '.ui-layout-center',
	north: '.ui-layout-north',
	east: '.ui-layout-east',
	south: '.ui-layout-south',
	west: '.ui-layout-west',
	editor: '.ui-layout-editor',
	resizeEvent: 'resize.ui-layout'
};

// Get dimensions of surounding panels for a layout
function dims( context ) {
	return {
		top: $(opts.north, context).outerHeight(true) || 0,
		right: $(opts.east, context).outerWidth(true) || 0,
		bottom: $(opts.south, context).outerHeight(true) || 0,
		left: $(opts.west, context).outerWidth(true) || 0
	};
}

// Fix layout for faulty browsers (IE6)
function fixLayout() {
	var context = this;
	window.setTimeout(function() {
		var d = dims(context),
			h = $(context).height() - d.top - d.bottom,
			w = $(context).width();

		// Vertical position/size of middle row of panels
		$(opts.west+','+opts.center+','+opts.east, context).css('top', d.top).height(h);

		// Set the width of the top/bottom panels
		$(opts.north+','+opts.south, context).width(w);

		// Horizontal position/size of center panel
		$(opts.center, context).css('left', d.left).width(w - d.left - d.right);

		// Set height of a fitted textarea
		$(opts.editor+' textarea', context).height(h-2);
	}, 0);
}

// Fix editor for faulty browsers (IE7)
function fixEditor() {
	var context = this;
	window.setTimeout(function() {
		var editor = $(opts.editor, context);
		$('textarea', editor).height(editor.height());
	}, 0);
}

var resizeBound = false;

// Fix faulty browsers (IE6)
function fix( fixFn, context ) {
	fixFn.apply(context);
	
	if ( !resizeBound && opts.resizeEvent ) {
		$(document).bind(opts.resizeEvent, function(event) {
			$(event.target).find(opts.container).andSelf().filter(opts.container).each(fixFn);
		});
		resizeBound = true;
	}
}

// Check that the layout has worked, and apply fixes if not
function check( context ) {
	window.setTimeout(function() {
		var h = $(context).outerHeight();
		
		$(opts.north+','+opts.center+','+opts.south, context)
			.filter(':visible')
			.each(function() {
				h -= $(this).outerHeight();
			});
		
		if ( h !== 0 ) {
/*DEBUG*layout*
			alert('fix layout');
*DEBUG*layout*/
			fix(fixLayout, context);
		} else {
			var t = $(opts.editor+' textarea', context);
			if ( t.length && t.outerHeight() !== $(opts.editor, context).outerHeight() ) {
/*DEBUG*layout*
				alert('fix editor');
*DEBUG*layout*/
				fix(fixEditor, context);
			}
		}
	}, 0);
}

// Layout the panels
function layout( context ) {
	window.setTimeout(function() {
		var d = dims(context);
		$(opts.center, context).css(d);
		$(opts.west+','+opts.east, context).css({top: d.top, bottom: d.bottom});
		check(context);
	}, 0);
}

// Automatically apply the layout
$(opts.container)
	.roleStage('activate', function() {
		layout(this);
	});

})(jQuery);

