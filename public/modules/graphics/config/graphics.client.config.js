'use strict';

// Configuring the Researches module
angular.module('graphics').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Graphics', 'graphics','graphics');
	}
]);