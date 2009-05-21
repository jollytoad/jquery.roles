PACKAGE = jquery-roles

MODULES = \
	jquery.param.js \
	roles.core.js \
	roles.aria.js \
	roles.tablist.js \
	roles.tree.js \
	roles.dialog.js \
	roles.tablist.uicss.js \
	roles.tree.uicss.js

OPTIONAL_MODULES = \
	roles.live.js \
	roles.ie6css.js

EXTRAS = \
	theme

include build/rules.mk

