'use strict';

// Configuring the Researches module
angular.module('researches').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Researches', 'researches', 'dropdown', '/researches(/create)?');
		Menus.addSubMenuItem('topbar', 'researches', 'List Researches', 'researches');
		Menus.addSubMenuItem('topbar', 'researches', 'New Research', 'researches/create');
	}
]);