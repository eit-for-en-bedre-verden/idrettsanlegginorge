

angular.module('idrettsanlegg.controllers')
    .controller('HomeController', function($scope, Construction) {
        Construction.query(function (data) {
            //$scope.constructions = data.objects etc.
            //console.log(data);
        });

        $scope.viewState = 'Kart';

        $scope.constructions = ['1', '2', '3'];
        $scope.construction = {
            types : [
                "RallyCross-Bane",
                "Svømmehall",
                "Pingpong-bord",
                "Racingcircuit"
            ],
            selected : undefined
        };

        // Datepickers
        $scope.callers = [];
        $scope.fromDate = new Date();
        $scope.toDate = new Date();

        $scope.dateOpts = {
            datepickerMode: "year",
            minMode: "year",
            showWeeks: "false"
        };

        $scope.openDate = function ($event, caller) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.callers['from'] = false;
            $scope.callers['to'] = false;

            $scope.callers[caller] = true;
        };

        // Tooltips
        $scope.tooltip = {
            placement: 'right-top'
        };

        // Funds
        $scope.funds = {
            lower : null,
            upper : null
        };
    
    });
