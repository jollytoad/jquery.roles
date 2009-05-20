PACKAGE = jquery-roles

MODULES = \
	roles.core.js \
	roles.aria.js \
	roles.keymap.js \
	roles.tablist.js \
	roles.tree.js \
	roles.tablist.uicss.js \
	roles.tree.uicss.js

OPTIONAL_MODULES = \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

