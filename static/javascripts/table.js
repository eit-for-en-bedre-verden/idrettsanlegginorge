

angular.module('idrettsanlegg.controllers')
    .controller('TableController', function($scope, Construction, QueryBuilder) {
        $scope.currentPage = 1;

        $scope.$on('form changed', function() {
            $scope.currentPage = 1;
            $scope.fetchConstructions();
        });

        $scope.fetchConstructions = function() {
            var query = QueryBuilder($scope.formData);
            Construction.query(
                angular.extend({
                offset: $scope.currentPage * 20 - 20}, query),
                function (data) {
                    $scope.constructions = data.objects;
                    $scope.$emit('meta changed', data.meta);
                }
            );
        };
        $scope.fetchConstructions();
    });
