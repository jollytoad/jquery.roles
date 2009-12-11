/*
 * jQuery Roles IE6 PNG Alpha Transparency fix @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Enable IE6CSS and tune it specifically for jQuery Roles.
 *
 * I'd recommend including this in a conditional comment:
 *
 * <!--[if lt IE 6]>
 * <script type="text/javascript" src="roles.ie6fixpng.js"/>
 * <![endif]-->
 *
 * Depends:
 *   roles.core.js
 */
(function($) {

$('.fixpng')
	.roleStage('activate', function() {
		// Code adapted from http://allinthehead.com/code/sleight/supersleight.plugin.js		
		var self = $(this),
			bg = self.css('background-image');
		
		if ( bg && bg.match(/\.png/i) !== null ) {
			self.css({
				'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
					bg.substring(5,bg.length-2) + "', sizingMethod='" + 
					(self.css('background-repeat') == 'no-repeat' ? 'crop' : 'scale') + "')",
				'background-image': 'none'
			});
		}
	});
	
})(jQuery);

