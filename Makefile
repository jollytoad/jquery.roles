PACKAGE = jquery-roles

MODULES = \
	jquery.within.js \
	jquery.fixfocus.js \
	jquery.param.js \
	roles.core.js \
	roles.aria.js \
	roles.aria.ui.js \
	roles.composite.js \
	roles.option.js \
	roles.button-toggle.js \
	roles.button.js \
	roles.button.ui.js \
	roles.toolbar.js \
	roles.tablist.js \
	roles.tablist.ui.js \
	roles.tree.js \
	roles.tree.ui.js \
	roles.listbox.js \
	roles.dialog.js \
	roles.dialog.ui.js \
	roles.layout.js \
	roles.scrollable.js

OPTIONAL_MODULES = \
	roles.live.js \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

