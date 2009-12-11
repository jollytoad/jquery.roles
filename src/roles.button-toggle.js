/*
 * jQuery Roles - Toggle Button @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* An implementation of the ARIA role: button (with aria-pressed set)
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.attr.js
 *   datatypes.core.js
 */
(function($) {

/* role: button -> input -> widget
 * attrs:
 *   aria-controls - the elements to trigger events or attribute changes
 *   aria-pressed  - if set, the targetted attribute will be set to the same state
 *   data-attr     - a boolean attribute to set on the target element
 */
$(':role(button)[aria-pressed][data-attr]')

	.roleStage('bind', function() {
		$(this)
			.bind('attr.@aria-pressed.role-button', function(event) {
				var attr = $.attr(this, 'data-attr'),
					pressed = $.dt.bool(event.newValue);
					
				if ( pressed === true || pressed === false ) {
					if ( /^\!/.test(attr) ) {
						attr = attr.substring(1);
						pressed = !pressed;
					}
			
					$.dt.attr(this, 'aria-controls', 'idrefs').attr(attr, pressed);
				}
			})
			
			.bind('attr.@aria-controls.role-button', function(event) {
				var button = this,
					id = $.id(this),
					attr = $.attr(button, 'data-attr'),
					not = /^\!/.test(attr);
				
				if ( not ) {
					attr = attr.substring(1);
				}
				
				// Unbind from previous target elements
				$.dt.idrefs(event.prevValue).unbind('.'+id);
				
				// Bind for changes to the new target attributes
				$.dt.idrefs(event.newValue).bind('attr.@'+attr+'.'+id, function(event) {
					
					// Use a timeout to ensure DOM is up to date
					window.setTimeout(function() {
						// Find the accumulative state of the attributes
						var state;					
					
						$.dt.attr(button, 'aria-controls', 'idrefs').each(function() {
							var val = $.dt.bool( $.attr(this, attr) );
						
							if ( val !== undefined ) {
								val = not ? !val : val;

								if ( state !== undefined && state !== val ) {
									state = 'mixed';
									return false;
								}
							
								state = val;
							}
						});
					
						if ( state !== undefined ) {
							$.attr(button, 'aria-pressed', state);
						}
					}, 0);
				});
			})
			
			.bind('click.role-button', function(event) {
				if ( $.roles.disabled(this) ) { return false; }
				$(this).attrToggle('aria-pressed');
				event.preventDefault();
			});
	})
	
	.roleStage('init', function() {
		$(this)
			.initMutation('attr', 'aria-controls aria-pressed');
	});

})(jQuery);

