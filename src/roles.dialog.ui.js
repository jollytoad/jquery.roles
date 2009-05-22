/*
 * jQuery Roles - Dialog implemented with jQuery UI @VERSION (@DATE)
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

// role: dialog -> window
// attrs:
//  aria-hidden

$(':role(dialog)')

	.roleStage('bind', function() {
		$(this)
			.param('role', 'dialog')
			
			.roleAction('action-opened', function(event) {
				$(event.target)
					.draggable({
						handle: ':role(heading)',
						distance: 10
					})
					.resizable();
			})
			
			.roleAction('action-closed', function(event) {
				$(event.target)
					.resizable('destroy')
					.draggable('destroy');
			});
	})
	
	.roleStage('style', function() {
		$(this)
			.addClass('ui-widget ui-widget-content ui-corner-all');
	});

})(jQuery);

