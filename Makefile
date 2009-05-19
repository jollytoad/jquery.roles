PACKAGE = jquery-roles

MODULES = \
	roles.core.js \
	roles.aria.js \
	roles.keymap.js \
	roles.ui-css.js \
	roles.tablist.js \
	roles.tree.js

OPTIONAL_MODULES = \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

