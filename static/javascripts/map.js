

angular.module('idrettsanlegg.controllers')
    .controller('MapController', function($scope, uiGmapGoogleMapApi, uiGmapIsReady) {


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
        $scope.constructions = ['1', '2', '3']; // Place markers
        $scope.current_marker = null;




        // KUN FOR TESTING

        var staticConstruction1 = {
            byggeaar: "1983",
            anleggDriver: "Nordkapp kommune",
            anleggEier: "Nordkapp kommune",
            anleggsnavn: "Nordkapp museum",
            anleggsnummer: "2019-001-601",
            anleggstype: {
              id: 1,
              resource_uri: "/api/v1/Anleggstype/1/",
              type: "Kulturbygg - Museum"
            },
            areal: 0,
            bredde: 0,
            id: 10010,
            inndratt: 0,
            kartData: {
              latitude: 60.21,
              longitude: 10.31,
              id: 328975,
              kpunkt: 0,
              ngoakse: 0,
              ngoxkoordinat: 7961501,
              ngoykoordinat: 558466547,
              resource_uri: "/api/v1/KartData/328975/",
              utmnord: 1110074,
              utmost: 659507964,
              utmsone: 33
            },
            lengde: 0,
            maaldata1: "Test",
            maaldata2: "mål",
            maaldata3: "data",
            maaldata4: "200 meter",
            nummer1: 2019,
            ombyggeaar: "",
            resource_uri: "/api/v1/Idrettsanlegg/451446/",
            tildelt: 2000000,
            utbetalt: 1700000,
            // DENNE DATAEN VIL JEG HA MED I JSON SOM KOMMER
            uu: "Ja",
            status: "Urealisert",
            fylke: "Finnmark",
            kommune: "Nordkapp",
            anleggsklasse: "Kommunebygg",
            anleggskategori: "Flerbrukshall",

            show: false
        };


        var staticConstruction2 = {
            byggeaar: "1983",
            anleggDriver: "Nordkapp kommune",
            anleggEier: "Nordkapp kommune",
            anleggsnavn: "Nordkapp museum",
            anleggsnummer: "2019-001-601",
            anleggstype: {
              id: 1,
              resource_uri: "/api/v1/Anleggstype/1/",
              type: "Kulturbygg - Museum"
            },
            areal: 0,
            bredde: 0,
            id: 13311,
            inndratt: 0,
            kartData: {
              latitude: 60.22,
              longitude: 10.22,
              id: 328975,
              kpunkt: 0,
              ngoakse: 0,
              ngoxkoordinat: 7961501,
              ngoykoordinat: 558466547,
              resource_uri: "/api/v1/KartData/328975/",
              utmnord: 1110074,
              utmost: 659507964,
              utmsone: 33
            },
            lengde: 0,
            maaldata1: "Test",
            maaldata2: "data",
            maaldata3: "50",
            maaldata4: "meter",
            nummer1: 2019,
            ombyggeaar: "",
            resource_uri: "/api/v1/Idrettsanlegg/451446/",
            tildelt: 2000000,
            utbetalt: 1700000,
            // DENNE DATAEN VIL JEG HA MED I JSON SOM KOMMER
            uu: "Ja",
            status: "Urealisert",
            fylke: "Finnmark",
            kommune: "Nordkapp",
            anleggsklasse: "Kommunebygg",
            anleggskategori: "Flerbrukshall",

            show: false
        };



        var staticConstruction3 = {
            byggeaar: "1983",
            anleggDriver: "Nordkapp kommune",
            anleggEier: "Nordkapp kommune",
            anleggsnavn: "Nordkapp museum",
            anleggsnummer: "2019-001-601",
            anleggstype: {
              id: 1,
              resource_uri: "/api/v1/Anleggstype/1/",
              type: "Kulturbygg - Museum"
            },
            areal: 0,
            bredde: 0,
            id: 2313,
            inndratt: 0,
            kartData: {
              latitude: 62.2,
              longitude: 10.2,
              id: 328975,
              kpunkt: 0,
              ngoakse: 0,
              ngoxkoordinat: 7961501,
              ngoykoordinat: 558466547,
              resource_uri: "/api/v1/KartData/328975/",
              utmnord: 1110074,
              utmost: 659507964,
              utmsone: 33
            },
            lengde: 0,
            maaldata1: "20",
            maaldata2: "meter",
            maaldata3: "100",
            maaldata4: "meter høy",
            nummer1: 2019,
            ombyggeaar: "",
            resource_uri: "/api/v1/Idrettsanlegg/451446/",
            tildelt: 2000000,
            utbetalt: 1700000,

            // DENNE DATAEN VIL JEG HA MED I JSON SOM KOMMER
            uu: "Ja",
            status: "Urealisert",
            fylke: "Finnmark",
            kommune: "Nordkapp",
            anleggsklasse: "Kommunebygg",
            anleggskategori: "Flerbrukshall",

            show: false
        };


        var staticConstructions = [staticConstruction1, staticConstruction2, staticConstruction3];
        // SLUTT: KUN FOR TESTING


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
                markers.push(marker);
            }
            return markers;
        };



        var createMarker = function(construction, content, id){
            // Takes in a construction and creates a marker
            var marker = {
                id: construction.id,
                latitude: construction.kartData.latitude,
                longitude: construction.kartData.longitude,
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
            var markers = createMarkers(staticConstructions);

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
                $scope.addNewMarkers(staticConstructions);
            }
            else {
                $scope.removeMarkers();
            }

        };


        var getWindowContent = function(construction){
            windowContent =
            '<html>' +
            '<head>' +
            '<meta charset="utf-8">' +
            '<link rel="stylesheet" type="text/css" href="/static/css/mapwindow.css">' +
            '</head>' +
            '<body>' +
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
                          '<td>' + construction.fylke + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Kommune</td>' +
                          '<td>' + construction.kommune + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggsklasse</td>' +
                          '<td>' + construction.anleggsklasse + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Anleggskategori</td>' +
                          '<td>' + construction.anleggskategori + '</td>' +
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
                          '<td>' + construction.utdelt + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Latitude</td>' +
                          '<td>' + construction.kartData.latitude + '</td>' +
                      '</tr>' +
                      '<tr>' +
                          '<td>Longitude</td>' +
                          '<td>' + construction.kartData.longitude + '</td>' +
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
              '</div>' +
              '</body>' +
              '</html>';

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
