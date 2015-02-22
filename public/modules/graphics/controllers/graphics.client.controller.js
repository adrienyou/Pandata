'use strict';

var model = {        
  graphs: [{ graphName: 'Pie Chart', show: false, id: 0 }, 
      { graphName: 'Bar Chart', show: false, id: 1 },
      { graphName: 'Timeline', show: false, id: 2 },
      { graphName: 'Something', show: false, id: 3 }],
  piedata: [{label: 'Positive emotion', value: 25},
            {label: 'Negative emotion', value: 30},
            {label: 'Neutral emotion', value: 45}
            ]    
  };

angular.module('graphics')

.controller('GraphicsController', function($scope) {
  $scope.todo = model;

  $scope.isPieChart = function() {
    var value = false;
    angular.forEach($scope.todo.graphs, function(graph){
      if(graph.id === 0 && !graph.show) { value = true; }
    });
    return value;
  };

})

.directive('donutChart', function(){ 
	function link(scope, element, attr){
		//Default settings
    var color = d3.scale.category10();
    var data = scope.data;
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
      .attr('y', -10);;

    //Graphic and legend settings
    var g = svg.append('g')
      //Center the pie chart
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    //Add the <path>s for each arc slice and the transition
    var arcs = g.selectAll('path').data(pie(data))
      .enter()
        .append('g')
            .attr('class', 'slice')
            .on('mouseover', function(d) {
                d3.select(this).select('path').transition()
                    .duration(200)
                    .attr('d', arcOver)

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

    }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    });