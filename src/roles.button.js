/*
 * jQuery Roles - ARIA Button Widget @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA role: button
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 */
(function($) {

$.roles.add('button', ['input','widget']);

function controls( button ) {
	var idrefs = $.attr(button, 'aria-controls');
	return idrefs ? $.dt.idrefs(idrefs) : $(button);
}

/* role: button -> input -> widget
 * attrs:
 *   aria-disabled
 *   aria-controls - the elements to trigger events or attribute changes (controls itself if not set)
 *   data-trigger  - an event to trigger on the target element
 *   data-attr     - an attribute to set/toggle on the target element
 *   data-val      - the value to set the attribute to, if not present, then the attribute is toggled
 */
$(':role(button)')
	
	.roleStage('bind', function() {
		$(this)
			.attr('tabindex', 0)
			
			// ---- Mouse ----
			
			.filter('[data-attr]:not([aria-pressed])')
				.bind('click.role-button', function(event) {
					if ( $.roles.disabled(this) ) { return false; }
					
					var val = $.attr(this, 'data-val'),
						attr =  $.attr(this, 'data-attr');
					
					if ( val === undefined ) {
						controls(this).attrToggle(attr);
					} else {
						controls(this).attr(attr, val);
					}
					event.preventDefault();
				})
			.end()
			
			.filter('[data-trigger]')
				.bind('click.role-button', function(event) {
					if ( $.roles.disabled(this) ) { return false; }
					controls(this).trigger( $.attr(this, 'data-trigger') );
					event.preventDefault();
				});
	});

})(jQuery);

