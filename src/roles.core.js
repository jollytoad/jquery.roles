/*!
 * jQuery Roles Framework @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* A widget activation framework based on role concept of HTML5/WAI-ARIA.
 *
 * Depends:
 *	mutations.core.js
 *	mutations.attr.js
 *	jquery.datatypes.js
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

// Initialise the element as the given role or it's role attribute
role: function( setrole ) {
	return this.each(function() {
		var self = $(this);
		
		// Initialise new roles
		$.dt.tokens( setrole || $.roles.get(this) ).each(function() {
			var roleData = 'role-' + this;
			
			if ( !self.data(roleData) ) {
			
//				console.log('role', role, self);

				// Call the registered constructor function
				var construct = $.roles.widgets[this];
				
				self.data(roleData,
					$.isFunction(construct) ? construct.call(self, this) || true : true);

				self.trigger('role', [{ role: this }]);
			}
		});
	});
}

}); // $.fn.extend


// :role() selector
$.extend($.expr[':'], {
	role: function( elem, i, match ) {
		var role = $.roles.get(elem);
		return role && (!match[3] || ((' '+role+' ').indexOf(' '+match[3]+' ') >= 0));
	}
});

})(jQuery)
);

