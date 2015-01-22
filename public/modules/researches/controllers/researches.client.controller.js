'use strict';

angular.module('researches').controller('ResearchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Researches',
	function($scope, $stateParams, $location, Authentication, Researches) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var research = new Researches({
				title: this.title,
				content: this.content
			});
			research.$save(function(response) {
				$location.path('researches/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(research) {
			if (research) {
				research.$remove();

				for (var i in $scope.researches) {
					if ($scope.researches[i] === research) {
						$scope.researches.splice(i, 1);
					}
				}
			} else {
				$scope.research.$remove(function() {
					$location.path('researches');
				});
			}
		};

		$scope.update = function() {
			var research = $scope.research;

			research.$update(function() {
				$location.path('researches/' + research._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.researches = Researches.query();
		};

		$scope.findOne = function() {
			$scope.research = Researches.get({
				researchId: $stateParams.researchId
			});
		};
	}
]);