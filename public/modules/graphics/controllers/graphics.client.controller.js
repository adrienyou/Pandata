'use strict';

var model = {        
  graphs: [{ graphName: 'Pie Chart', show: false, id: 0 }, 
      { graphName: 'Bar Chart', show: false, id: 1 },
      { graphName: 'Timeline', show: false, id: 2 },
      { graphName: 'Something', show: false, id: 3 }]        
  };

angular.module('graphics')

.controller('GraphicsController', function($scope) {
  $scope.todo = model;

  $scope.isPieChart = function() {
    var value = false;
    angular.forEach($scope.todo.graphs, function(graph){
      if(graph.id === 0 && !graph.show) { value = true }
    });
    return value;
  }

})

.directive('donutChart', function(){ 
	function link(scope, element, attr){
		var color = d3.scale.category10();
        var data = scope.data;
        var width = 300;
        var height = 300;
        var min = Math.min(width, height);
        var svg = d3.select(element[0]).append('svg');
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);
    
        svg.attr({width: width, height: height});
        var g = svg.append('g')
          // center the donut chart
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        
        // add the <path>s for each arc slice
        g.selectAll('path').data(pie(data))
          .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function(d, i){ return color(i) });
      }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    });