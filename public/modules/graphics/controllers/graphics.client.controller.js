'use strict';

var model = { 
  research: { user : 'Adrien You',
              title : 'Research about CentraleSupelec',
              description : 'Research about the schools Ecole Centrale Paris and Supelec, that are now creating CentraleSupelec',
              duration : '4',
              created : '2015-01-13T12:07:24.852Z',
              words : ['Ecole Centrale Paris', 'Supelec', 'CentraleSupelec'],
              size : 37,
              negative_dictio : [
              {_id : 'absurd', count : 8}, {_id : 'confusing', count : 6}, {_id : 'delirious', count : 3}, {_id : 'foul', count : 3}
              ],
              positive_dictio : [
              {_id : 'accomplished', count : 12}, {_id : 'enhancement', count : 8}, {_id : 'lucid', count : 4}, {_id : 'simplest', count : 4}
              ]
            },       
  graphs: [{ graphName: 'Pie Chart', show: true, id: 0 }, 
      { graphName: 'Bubble Chart', show: true, id: 1 },
      { graphName: 'Time Line Chart', show: true, id: 2 },
      { graphName: 'Buzz Chart', show: true, id: 3 },
      { graphName: 'Bar Chart', show: true, id: 4 }],
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
            {date: '20150203', emotion: 'pos', retweet: '480', text: 'CentraleSupelec is the new technopole in France.'},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '88', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '321', text: 'Centrale and Supelec just announced the creation of CentraleSupelec'},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '88', text: ''},
            {date: '20150203', emotion: 'neg', retweet: '202', text: 'When is CentraleSupelec opening? It is late, right?'},
            {date: '20150203', emotion: 'neg', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '88', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '96', text: '@CentraleSupelec What about foreign students in 2018? Can we still come?'},
            {date: '20150203', emotion: 'neu', retweet: '8', text: ''},
            {date: '20150203', emotion: 'neu', retweet: '88', text: ''},
            {date: '20150203', emotion: 'pos', retweet: '94', text: 'Hervé Biausser is now director of CentraleSupelec'},
            {date: '20150204', emotion: 'pos', retweet: '12', text: ''},
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

  //Function to know if the checkbox Pie Chart is checked or not
  $scope.isPieChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 0 && !graph.show) { value = true; }
    });
    return value;
  };

  //Function to know if the checkbox Bubble Chart is checked or not
  $scope.isBubbleChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 1 && !graph.show) { value = true; }
    });
    return value;
  };

  //Function to know if the checkbox Time Line Chart is checked or not
  $scope.isTimeLine = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 2 && !graph.show) { value = true; }
    });
    return value;
  };

  //Function to know if the checkbox Buzz Chart is checked or not
  $scope.isBuzzChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 3 && !graph.show) { value = true; }
    });
    return value;
  };

  //Function to know if the checkbox Bar Chart is checked or not
  $scope.isBarChart = function() {
    var value = false;
    angular.forEach($scope.model.graphs, function(graph){
      if(graph.id === 4 && !graph.show) { value = true; }
    });
    return value;
  };
})

//Directive for Pie Chart
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
      .attr('font-weight', 'bold')
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
      .enter().append('g')
        .attr('class', 'slice')
        .on('mouseover', function(d) {
            d3.select(this).select('path').transition()
                .duration(200)
                .attr('d', arcOver);

            legendTop.text(d3.select(this).datum().data.label + ': ');
            legendBot.text(d3.select(this).datum().data.value.toFixed(1) + '%');
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

//Directive for Bubble Chart
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

//Directive for Time Line Chart
.directive('timeLine', function(){ 
  function link(scope, element, attr){
    //Getting data
    var data = scope.data;

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
    var parseDate = d3.time.format('%Y%m%d').parse;

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
    var datalength = data.length;

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
      if(timelinePointer === 0)
      {
        timelinePointer = data[i].date;

        //Update general object
        timelineObject.date = parseDate(data[i].date);
        timelineObject.count += 1; 

        //Update matching emotion object.date (so that all the line charts will start at the same point)
        timelineObjectPos.date = parseDate(data[i].date);
        timelineObjectNeg.date = parseDate(data[i].date);
        timelineObjectNeu.date = parseDate(data[i].date);

        //Update matching emotion object.count
        switch (data[i].emotion) {
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
      else if(timelinePointer === data[i].date)
      {
        //Update general object.count
        timelineObject.count += 1; 

        //Update matching emotion object.count
        switch (data[i].emotion) {
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
        timelinePointer = data[i].date;
        var dateLocal = parseDate(data[i].date);

        //Reset objects
        timelineObject = Object.create({date : dateLocal, count: 1});
        timelineObjectPos = Object.create({date : dateLocal, count: 1});
        timelineObjectNeg = Object.create({date : dateLocal, count: 1});
        timelineObjectNeu = Object.create({date : dateLocal, count: 1});

        //Update matching emotion object.count
        switch (data[i].emotion) {
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

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
})

//Directive for Buzz Chart
.directive('buzzChart', function(){ 
  function link(scope, iElement, attr){
    //Getting data
    var data = scope.data;

    //Function used to sort data (by retweet number)
    function compare(a,b) {
      if (+a.retweet < +b.retweet)
         return 1;
      if (+a.retweet > +b.retweet)
        return -1;
      return 0;
    }

    //New object, which is a sorted array created from the data
    var buzzdata = Object.create(data.sort(compare));

    //console.log(buzzdata[0].retweet);

    //Creating the table tags
    var strRow = '<table class="table table-striped table-bordered table-condensed"><thead><td>Text</td><td>Emotion</td>' 
      + '<td>Retweet Count</td></tr></thead><tbody>';

    //Fill the tbody
    for(var i=0; i <5; i++)
    {
      var strLocal = '<tr><td>' + buzzdata[i].text + '</td>' + '<td>' + buzzdata[i].emotion + '</td>' + '<td>' + buzzdata[i].retweet + '</td></tr>';
      strRow = strRow.concat(strLocal);
    }

    //Close the table tags
    strRow = strRow.concat('</tbody></table>')

    //Table with the data
    var table = angular.element(strRow);
    
    //Append the table to the buzz-chart element        
    iElement.append(table);

  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
})

//Directive for Bar Chart
.directive('barChart', function(){ 
  function link(scope, element, attr){
    //Getting data
    var data = scope.data;
    
    //Default settings
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.ordinal().rangeRoundBands([0, height], .1);

    //Create axis
    var xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(-height);
    var yAxis = d3.svg.axis().scale(y).orient('left').tickSize(0);

    var svg = d3.select(element[0]).append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')'); 

    // Parse numbers, and sort by value.
    data.forEach(function(d) { d.value = +d.value; });
    data.sort(function(a, b) { return b.value - a.value; });

    //Variables for looping over the data
    var timelinePointer = 0;
    var datalength = data.length;

    //New objects needed to make the distinction between emotions
    var timelineData = [];
    var timelineObject = Object.create({place : '', count: 0});

    // Set the scale domain.
    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.name; }));

    var bar = svg.selectAll("g.bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(0," + y(d.name) + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", y.rangeBand());

    bar.append("text")
        .attr("class", "value")
        .attr("x", function(d) { return x(d.value); })
        .attr("y", y.rangeBand() / 2)
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return format(d.value); });

      svg.append("g")
          .attr("class", "x axis")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
 
  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});

