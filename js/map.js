var map;
var layer;


/****************************************************************/
// Zoom to current position and show marker
// See also: navigator.geolocation.getCurrentPosition
var showPosition = function(position) {
  
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var marker = new google.maps.Marker({
    position: userLatLng,
    title: 'Your Location',
    map: map
  });

  map.setZoom(15);
}

/****************************************************************/
// Main method
function initMap() {
  //
  // Create map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 29.7520018,
      lng: -95.3755103
    },
    zoom: 10
  });
  
  //
  // Initialize layer
  var defaultStyles = [{
      markerOptions: {
        iconName: "small_green"
      }
    }, {
      where: 'num_events >= 2',
      markerOptions: {
        iconName: "small_yellow"
      }
    }, {
      where: 'num_events >= 5',
      markerOptions: {
        iconName: "small_red"
      }
    }];
  layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'location',
      from: '1owJ4hRvFUqFo5h9gLpLKt9yoekQtPI_ID2WUkdM5'
    },
    heatmap: {
      enabled: true
    },
    styles: defaultStyles
  });

  layer.setMap(map);

  /***********/

  //
  // Add a listener to zoom to current location and show a marker
  google.maps.event.addDomListener(document.getElementById('zoomtomyposition'),
    'click',
    function() {
      navigator.geolocation.getCurrentPosition(showPosition);
    });

  //
  // Add a listener to update display when zoom changes
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var zoomLevel = map.getZoom();
    //
    // Show heatmap when the map is coarse
    if (zoomLevel <= 13) {
      layer.setMap(null); // Workaround, looks like the display doesn't update correctly otherwise
      layer.setOptions({
        heatmap: {
          enabled: true
        }
      });
      layer.setMap(map); // Workaround, looks like the display doesn't update correctly otherwise
    } 
    //
    // When the map is zoomed in, show data points
    else {
      layer.setMap(null);
      // If the zoom is very fine, add caution sign marker
      if (zoomLevel > 15) {
        layer.setOptions({
          styles: [{
            markerOptions: {
              iconName: "small_green"
            }
          }, {
            where: 'num_events >= 2',
            markerOptions: {
              iconName: "small_yellow"
            }
          }, {
            where: 'num_events >= 5',
            markerOptions: {
              iconName: "small_red"
            }
          }, {
            where: 'num_events >= 15',
            markerOptions: {
              iconName: "caution"
            }
          }]
        });
      }
      // If the zoom is moderately fine, use default style
      else {
        layer.setOptions({
          styles: defaultStyles
        });
      }
      layer.setOptions({
        heatmap: {
          enabled: false
        }
      });
      layer.setMap(map);
    }
    document.getElementById('zoom').innerHTML = zoomLevel;
  });

  //
  // Add listener to customize info window display
  google.maps.event.addListener(layer, 'click', function(e) {

    //
    // Change the content of the InfoWindow
    e.infoWindowHtml = "<b>" + e.row['VIC_LEGAL_DESCRIPTION'].value + "</b><br>";
    e.infoWindowHtml += "Oops! <b>" + e.row['num_events'].value;
    if (e.row['num_events'].value == 1) {
      e.infoWindowHtml += "</b> Houstonian got a ticket here!" + "<br>";
    } else {
      e.infoWindowHtml += "</b> Houstonians got a ticket here!" + "<br>";
    }
  });

}
google.maps.event.addDomListener(window, 'load', initialize);
