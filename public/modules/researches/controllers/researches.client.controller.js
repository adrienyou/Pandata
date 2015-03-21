'use strict';

 var  graphs = [{ graphName: 'Pie Chart', show: true, id: 0 }, 
      { graphName: 'Bubble Chart', show: true, id: 1 },
      { graphName: 'Time Line Chart', show: true, id: 2 },
      { graphName: 'Buzz Chart', show: true, id: 3 },
      { graphName: 'Something Chart', show: true, id: 4 }];

angular.module('researches')

.controller('ResearchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Researches', 'Users',
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

			$scope.research.$promise.then(function(data){
				var piedata = [{label: 'Positive emotion', value: data.positive_emotion},
            				{label: 'Negative emotion', value: data.negative_emotion},
            				{label: 'Neutral emotion', value: data.neutral_emotion}
            				];

    			$scope.piedata = piedata;
			});			
		};
	
		//Bind data for graphs selection
		$scope.graphs = graphs;

	    //Function to know if the checkbox Pie Chart is checked or not
	  	$scope.isPieChart = function() {
	    	var value = false;
	    	angular.forEach($scope.graphs, function(graph){
		  		if(graph.id === 0 && !graph.show) { value = true; }
			});
	    	return value;
	  	};

	  	//Function to know if the checkbox Bubble Chart is checked or not
	  	$scope.isBubbleChart = function() {
	    	var value = false;
	    	angular.forEach($scope.graphs, function(graph){
	      		if(graph.id === 1 && !graph.show) { value = true; }
	    	});
	    	return value;
	  	};

		//Function to know if the checkbox Time Line Chart is checked or not
		$scope.isTimeLine = function() {
			var value = false;
			angular.forEach($scope.graphs, function(graph){
				if(graph.id === 2 && !graph.show) { value = true; }
			});
			return value;
		};

	  	//Function to know if the checkbox Buzz Chart is checked or not
	  	$scope.isBuzzChart = function() {
	    	var value = false;
	    	angular.forEach($scope.graphs, function(graph){
	      		if(graph.id === 3 && !graph.show) { value = true; }
	    	});
	    	return value;
	  	};

	  	//Function to know if the checkbox Something Chart is checked or not
	  	$scope.isSomethingChart = function() {
	    	var value = false;
	    	angular.forEach($scope.graphs, function(graph){
	      	if(graph.id === 4 && !graph.show) { value = true; }
	    	});
	    	return value;
	  	};
	}
])

//Directive for Pie Chart
.directive('pie', function(){ 
	function link($scope, element, attr){
    //Getting data
    var resourceData = $scope.data;

    //var positive_emotion = test['positive_emotion'];

    resourceData.$promise.then(function(data){
		
		var piedata = [{label: 'Positive emotion', value: data.positive_emotion},
    				{label: 'Negative emotion', value: data.negative_emotion},
    				{label: 'Neutral emotion', value: data.neutral_emotion}
    				];

		console.log(piedata);

	    //Default settings
	    var color = d3.scale.category10();
	    var width = 300;
	    var height = 300;
	    var min = Math.min(width, height);
	    
	    //Graphic init
	    var svg = d3.select(element[0]).append('svg')
	      .attr({width: width, height: height});    
	    
	    var arc = d3.svg.arc()
	      .outerRadius(min / 2 * 0.9)
	      .innerRadius(0);

	    var arcOver = d3.svg.arc()
	      .outerRadius((min / 2 * 0.9) + 7)
	      .innerRadius(0);
	    
	    var pie = d3.layout.pie()
	      .value(function(d) { return d.value; })
	      .sort(null);

	    //Legend init
	    var legendTop = d3.select('#pielegend').append('text')
	      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
	      .attr('dy', '.35em')
	      .style('text-anchor', 'middle')
	      .text('Emotion: ')
	      .attr('y', -10);

	    var legendBot = d3.select('#pielegend').append('text')
	      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
	      .attr('dy', '.35em')
	      .style('text-anchor', 'middle')
	      .text('Value')
	      .attr('y', -10);

	    //Graphic and legend settings
	    var g = svg.append('g')
	      //Center the pie chart
	      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
	    
	    //Add the <path>s for each arc slice and the transition
	    var arcs = g.selectAll('path').data(pie(piedata))
	      .enter().append('g')
	        .attr('class', 'slice')
	        .on('mouseover', function(d) {
	            d3.select(this).select('path').transition()
	                .duration(200)
	                .attr('d', arcOver);

	            legendTop.text(d3.select(this).datum().data.label + ': ');
	            legendBot.text(d3.select(this).datum().data.value.toFixed(2));
	        })
	        .on('mouseout', function(d) {
	            d3.select(this).select('path').transition()
	                .duration(100)
	                .attr('d', arc);

	            legendTop.text('Emotion: ');
	            legendBot.text('Value');

	        });

	    arcs.append('path')
	      .style('stroke', 'white')
	      .attr('d', arc)
	      .attr('fill', function(d, i){ return color(i); });

				});	

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});