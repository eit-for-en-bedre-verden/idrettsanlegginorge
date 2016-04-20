
angular.module('idrettsanlegg.controllers')
    .controller('MapController', function($scope, uiGmapGoogleMapApi, uiGmapIsReady,
            MapData, $http, baseUrl, QueryBuilder, $q) {


        var mapOptions = {
            disableDefaultUI: true,
            keyboardShortcuts: false,
            draggable: true,
            disableDoubleClickZoom: false,
            fullscreenControl: true,
            mapTypeControl: true,
            rotateControl: false,
            panControl: false,
            streetViewControl: true,
            scaleControl: true,
            zoomControl: true,
            maxZoom: 20,
            doCluster: true
        };

    
        // Contains the google.maps object
        var google_map = null;

        $scope.map = {
            show: true,
            center: {
                latitude: 63.4,
                longitude: 10.29
            },
            zoom: 7,
            control: {},
            options: mapOptions,
            bounds: {}
        };

        // Contains all the current markers on the map.
        $scope.markers = [];
        $scope.window = {
          show: false,
          closeClick: function() {
            this.show = false;
          },
          options: {}
        };


        $scope.openWindow = function(marker, event, model) {
          $http.get(baseUrl + model.link + '?format=json').then(function(data) {
            $scope.window.model = model;
            $scope.window.data = data.data;
            $scope.window.show = true;
          });
        }

        var aborter = $q.defer();

        $scope.fetch = function() {
          MapData.getResource(aborter).query(angular.extend({
            Longitude__gt: 0,
            Latitude__gt: 58
          }, QueryBuilder($scope.formData, true)), function(data) {
                $scope.mapConstructions = data.objects;
                $scope.meta = data.meta;
                $scope.$emit('meta changed', data.meta);
                $scope.addNewMarkers($scope.mapConstructions)
          });
        };

        $scope.fetch();

        $scope.$on('form changed', function() {
          aborter.resolve();
          aborter = $q.defer();
          $scope.fetch();
        });


        // Used to push an array of markers to the scope markers
        var addMarkers = function(markers) {
            for (var i = 0;  i < markers.length; i++) {
                $scope.markers.push(markers[i]);
            }
        };


        var createMarkers = function(constructions){
            // Takes in an array of javascript objects representing constructions
            var markers = [];
            for(var i = 0; i < constructions.length; i++){
                marker = createMarker(constructions[i], i);
                if (marker.latitude && marker.latitude !== '0E-13') {
                    markers.push(marker);
                }
            }
            return markers;
        };



        var createMarker = function(mapData, id){
            // Takes in a construction and creates a marker
            var marker = {
                id: mapData.resource_uri,
                latitude: Number(mapData.Latitude),
                longitude: Number(mapData.Longitude),
                link: mapData.ianlegg,
                control: {},
                show: false
            };
            return marker;
        };



        // Use this to add new markers to the map.
        // argument should be an array of javascript construction objects
        $scope.addNewMarkers = function(constructions){
            // Create markers
            var markers = createMarkers(constructions);

            // Fit map bounds to markers
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                var latlng = new google.maps.LatLng(markers[i].latitude, markers[i].longitude);
                bounds.extend(latlng);
            }
            $scope.map.bounds = {
                northeast: {
                    latitude: bounds.getNorthEast().lat(),
                    longitude: bounds.getNorthEast().lng()
                },
                southwest: {
                    latitude: bounds.getSouthWest().lat(),
                    longitude: bounds.getSouthWest().lng()
                }
            };
            $scope.markers = markers;
        };


        uiGmapIsReady.promise().then(function (map_instances){
            // Run when the map is initalized
        });


        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            google_maps = maps;
            
            
        });
    
        var setControlOptions = function(maps) {
            mapOptions.zoomControlOptions = {
                position: maps.ControlPosition.TOP_LEFT
            }
            mapOptions.mapTypeControlOptions = {
                position: maps.ControlPosition.TOP_LEFT
            }
            mapOptions.fullScreenControlOptions = {
                position: maps.ControlPosition.BOTTOM_RIGHT
            }
        }

    });

