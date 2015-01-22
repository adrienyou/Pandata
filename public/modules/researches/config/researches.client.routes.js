'use strict';

// Setting up route
angular.module('researches').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listResearches', {
			url: '/researches',
			templateUrl: 'modules/researches/views/list-researches.client.view.html'
		}).
		state('createResearch', {
			url: '/researches/create',
			templateUrl: 'modules/researches/views/create-research.client.view.html'
		}).
		state('viewResearch', {
			url: '/researches/:articleId',
			templateUrl: 'modules/researches/views/view-research.client.view.html'
		}).
		state('editResearch', {
			url: '/researches/:researchId/edit',
			templateUrl: 'modules/researches/views/edit-research.client.view.html'
		});
	}
]);