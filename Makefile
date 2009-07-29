PACKAGE = jquery.roles

MODULES = \
	jquery.within.js \
	jquery.fixfocus.js \
	jquery.param.js \
	roles.core.js \
	roles.aria.js \
	roles.composite.js \
	roles.option.js \
	roles.button-toggle.js \
	roles.button.js \
	roles.toolbar.js \
	roles.tablist.js \
	roles.tree.js \
	roles.listbox.js \
	roles.dialog.js \
	roles.layout.js \
	roles.scrollable.js

OPTIONAL_MODULES = \
	roles.live.js \
	roles.ie6css.js \
	roles.ie6fixpng.js

EXTRAS = \
	theme

CSS_DIR = theme
CSS = \
	ui.layout.css

include build/rules.mk

