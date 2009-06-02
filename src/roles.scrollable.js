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
 */
(function($) {

function scroll( delta ) {
	var plane = $('> div:first', this),
		inner = $('> div:first', plane).css('display', 'inline-block'),
		max = $(this).innerWidth() - inner.outerWidth(true),
		left = plane.position().left;
	
	plane.css('left', Math.round(Math.max(max, Math.min(0, left + delta))));
}

// TODO: Fade in scroll buttons when the mouse lingers around the far edges of the viewport

$(':role.ui-scrollable')

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
			.bind('scroll-to.ui-scrollable', function(event) {
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

			.bind('DOMMouseScroll.ui-scrollable mousewheel.ui-scrollable', function(event) {
				scroll.call(this, event.wheelDelta ? event.wheelDelta/10 : event.detail * -4);
				return false;
			});
	});

})(jQuery);

