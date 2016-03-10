

angular.module('idrettsanlegg.controllers')
    .controller('MapController', function($scope, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
        });

        // ANGULAR GOOGLE MAPS START
        $scope.map = {
            show: true,
            center: {
                latitude: 63.4,
                longitude: 10.29
            },
            zoom: 7
        };

        /*
            Positions used by google maps api
            +----------------+
            + TL    TC    TR +
            + LT          RT +
            +                +
            + LC          RC +
            +                +
            + LB          RB +
            + BL    BC    BR +
            +----------------+
        */
        $scope.mapOptions = {
            backgroundColor: '#1C7D9E',
            disableDefaultUI: false,
            keyboardShortcuts: false,
            draggable: true,
            disableDoubleClickZoom: false,
            fullscreenControl: true,
            fullscreenControlOptions: google.maps.FullscreenControlOptions.RIGHT_TOP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.SATELLITE,
                    google.maps.MapTypeId.TERRAIN
                ],
                position: google.maps.ControlPosition.TOP_LEFT,
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            rotateControl: false,
            rotateControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.StreetViewControlOptions.TOP_LEFT
            },
            scaleControl: true,
            scaleControlOptions: {
                style: google.maps.ScaleControlStyle.DEFAULT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ZoomControlOptions.TOP_LEFT
            },
            maxZoom: 20
        };

        $scope.window = {
            show: false
        };

        var staticMarker = {
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
            id: 451446,
            inndratt: 0,
            kartData: {
              latitude: 63.4,
              longitude: 10.29,
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
            maaldata1: "",
            maaldata2: "",
            maaldata3: "",
            maaldata4: "",
            nummer1: 2019,
            ombyggeaar: "",
            resource_uri: "/api/v1/Idrettsanlegg/451446/",
            tildelt: 2000000,
            utbetalt: 1700000,
            uu: "Ja",

            show: false
        };

        $scope.markers = [staticMarker];

        $scope.removeMarkers = function () {
            $scope.markers = [];
        };

        $scope.addMarkers = function (markers) {
            for (var m in markers) {
                markers.push(m);
            }
        };

        var createMarker = function(construction){
            // Takes in a construction and creates a marker
            marker = {
                id: 1,
                coords: {
                    latitude: 64,
                    longitude: 10.2
                },
                windowContent: getWindowContent(construction)
            };

        };

        var getWindowContent = function(construction){
            <div id='windowcontent'>
                <h1 id='firstHeading' class='firstHeading'>construction.anleggsnavn</h1>
                <div id='bodyContent'>


        }


        $scope.constructions = ['1', '2', '3']; // Place markers
        $scope.map_bounds = {'north-east': 0.00, 'south-west': 0.00}; // Calculate and Fit map to result


        uiGmapGoogleMapApi.then(function (maps) {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
        });

        // ANGULAR GOOGLE MAPS END


    });
