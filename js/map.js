function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.7520018, lng: -95.3755103},
    zoom: 11
  });

  
  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'location',
      from: '1RRiwniMV-DJNO0PuGVx_c_Kt1ilcn3ndhSCGTgIo'
    },
    heatmap: {
      enabled: true
    }
  });
  

  layer.setMap(map);

}