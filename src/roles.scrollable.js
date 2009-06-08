/*
 * jQuery Roles - Scrollable Area @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Allow an large area to be scrolled within a smaller viewport,
 * without scrollbars.
 *
 * Depends:
 *   roles.core.js
 *   jquery.defer.js - optional, but recommended
 */
(function($) {

// TODO: Allow options to be configured
var opts = {
	namespace: 'ui-scrollable',
	container: '.ui-scrollable',
	scrollEvent: 'scroll-to',
	resizeEvent: 'resize',
	resizeDefer: 500
};

function scroll( delta ) {
	var plane = $('> div:first', this),
		inner = $('> div:first', plane).css('display', 'inline-block'),
		overflow = $(this).innerWidth() - inner.outerWidth(true);
	
	this.scrollLeft = 0;
	inner.css('display', 'block');
	plane.css('left', overflow < 0 ? Math.round(Math.max(overflow, Math.min(0, plane.position().left + (delta || 0)))) : 0);
}

var resizeBound = false;
function resizeSetup() {
	if ( !resizeBound && opts.resizeEvent ) {
		var handler = function(event) {
			$(event.target).find(opts.container).andSelf().filter(opts.container).each(scroll);
		};
		if ( $.defer ) {
			handler = $.defer(opts.resizeDefer, handler);
		}
		$(document).bind(opts.resizeEvent+'.'+opts.namespace, handler);
		resizeBound = true;
	}
}

// TODO: Fade in scroll buttons when the mouse lingers around the far edges of the viewport
// - this should probably be implemented in a separate module.

$(opts.container)

	.roleStage('dom', function() {
		// Wrap the content with two div's, the first is the large virtual plane
		// that will be moved around, the second is use to measure the actual
		// size of the content to prevent scrolling too far.
		$(this)
			.css('overflow', 'hidden')
			.wrapInner('<div><div></div></div>')
			.find('> div:first')
				.css({
					'position': 'relative',
					'left': 0,
					'width': '999999px'
				});
	})

	.roleStage('bind', function() {
		$(this)
			
			// Scroll the target element into view
			.bind(opts.scrollEvent+'.'+opts.namespace, function(event) {
				var outer = $(this),
					target = $(event.target),
					outerOffset = outer.offset(),
					targetOffset = target.offset(),
					scrollOffset = outerOffset.left - targetOffset.left;
				
				// Is the target off to the left?
				if ( scrollOffset > 0 ) {
					scroll.call(this, scrollOffset);
					return;
				}
				
				// Find the right hand offset
				scrollOffset = (outerOffset.left + outer.innerWidth()) - (targetOffset.left + target.outerWidth(true));
				
				if ( scrollOffset < 0 ) {
					scroll.call(this, scrollOffset);
				}
			})
			
			// ---- Mouse ----

			.bind('DOMMouseScroll.'+opts.namespace+' mousewheel.'+opts.namespace, function(event) {
				scroll.call(this, event.wheelDelta ? event.wheelDelta/10 : event.detail * -4);
				return false;
			});
		
		resizeSetup();
	});

})(jQuery);

