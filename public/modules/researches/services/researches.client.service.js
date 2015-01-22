'use strict';

//Researches service used for communicating with the researches REST endpoints
angular.module('researches').factory('Researches', ['$resource',
	function($resource) {
		return $resource('researches/:researchId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);