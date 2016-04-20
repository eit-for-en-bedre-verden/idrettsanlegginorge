

angular.module('idrettsanlegg.controllers')
    .controller('ConstructionController', function($scope, ConstructionSingle,
        $stateParams, $window) {

        $scope.construction = ConstructionSingle.query({id: $stateParams.id});
        
        $scope.goBack = function() {
            $window.history.back();
        }
    });
