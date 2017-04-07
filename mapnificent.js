var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30, lng: 0},
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var highlightLayer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk'
    },
    styles: [
      {
        polygonOptions: {
          fillColor: '#FF0000',
          fillOpacity: 0.001
        }
      },
      {
        where: "ISO_2DIGIT IN ('TR', 'DE', 'GB')",
        polygonOptions: {
          fillColor: '#0000FF',
          fillOpacity: 0.5
        }
      }
    ],
    map: map,
    suppressInfoWindows: true
  });
}
