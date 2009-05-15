PACKAGE = jquery-roles

MODULES = \
	roles.core.js\
	roles.keys.js\
	roles.aria.js\
	roles.ui-css.js\
	roles.tablist.js\
	roles.tree.js

OPTIONAL_MODULES = \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

