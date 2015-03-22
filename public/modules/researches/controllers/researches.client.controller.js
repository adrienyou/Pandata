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
						' || DESCRIPTION: ' + description +
						' || WORDS: ' + words + 
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
	function link(scope, element, attr){
    //Getting data
    var resourceData = scope.data;

    resourceData.$promise.then(function(data){
		
		var piedata = [{label: 'Positive emotion', value: data.positive_emotion},
    				{label: 'Negative emotion', value: data.negative_emotion},
    				{label: 'Neutral emotion', value: data.neutral_emotion}
    				];

		var total = data.positive_emotion + data.negative_emotion + data.neutral_emotion;

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
	      .style('font-weight', 'bold')
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
	            legendBot.text(d3.select(this).datum().data.value.toFixed(0) + ' tweets ' + 
	            	'( ' + (d3.select(this).datum().data.value * 100 / total).toFixed(1) + '% )' );
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
})

//Directive for Time Line Chart
.directive('time', function(){ 
  function link(scope, element, attr){
    //Getting data
    var resourceData = scope.data;

    resourceData.$promise.then(function(data){ 

	    //Default settings
	    var margin = {top: 20, right: 20, bottom: 30, left: 50};
	    var width = 1000 - margin.left - margin.right;
	    var height = 500 - margin.top - margin.bottom;
	    var x = d3.time.scale().range([0, width]);
	    var y = d3.scale.linear().range([height, 0]);
	    
	    //Create axis
	    var xAxis = d3.svg.axis().scale(x).orient('bottom');
	    var yAxis = d3.svg.axis().scale(y).orient('left');
	    
	    //Time parser   
	    var parseDate = d3.time.format('%Y%m%d%H').parse;
	    //Time worker
	    function timeWorker(tweet)
	    {
	    	var value = tweet.created_at.year + tweet.created_at.month + tweet.created_at.day + tweet.created_at.hour;
	    	return value; 
	    }

	    //Creating svg
	    var svg = d3.select(element[0]).append('svg')
	        .attr('width', width + margin.left + margin.right)
	        .attr('height', height + margin.top + margin.bottom)
	      .append('g')
	        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	    //Variable to create a line
	    var line = d3.svg.line()
	      .x(function(d) { return x(d.date); })
	      .y(function(d) { return y(d.count); });

	    //Variables for looping over the data
	    var timelinePointer = 0;
	    var datalength = data.tweets.length;

	    //New objects needed to make the distinction between emotions
	    var timelineData = [];
	    var timelineObject = Object.create({date : '', count: 0});

	    var timelineDataPos = [];
	    var timelineObjectPos = Object.create({date : '', count: 0});

	    var timelineDataNeg = [];
	    var timelineObjectNeg = Object.create({date : '', count: 0});

	    var timelineDataNeu = [];
	    var timelineObjectNeu = Object.create({date : '', count: 0});
	    
	    for (var i = 0; i < datalength; i++) 
	    {
	    	var tweet = data.tweets[i];
	    	var workedTime = timeWorker(tweet);
	
	      if(timelinePointer === 0)
	      {
	        timelinePointer = workedTime;

	        //Update general object
	        timelineObject.date = parseDate(workedTime);
	        timelineObject.count += 1; 

	        //Update matching emotion object.date (so that all the line charts will start at the same point)
	        timelineObjectPos.date = parseDate(workedTime);
	        timelineObjectNeg.date = parseDate(workedTime);
	        timelineObjectNeu.date = parseDate(workedTime);

	        //Update matching emotion object.count
	        switch (data.tweets[i].emotion) {
	          case 'pos':
	            timelineObjectPos.count += 1; 
	            break;
	          case 'neg':
	            timelineObjectNeg.count += 1;
	            break;
	          case 'neu':
	            timelineObjectNeu.count += 1;
	            break;
	          }
	      }
	      else if(timelinePointer === workedTime)
	      {
	        //Update general object.count
	        timelineObject.count += 1; 

	        //Update matching emotion object.count
	        switch (data.tweets[i].emotion) {
	          case 'pos':
	            timelineObjectPos.count += 1; 
	            break;
	          case 'neg':
	            timelineObjectNeg.count += 1;
	            break;
	          case 'neu':
	            timelineObjectNeu.count += 1;
	            break;
	          }
	      }
	      else
	      {
	        //Push object in arrays
	        timelineData.push(timelineObject);
	        timelineDataPos.push(timelineObjectPos);
	        timelineDataNeg.push(timelineObjectNeg);
	        timelineDataNeu.push(timelineObjectNeu);

	        //Set pointer
	        timelinePointer = workedTime;
	        var dateLocal = parseDate(workedTime);

	        //Reset objects
	        timelineObject = Object.create({date : dateLocal, count: 1});
	        timelineObjectPos = Object.create({date : dateLocal, count: 1});
	        timelineObjectNeg = Object.create({date : dateLocal, count: 1});
	        timelineObjectNeu = Object.create({date : dateLocal, count: 1});

	        //Update matching emotion object.count
	        switch (data.tweets[i].emotion) {
	          case 'pos':
	            timelineObjectPos.count += 1; 
	            break;
	          case 'neg':
	            timelineObjectNeg.count += 1;
	            break;
	          case 'neu':
	            timelineObjectNeu.count += 1;
	            break;
	        }
	      }
	    }
	    //Push object in arrays
	    timelineData.push(timelineObject);
	    timelineDataPos.push(timelineObjectPos);
	    timelineDataNeg.push(timelineObjectNeg);
	    timelineDataNeu.push(timelineObjectNeu);

	    //Set x and y domains (using timelineData because it will have the higher count)
	    x.domain(d3.extent(timelineData, function(d) { return d.date ; }));
	    y.domain([0, d3.max(timelineData, function(d) { return d.count; })]);

	    //Add xAxis to svg
	    svg.append('g')
	      .attr('class', 'x axis')
	      .attr('transform', 'translate(0,' + height + ')')
	      .call(xAxis);

	    //Add yAxis to svg
	    svg.append('g')
	      .attr('class', 'y axis')
	      .call(yAxis)
	    .append('text')
	      .attr('transform', 'rotate(-90)')
	      .attr('y', 6)
	      .attr('dy', '.71em')
	      .style('text-anchor', 'end')
	      .text('Number of tweets');

	    //Add general line graph to svg
	    svg.append('path')
	        .datum(timelineData)
	        .attr('class', 'line-black')
	        .attr('d', line);

	    //Add general line graph to svg
	    svg.append('path')
	        .datum(timelineDataPos)
	        .attr('class', 'line-blue')
	        .attr('d', line);

	    //Add general line graph to svg
	    svg.append('path')
	        .datum(timelineDataNeg)
	        .attr('class', 'line-red')
	        .attr('d', line);

	    //Add general line graph to svg
	    svg.append('path')
	        .datum(timelineDataNeu)
	        .attr('class', 'line-green')
	        .attr('d', line);
    });

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
})

//Directive for Buzz Chart
.directive('buzz', function(){ 
  function link(scope, iElement, attr){
    //Getting data
    var resourceData = scope.data;

    resourceData.$promise.then(function(data){

	    //Function used to sort data (by retweet number)
	    function compare(a,b) {
	      if (+a.retweet < +b.retweet)
	         return 1;
	      if (+a.retweet > +b.retweet)
	        return -1;
	      return 0;
	    }

	    //Function used to sort data (by retweet number)
	    function compareFollowers(a,b) {
	      if (+a.user.followers_count < +b.user.followers_count)
	         return 1;
	      if (+a.user.followers_count > +b.user.followers_count)
	        return -1;
	      return 0;
	    }

	    //New object, which is a sorted array created from the data
	    var buzzdata = Object.create(data.tweets.sort(compareFollowers));

	    console.log(buzzdata[0].user.followers_count);

	    //Creating the table tags
	    var strRow = '<table class="table table-striped table-bordered table-condensed"><thead><td>Text</td><td>Emotion</td>' 
	      + '<td>Followers Count</td></tr></thead><tbody>';

	    //Fill the tbody
	    for(var i=0; i <5; i++)
	    {
	      var strLocal = '<tr><td>' + buzzdata[i].text + '</td>' + '<td>' + buzzdata[i].emotion + '</td>' + '<td>' + buzzdata[i].user.followers_count + '</td></tr>';
	      strRow = strRow.concat(strLocal);
	    }

	    //Close the table tags
	    strRow = strRow.concat('</tbody></table>')

	    //Table with the data
	    var table = angular.element(strRow);
	    
	    //Append the table to the buzz-chart element        
	    iElement.append(table);
	});

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
})


//Directive for Something Chart
.directive('something', function(){ 
  function link(scope, element, attr){
    //Default settings
    var width = 500;
    var height = 300;
    var color = ['#1f77b4', '#ff7f0e', '#2ca02c']

    //Creating nodes
    var nodes = d3.range(75).map(function() { return {radius: Math.random() * 12 + 4}; });
    var root = nodes[0];
    root.radius = 0;
    root.fixed = true;

    var force = d3.layout.force()
      .gravity(0.05)
      .charge(function(d, i) { return i ? 0 : -800; })
      .nodes(nodes)
      .size([width, height]);

    force.start();

    //Creating svg
    var svg = d3.select(element[0]).append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('circle')
      .data(nodes.slice(1))
      .enter().append('circle')
      .attr('r', function(d) { return d.radius; })
      .style('fill', function(d, i) { return color[i % 3]; });

    force.on('tick', function(e) {
      var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

      while (++i < n) q.visit(collide(nodes[i]));

      svg.selectAll('circle')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    });

    svg.on('mousemove', function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });

    //Function managing collision
    function collide(node) {
      var r = node.radius + 5,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
        if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
 
  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});