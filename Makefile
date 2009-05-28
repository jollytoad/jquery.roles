PACKAGE = jquery-roles

MODULES = \
	jquery.within.js \
	jquery.fixfocus.js \
	jquery.param.js \
	roles.core.js \
	roles.aria.js \
	roles.aria.ui.js \
	roles.button-toggle.js \
	roles.button.js \
	roles.button.ui.js \
	roles.toolbar.js \
	roles.tablist.js \
	roles.tablist.ui.js \
	roles.tree.js \
	roles.tree.ui.js \
	roles.dialog.js \
	roles.dialog.ui.js \
	roles.layout.js

OPTIONAL_MODULES = \
	roles.live.js \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

