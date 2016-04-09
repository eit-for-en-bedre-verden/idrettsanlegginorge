
angular.module('idrettsanlegg.controllers')
    .controller('MapController', function($scope, uiGmapGoogleMapApi, uiGmapIsReady,
            Construction) {


        var mapOptions = {
            disableDefaultUI: false,
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
            maxZoom: 10
        };


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
        Construction.query({
            kartData__Longitude__gt: 0,
            kartData__Latitude__gt: 60
        }, function(data) {
                $scope.mapConstructions = data.objects;
                $scope.meta = data.meta;
                $scope.showMarkers();
        });
        $scope.current_marker = null;


        $scope.removeMarkers = function () {
            $scope.markers = [];
        };


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
                content = getWindowContent(constructions[i]);
                marker = createMarker(constructions[i], content, i);
                if (marker.latitude && marker.latitude !== '0E-13') {
                    markers.push(marker);
                }
            }
            return markers;
        };



        var createMarker = function(construction, content, id){
            // Takes in a construction and creates a marker
            var marker = {
                id: construction.id,
                latitude: Number(construction.kartData.Latitude),
                longitude: Number(construction.kartData.Longitude),
                windowContent: content,
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


        // Currently used to add or remove markers using the "Søk" button
        $scope.showMarkers = function(){
            if($scope.markers.length === 0){
                $scope.addNewMarkers($scope.mapConstructions);
            }
            else {
                $scope.removeMarkers();
            }

        };


        var getWindowContent = function(construction){
            windowContent =
            '<div class="iw-container">' +
                  '<div class="iw-title">' + construction.anleggsnavn + '</div>' +
                  '<div class="iw-content">' +
                  '<table class="iw-infotable">' +
                  '<thead>' +
                      '<tr>' +
                          '<th colspan="2">Anlegg info</th>' +
                      '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                      '<tr>' +
                          '<td>Navn</td>' +
                          '<td>' + construction.anleggsnavn + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Driver</td>' +
                          '<td>' + construction.anleggDriver + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Eier</td>' +
                          '<td>' + construction.anleggEier + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Fylke</td>' +
                          '<td>' + construction.kommune.fylke.name + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Kommune</td>' +
                          '<td>' + construction.kommune.name + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggsklasse</td>' +
                          '<td>' + construction.anleggsklasse.klasse + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggskategori</td>' +
                          '<td>' + construction.anleggskategori.kategori + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggstype</td>' +
                          '<td>' + construction.anleggstype.type + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggsnummer</td>' +
                          '<td>' + construction.anleggsnummer + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Status</td>' +
                          '<td>' + construction.status + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>uu</td>' +
                          '<td>' + construction.uu + '</td>' +
                      '</tr>' +
                  '</tbody>' +
                  '</table>' +

                  '<table class="iw-datatable">' +
                  '<thead>' +
                      '<tr>' +
                          '<th colspan="2">Anlegg data</th>' +
                      '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                      '<tr>' +
                          '<td>Byggeår</td>' +
                          '<td>' + construction.byggeaar + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Ombyggeår</td>' +
                          '<td>' + construction.ombyggeaar + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Areal</td>' +
                          '<td>' + construction.areal + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Bredde</td>' +
                          '<td>' + construction.bredde + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Lengde</td>' +
                          '<td>' + construction.lengde + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Inndratt</td>' +
                          '<td>' + construction.inndratt + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Tildelt</td>' +
                          '<td>' + construction.tildelt + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Utbetalt</td>' +
                          '<td>' + construction.utbetalt + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Latitude</td>' +
                          '<td>' + construction.kartData.Latitude + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Longitude</td>' +
                          '<td>' + construction.kartData.Longitude + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anlegg ID</td>' +
                          '<td>' + construction.id + '</td>' +
                      '</tr>' +
                  '</tbody>' +
                  '</table>' +

                  '<table class="iw-maaldatatable">' +
                  '<thead>' +
                      '<tr>' +
                          '<th colspan="2">Måldata</th>' +
                      '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                      '<tr>' +
                          '<td>Måldata 1</td>' +
                          '<td>' + construction.maaldata1 + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Måldata 2</td>' +
                          '<td>' + construction.maaldata2 + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Måldata 3</td>' +
                           '<td>' + construction.maaldata3 + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Måldata 4</td>' +
                          '<td>' + construction.maaldata4 + '</td>' +
                      '</tr>' +
                  '</tbody>' +
                  '</table>' +

              '</div>' +
              '</div>';

          return windowContent;
        };


        $scope.onClick = function(markers, eventName, model){
            // Ha en "currentmarker" i stedet for å sjekke alle markers
            if(model.show === false && model !== $scope.current_marker && $scope.current_marker !== null){
                $scope.current_marker.show = false;
            }
            model.show = !model.show;
            $scope.current_marker = model

        };


        uiGmapIsReady.promise().then(function (map_instances){
            // Run when the map is initalized
        });


        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
        });

    });

