/*
 * jQuery Roles IE6-CSS @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
/* Enable IE6CSS and tune it specifically for jQuery Roles.
 *
 * I'd recommend including this, and the supporting CSS file in a conditional comment:
 *
 * <!--[if lt IE 6]>
 * <link rel="stylesheet" href="theme/roles.ie6.css"/>
 * <script type="text/javascript" src="mutations.ie6css.js"/>
 * <script type="text/javascript" src="roles.ie6css.js"/>
 * <![endif]-->
 *
 * Depends:
 *   mutations.ie6css.js
 *   roles.core.js
 */
(jQuery.ie6css && (function($) {

$.ie6css.filterElem = ':role';

$.ie6css.filterAttr = function( attr ) {
	return $.roles.get(this) && /^(aria-.+|role|tabindex)$/i.test(attr);
};

$(document).ready(function() {
	$.ie6css.setup();
});

})(jQuery)
);

