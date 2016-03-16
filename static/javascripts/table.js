

angular.module('idrettsanlegg.controllers')
    .controller('TableController', function($scope, Construction) {
        $scope.currentPage = 1;
        $scope.pageChanged = function() {
            Construction.query({
                offset: $scope.currentPage * 20 - 20}, 
                function (data) {
                    $scope.constructions = data.objects;
                    $scope.meta = data.meta;
                }
            );
        }
    });
