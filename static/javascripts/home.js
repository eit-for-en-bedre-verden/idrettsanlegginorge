

angular.module('idrettsanlegg.controllers')
    .controller('HomeController', function($scope,
        Municipality, ConstructionType, Counties) {

        Municipality.query(function (data) {
            $scope.municipalities = data.objects;
        });

        ConstructionType.query(function (data) {
            $scope.constructionTypes = data.objects;
        });

        $scope.formData = {};
        $scope.viewState = 'Kart';
        $scope.counties = Counties;

        // Datepickers
        $scope.callers = [];
        $scope.fromDate = undefined;//new Date(0);
        $scope.toDate = undefined;//new Date();

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

        $scope.$watch('formData', function() {
            // Alert child scope that a filter is changed
            $scope.$broadcast('form changed');
        }, true);

        $scope.clearForm = function() {
            $scope.formData = {};
        };

        $scope.$on('meta changed', function(event, meta) {
            $scope.meta = meta;
        });
    
    });
