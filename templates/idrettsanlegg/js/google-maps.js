/**
  Google maps functionality
**/

var map;
var markers;
var offsetTop;
var window_height;
var mapCenter;
var bounds;


$(document).ready(function () {
    var map_canvas = $('#map-canvas');
    window_height = $(window).height();
    offsetTop = map_canvas.offset().top;
    $(map_canvas).css('height', (window_height - offsetTop - window_height*0.01));
});


// Makes the map responsive in the horizontal direction
$(window).resize(function () {
    window_height = $(window).height();
    $('#map-canvas').css('height', (window_height - offsetTop - window_height*0.01));
}).resize();


// Call this to initialize the map object
function initMap() {
    var mapOptions = {
        center: {lat: 63.418821, lng: 10.2983369},
        zoom: 6,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN
            ]
        }
    };

    // Initializes the map
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    // List containing markers (for testing)
    markers = [
          ['London Eye, London', 51.503454, -0.119562],
          ['Palace of Westminster, London', 51.499633, -0.124755]
    ];

    // TODO: make it possible to add markers to the map, adjust the map to show all the current markers
}


/*
    Adds a marker to a map.
    This method also returns the new marker.
    Format:
        - position: {lat: -25.234, lng: 123.100}
        - map: the map object
        - title: string
 */
function addMarkerToMap(title, position, map){
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title
    });
    return marker;
}


/*
    Add an info window to a marker with the specified content.
    When the marker is clicked, the info window will pop up above the marker.
 */
function addInfoWindowToMarker(marker, markerContent) {
  var infowindow = new google.maps.InfoWindow({
    content: markerContent
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}


/*
    Used by the DOM listener in the initMap() method.
    The function is run if the map is clicked (the action trigger may be changed)
 */
function domListenerFunction(){

}

