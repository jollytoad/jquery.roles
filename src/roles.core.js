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
 *   jquery.param.js
 *   keys.core.js - only if roleKey() is used.
 */
(jQuery.roles || (function($) {

var rolesRE = null;

$.roles = {
	version: '@VERSION',

	// Get the roles of an element
	get: function( elem ) {
		return elem.getAttribute('role');
	},

	activeElement: function() {
		return $(document.activeElement).filter(':role');
	},

	stages: [
		'dom',		// Any necessary DOM modifications prior to binding
		'bind',		// Setup bindings for states changes, actions,
					// and user interaction events (mouse, keys, focus, etc)
		'style',	// Setup styling and bindings for changing style
		'init',		// Trigger state initialisations
		'activate'	// Activate selections, timers, animations etc.
	],
	
	// Stages to be ran in a window.setTimeout
	timeout: {
		'activate': 0
	},
	
	// Mapping of role -> array of descendant roles
	hierarchy: {},
		
	add: function( role, inherits ) {
		var i = inherits.length, h = $.roles.hierarchy, r;
		while ( i-- ) {
			r = inherits[i];
			if ( !h[r] ) {
				h[r] = [];
				rolesRE = null;
			}
			h[r].push(role);
		}
		return this;
	}
};

$.fn.extend({

// Apply the role
roleSetup: function( stages ) {
	var that = this;
	stages = stages || this.param('roleStages') || $.roles.stages;

	$.each(stages, function(i, stage) {
		$().triggerHandler('role-'+stage, [that]);
	});

	return this;
},

// Register a setup stage for the role
roleStage: function( stage, fn ) {
	var selector = this.selector,
		timeout = $.roles.timeout[stage],
		handler;
	
	function runStage(event, context) {
		$(selector, context).each(function(i, elem) {

/*DEBUG*roleStage*
			console.log(stage, this);
*DEBUG*roleStage*/

			fn.call(this, event);
		});
	}
	
	if ( typeof timeout === 'number' ) {
		handler = function(event, elems) {
			window.setTimeout(function() {
				runStage(event, elems);
			}, timeout);
		};
	} else {
		handler = runStage;
	}
	
	$().bind('role-'+stage, handler);
	return this;
},

// Register a role action
roleAction: function( action ) {
	var role = this.param('role') || 'unknown',
		args = Array.prototype.slice.apply(arguments);
	args[0] = action + '.role-' + role;
	return $.fn.bind.apply(this, args);
},

// Register a key -> event mapping for the role
roleKey: function( combo, action, keyEvent ) {
	var role = this.param('role') || 'unknown',
		type = keyEvent || this.param('keyEvent') || 'keydown';

	function handler(event) {
		if ( !event.isDefaultPrevented() ) {
			$.roles.activeElement().trigger(action);
		}
		event.preventDefault();
	}

	return this.unbind(type+'.key:'+combo).bind(type+'.role-'+role+'.key:'+combo, handler);
},

roleBind: function( type, triggerEvent ) {
	var role = this.param('role') || 'unknown';

	function handler(event) {
		$(event.target).trigger(triggerEvent);
	}

	return this.bind(type+'.role-'+role, handler);
}

}); // $.fn.extend


function rolesMatch( roleExpr, roles ) {
	var expr = roleExpr, m;
	
	if ( !rolesRE ) {
		rolesRE = (function(h) {
			var a = [];
			$.each(h, function(r) { a.push(r); });
			return new RegExp("\\b(" + a.join('|') + ")\\b", 'g');
		})($.roles.hierarchy);
	}
	
	while ( (m = rolesRE.exec(roleExpr)) && m[1] ) {
		expr += '|' + $.roles.hierarchy[m[1]].join('|');
	}
	
	return new RegExp("\\b(" + expr + ")\\b").test(roles);
}

// :role() selector
$.extend($.expr[':'], {
	role: function( elem, i, match ) {
		var roles = $.roles.get(elem);
		return roles && ( !match[3] || rolesMatch(match[3], roles) );
	}
});

})(jQuery)
);

