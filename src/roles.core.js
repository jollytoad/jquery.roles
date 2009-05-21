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

	// Get the roles of an element
	get: function( elem ) {
		return elem.getAttribute('role');
	},

	uniqueId: function() {
		return idPrefix + (++id);
	},
	
	activeElement: function() {
		return $(document.activeElement).filter(':role');
	},
	
	stages: [
		'states',		// Setup bindings for states changes
		'actions',		// Register widget actions
		'interaction',	// Bind user interaction events (mouse, keyboard, focus, etc.)
		'style',		// Setup presentation/styling and bindings for changing style
		'init',			// Trigger state initialisations
		'custom',		// Main point for additional
		'activate'		// Activate initial selections etc.
	]
};


$.fn.extend({

// Toggle a boolean attribute state.
// Only toggles if the state is already set, unless a default value is given.
// (Maybe this should be moved into jquery.datatypes???)
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
	var selector = this.selector;
	$().bind('role-'+stage, function(event, elems) {
		elems.filter(selector).each(function() {
/*DEBUG*
			console.log(stage, this);
*DEBUG*/
			fn.call(this, event);
		});
	});
	
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
	
	return this.bind(type+'.role-'+role+'.key:'+combo, handler);
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

