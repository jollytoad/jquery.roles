/*
 * jQuery Roles - Layout manager @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Depends:
 *   roles.core.js
 *   jquery.defer.js - optional
 */
(function($) {

// TODO: Allow options to be configured
var opts = {
	namespace: 'ui-layout',
	container: '.ui-layout',
	center: '.ui-layout-center',
	north: '.ui-layout-north',
	east: '.ui-layout-east',
	south: '.ui-layout-south',
	west: '.ui-layout-west',
	inner: '.ui-layout-inner',
	resizeEvent: 'resize',
	resizeDefer: 200
};

var layoutBound = false;

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

		// Set height of a fitted inner element
		$(opts.center+' '+opts.inner, context).height(h-2);
	}, 0);
}

function onResize(handler) {
	$(document).bind(opts.resizeEvent+'.'+opts.namespace, $.defer ? $.defer(opts.resizeDefer, handler) : handler);
}

// Fix faulty browsers (IE6)
function fix( fixFn, context ) {
	fixFn.apply(context);
	
	if ( opts.resizeEvent ) {
		onResize(function(event) {
			$(event.target).find(opts.container).andSelf().filter(opts.container).each(fixFn);
		});
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
			// Check whether fitted inner elements fit as expected
			$(opts.inner, context).each(function() {
				var self = $(this),
					parent = $(this).parent();
				
				function fixHeight() {
					window.setTimeout(function() {
						self.height(parent.height());
					}, 0);
				}
				
				if ( self.height() !== parent.height() ) {
/*DEBUG*layout*
					alert('fix inner');
*DEBUG*layout*/
					fixHeight();
					onResize(fixHeight);
				}
			});
		}
	}, 0);
}

// Layout the panels
function layout() {
	var context = this;
	window.setTimeout(function() {
		if ( $(context).is(':visible') ) {
			var d = dims(context);
			$(opts.center, context).css(d);
			$(opts.west+','+opts.east, context).css({top: d.top, bottom: d.bottom});
			
			if ( !$(context).data('ui-layout-fixed') ) {
				check(context);
				$(context).data('ui-layout-fixed', true);
			}
		}
	}, 0);
}

// Automatically apply the layout
$(opts.container)
	.roleStage('bind', function() {
		if ( !layoutBound ) {
			$(document).bind('layout.'+opts.namespace, function(event) {
				$(event.target)
					.find(opts.container)
					.each(layout);
			});
			layoutBound = true;
		}
	})
	.roleStage('activate', function() {
		layout.apply(this);
	});

})(jQuery);

