/*!
 * jQuery Roles Framework @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* A widget activation framework based on the role concept of HTML5/WAI-ARIA,
 * and DOM Mutation Events.
 *
 * Depends:
 *	mutations.core.js
 *	mutations.attr.js
 *	datatypes.core.js
 */
(jQuery.roles || (function($) {

var idPrefix = 'id' + (+new Date()) + '-', id = 0;

$.roles = {
	version: '@VERSION',

	// Installed widgets
	widgets: {},

	// Get the roles of an element
	get: function( elem ) {
		return elem.getAttribute('role');
	},

	uniqueId: function() {
		return idPrefix + (++id);
	},
	
	action: function( elem, role, action, args ) {
		var widget = $.data(elem, 'role-'+role),
			fn = widget && widget.actions && widget.actions[action];
	
		return fn && fn.apply(elem, args);
	}
};

// jQuery plugins

$.fn.extend({

// Toggle a boolean attribute state.
// Only toggles if the state is already set, unless a default value is given.
attrToggle: function( attr, def ) {
	return this.each(function() {
		var state = $.dt.bool( $.attr(this, attr) );

		// Use the given default as the current state if not set yet
		if ( state === undefined ) { state = def; }

		// Only toggle the state if it is already set
		if ( state !== undefined ) {
			$.attr(this, attr, ""+!state);
		}
	});
},

// Initialise the element from it's role attribute
role: function( actions ) {
	var that = this;
	$.dt.tokens( actions || 'setup keys init activate' ).each(function(n, action) {
		that.each(function() {
			var elem = this;
			
			// Initialise new roles
			$.dt.tokens( $.roles.get(elem) ).each(function(n, role) {
				var roleData = 'role-' + role,
					widget = $.data(elem, roleData) || $.extend({}, $.roles.widgets[role]),
					fn = widget[action];
				
				if ( $.isFunction(fn) ) {
/*DEBUG*role*
					console.log(action, role, elem);
*DEBUG*role*/
					fn.call(elem, role);
					delete widget[action];
				}
				
				$.data(elem, roleData, widget);
			});
		});
	});
	return this;
}

}); // $.fn.extend


// :role() selector
$.extend($.expr[':'], {
	role: function( elem, i, match ) {
		var roles = $.roles.get(elem);
		return roles && (!match[3] || ((' '+roles+' ').indexOf(' '+match[3]+' ') >= 0));
	}
});

})(jQuery)
);

