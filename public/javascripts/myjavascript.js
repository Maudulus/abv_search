var map;
var markers = [];
var infoWindows = [];
var arr = []
var min_dataset_arr = [];
var max_dataset_arr = [];

function initialize() {
  var usa = new google.maps.LatLng(37.09024, -95.712891);

  var mapOptions = {
    zoom: 2,
    center: usa,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  getBeers();
}

// Add a marker to the map and push to the array.
function addMarker(location, infoWindowContent) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    $.each(infoWindows, function(index, infoWindow) {
      infoWindow.close();
    });

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 220
    });

    infoWindows.push(infoWindow);
    infoWindow.open(map, marker);

    console.log("hello")

  });
}

function getBeers(abv) {
  deleteMarkers();

  if (typeof abv === 'undefined') {
    abv = '14';
  }
  url = '/beers?abv=' + abv;

  $.get(url, function(data) {
    $.each(data, function(index, beer) {
      var breweries = beer.breweries || [];

      $.each(breweries, function(index, brewery) {
        var locations = brewery.locations || [];

        $.each(locations, function(index, location) {
          var marker = new google.maps.LatLng(location.latitude, location.longitude);

          var labels = beer.labels;
          var label = 'http://www.brainymunchkins.com.au/imagegal/thumb/demo.gif';

          if (typeof labels !== 'undefined') {
            label = labels.icon;
          }

          var infoWindowContent = '<div style="min-width: 200px; min-height: 300px;">' +
              '<h3>' + beer.name + '</h3>' +
              '<p><img src="' + label + '"></p>' +
              '<p>ABV: ' + beer.abv + '%</p>' +
              '<p>' + beer.description + '</p>' +
            '</div>';

          addMarker(marker, infoWindowContent);
        });
      });
    });
  });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

$('#buttons').on('click', 'button', function(event) {
  event.preventDefault();
  var $filter = $(event.currentTarget);
  var abv = $filter.data('abv');

  getBeers(abv);
});



function sliderEvent(event) {
  var abv = rangevalue.value;

  getBeers(abv);
};


$("#abvslider").change(function(event) {
  sliderEvent(event);
});

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

    var chartdata = [{
        value: 30,
        color: "#F7464A"
    }, {
        value: 50,
        color: "#E2EAE9"
    }, {
        value: 100,
        color: "#D4CCC5"
    }, {
        value: 40,
        color: "#949FB1"
    }, {
        value: 120,
        color: "#4D5360"
    }

    ]

    var options = {
        animation: true
    };

    //Get the context of the canvas element we want to select
    var c = $('#myChart');
    var ct = c.get(0).getContext('2d');
    var ctx = document.getElementById("myChart").getContext("2d");
    var ctv = document.getElementById("mySecondChart").getContext("2d");
    /*************************************************************************/
    // myNewChart = new Chart(ct).Doughnut(chartdata, options);


var arr = [];
var min_dataset_arr = [];
var max_dataset_arr = [];

  for (var i = 0; i < data["data"].length; i++) {
    for (var q = 0; q < 5; q++) {
      try {
        arr.push(data["data"][i]["breweries"][0]["name"]);
        min_dataset_arr.push(data["data"][i]["style"]["abvMin"]);
        max_dataset_arr.push(data["data"][i]["style"]["abvMax"]);
      }
      catch(err) {
        console.log("Not all locations were properly discovered.")
      }
  }}
  arr = arr.filter(function(elem, pos) {
    return arr.indexOf(elem) == pos;
  })
    min_dataset_arr = min_dataset_arr.filter(function(elem, pos) {
    return min_dataset_arr.indexOf(elem) == pos;
  })
  max_dataset_arr = max_dataset_arr.filter(function(elem, pos) {
    return max_dataset_arr.indexOf(elem) == pos;
  })
      debugger;

    var chartdata2 = {
  labels : arr,
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      data : min_dataset_arr
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      data : max_dataset_arr
    }
  ]
}
    barchart = new Chart(ctv).Bar(chartdata2,options);
