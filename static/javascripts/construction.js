

angular.module('idrettsanlegg.controllers')
    .controller('ConstructionController', function($scope, Construction, $stateParams) {
        $scope.construction = Construction.query({id: $stateParams.id});

    });
