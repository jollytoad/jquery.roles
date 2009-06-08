/*
 * jQuery Roles - Live Setup @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* Automatically apply roles to existing and new content
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.html.js
 */
(function($) {

$(document)
	.bind('html', function( event ) {
	
		// Move head only elements into head, otherwise Safari ignores them
		$('link,meta,style', event.target).appendTo('head');

/*PROFILE*roleSetup*
		console.profile('roleSetup');
*PROFILE*roleSetup*/

		// Find and setup all role elements
		$(event.target).roleSetup();

/*PROFILE*roleSetup*
		console.profileEnd();
*PROFILE*roleSetup*/

	})
	.ready(function() {
		$(document.body).initMutation('html');
	});

})(jQuery);

