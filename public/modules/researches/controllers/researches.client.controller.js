'use strict';

angular.module('researches').controller('ResearchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Researches', 'Users',
	function($scope, $stateParams, $location, Authentication, Researches, Users) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.duration = '1';

		$scope.create = function() {

			var title = $scope.title;
			var description = $scope.description;
			var words = $scope.words;
			var duration = $scope.duration;

			var user = ' ||| FirstName: ' + $scope.user.firstName + ' LastName: ' + $scope.user.lastName + ' ID: ' + $scope.user._id;

			var subject = 'New Research Request';
			var body = 'New Research Request with || TITLE: ' + title + 
						' || DESCRIPTION: ' + description + ' || WORDS: ' + words + 
						' || DURATION: ' + duration + ' weeks.' + user;

			var email = 'support_pandata@outlook.com';

			window.open('mailto:' + email + '?subject='+ subject+ '&body=' + body);
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