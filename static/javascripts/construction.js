

angular.module('idrettsanlegg.controllers')
    .controller('ConstructionController', function($scope, Construction, $stateParams) {
        $scope.construction = Construction.query({id: $stateParams.id});
        
        $scope.goBack = function() {
            window.history.back();
        }
    
    
    });
