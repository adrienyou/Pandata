'use strict';

// Setting up route
angular.module('graphics').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('graphics', {
			url: '/graphics',
			templateUrl: 'modules/graphics/views/example-graphics.client.view.html'
		});
	}
]);