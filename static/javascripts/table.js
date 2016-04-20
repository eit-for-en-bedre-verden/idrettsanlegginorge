

angular.module('idrettsanlegg.controllers')
    .controller('TableController', function($scope, Construction, QueryBuilder,
        $stateParams, $state, $q) {
        $scope.currentPage = $stateParams.page || 1;
        var aborter = $q.defer();

        $scope.$on('form changed', function() {
            $scope.currentPage = 1;
            aborter.resolve();
            aborter = $q.defer();
            $scope.fetchConstructions();
        });

        $scope.fetchConstructions = function() {
            var query = QueryBuilder($scope.formData);
            Construction.getResource(aborter).query(
                angular.extend({
                offset: $scope.currentPage * 18 - 18}, query),
                function (data) {
                    $scope.constructions = data.objects;
                    $scope.$emit('meta changed', data.meta);
                }
            );
        };
        $scope.fetchConstructions();

        $scope.changePage = function() {
            $state.go('home.table', {page: $scope.currentPage});
        }
    });
