// für den graph, zunächst hard coded, dann rest call
//http://www.agile-code.com/blog/using-the-google-datatable-net-wrapper/
//http://gavindraper.com/2013/07/30/google-charts-in-angularjs/
app.controller('GraphCtrl', function ($scope, dateFilter, $interval) {
    $scope.name = "Name";

    // add data to graph
    

    // Set chart options
    $scope.graphOptions = {
        title: 'Messpunkte und Trend',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var myData = new google.visualization.DataTable();
    myData.addColumn('number', 'X');
    myData.addColumn('number', 'Y');
    myData.addColumn('number', 'Trend');
    myData.addRows([
      [0, 2.0, parseFloat($scope.timeSec)],
      [1, 1, 0],
      [2, 0, 0],
      [3, -1, 0],
      [4, 0, 0],
      [5, -1, 0],
      [6, 0, 0],
      [7, -1, 0],
      [8, 0, 0],
      [9, 1, 0]
    ]);

    $interval(
        function () {
            $scope.timeSec = parseFloat(dateFilter(new Date(), "ss"));
            myData.removeRow(0);
            myData.addRow([parseFloat(new Date().valueOf()), 0, parseFloat(dateFilter(new Date(), "sss"))]);// welceh Position
            console.log($scope.timeSec);
            $scope.data = myData;
        }
    , 250);
});

// Directive
app.directive('mblinechart',( function () {
        return {
        restrict: 'A',
        link: function (scope, $elm, attrs ) {
            // Create the data table.

            // Instantiate and draw our chart, passing in some options.
            // Linechart per attrinut übergeben. siehe beispiel
            //scope.$watch(scope.timeSec, plotGraph(), true);

            // warum auch immer watch nicht geht?
            // scope.$watch(scope.timeSec,plotGraph(), true);

            function plotGraph() {
                console.log(attrs.mblinechart/*"call plotter"*/);
                var chart = new google.visualization.LineChart($elm[0]);
                chart.draw(scope.data, scope.graphOptions);
            }

            function updateLater() {
                setTimeout(function () {
                    plotGraph(); // update DOM
                    updateLater(); // schedule another update
                }, 250);
            }

            updateLater();

            }
        }

  
}));