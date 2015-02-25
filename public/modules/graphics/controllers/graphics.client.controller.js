'use strict';

var model = { 
  research: { user : 'Adrien You',
              title : 'Research about CentraleSupelec',
              description : 'Research about the schools Ecole Centrale Paris and Supelec, that are now creating CentraleSupelec',
              duration : '4',
              created : '2015-01-13T12:07:24.852Z',
              words : ['Ecole Centrale Paris', 'Supelec', 'CentraleSupelec'],
              size : 12336},       
  graphs: [{ graphName: 'Pie Chart', show: true, id: 0 }, 
      { graphName: 'Bubble Chart', show: false, id: 1 },
      { graphName: 'Time Line', show: true, id: 2 },
      { graphName: 'Something', show: false, id: 3 }],
  piedata: [{label: 'Positive emotion', value: 25},
            {label: 'Negative emotion', value: 30},
            {label: 'Neutral emotion', value: 45}
            ],  
  tweets: [ {date: '20150201', emotion: 'pos', retweet: '10', text: ''},
            {date: '20150201', emotion: 'pos', retweet: '10', text: ''},
            {date: '20150201', emotion: 'pos', retweet: '10', text: ''},
            {date: '20150201', emotion: 'neu', retweet: '10', text: ''},
            {date: '20150201', emotion: 'pos', retweet: '10', text: ''},
            {date: '20150201', emotion: 'neu', retweet: '10', text: ''},
            {date: '20150201', emotion: 'pos', retweet: '10', text: ''},
            {date: '20150201', emotion: 'neg', retweet: '15', text: ''},
            {date: '20150201', emotion: 'neg', retweet: '0', text: ''},
            {date: '20150201', emotion: 'neu', retweet: '0', text: ''},
            {date: '20150202', emotion: 'pos', retweet: '11', text: ''},
            {date: '20150202', emotion: 'neg', retweet: '12', text: ''},
            {date: '20150202', emotion: 'pos', retweet: '5', text: ''},
            {date: '20150202', emotion: 'neu', retweet: '3', text: ''},
            {date: '20150202', emotion: 'neu', retweet: '6', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '88', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '150', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '88', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '150', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '88', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '150', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '88', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '150', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '88', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '150', text: ''},
            {date: '20150204', emotion: 'pos', retweet: '143', text: ''},
            {date: '20150204', emotion: 'pos', retweet: '0', text: ''},
            {date: '20150204', emotion: 'neg', retweet: '12', text: ''},
            {date: '20150204', emotion: 'neu', retweet: '3', text: ''},
            {date: '20150205', emotion: 'pos', retweet: '5', text: ''},
            {date: '20150205', emotion: 'pos', retweet: '0', text: ''},
            {date: '20150205', emotion: 'neu', retweet: '42', text: ''}
          ]  
  };

angular.module('graphics')

.controller('GraphicsController', function($scope) {
  $scope.model = model;

  $scope.isPieChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 0 && !graph.show) { value = true; }
    });
    return value;
  };

  $scope.isBubbleChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 1 && !graph.show) { value = true; }
    });
    return value;
  };

  $scope.isTimeLine = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 2 && !graph.show) { value = true; }
    });
    return value;
  };

})

.directive('pieChart', function(){ 
	function link(scope, element, attr){
    //Getting data
    var data = scope.data;
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
    var arcs = g.selectAll('path').data(pie(data))
      .enter()
        .append('g')
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

    }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    })

.directive('bubbleChart', function(){ 
  function link(scope, element, attr){
    //Getting data
    var data = scope.data;
    //Default settings
    var color = d3.scale.category10();
    var width = 300;
    var height = 300;
    var min = Math.min(width, height);
    
    //Graphic init
    var svg = d3.select(element[0]).append('svg')
      .attr({width: width, height: height});    

    }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    })

.directive('timeLine', function(){ 
  function link(scope, element, attr){
    //Getting data
    var data = scope.data;
    //Default settings
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format('%Y%m%d').parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var svg = d3.select(element[0]).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.count); });

    var timelineData = [];
    var timelinePointer = 0;
    var timelineObject = Object.create({date : '', count: 0});

    var datalength = data.length;
    
    for (var i = 0; i < datalength; i++) 
    {
      if(timelinePointer === 0)
      {
        timelinePointer = data[i].date;
        timelineObject.date = parseDate(data[i].date);
        timelineObject.count += 1; 
      }
      else if(timelinePointer === data[i].date)
      {
        timelineObject.count += 1; 
      }
      else
      {
        //Push object in array
        timelineData.push(timelineObject);
        console.log(timelineData);
        //Set pointer
        timelinePointer = data[i].date;
        //Reset object
        var dateLocal = parseDate(data[i].date);
        timelineObject = Object.create({date : dateLocal, count: 1});
      }
      //console.log(timelineObject);
    }
    timelineData.push(timelineObject);

    console.log(timelineData);

    x.domain(d3.extent(timelineData, function(d) { return d.date ; }));
    y.domain([0, d3.max(timelineData, function(d) { return d.count; })]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Number of tweets');

    svg.append('path')
        .datum(timelineData)
        .attr('class', 'line')
        .attr('d', line);

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});
