

angular.module('idrettsanlegg.controllers')
    .controller('MapController', function($scope, uiGmapGoogleMapApi) {
        $scope.map = {center: {latitude: 63.4, longitude: 10.29}, zoom: 6};
        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
        });
    });
