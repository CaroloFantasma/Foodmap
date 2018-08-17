//Función para que el mapa aparezca en pantalla
function initMap()
{
  map = new google.maps.Map(document.getElementById('mapContainer'),
  {
    center:
    {
      lat: -33.400,
      lng: -70.600
    },
    zoom: 15,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow;

  //Input de búsqueda
  let input = document.getElementById('searchInput');
  let searchBox = new google.maps.places.SearchBox(input);

  //Ubica los resultados dependiendo de la posición del mapa
  map.addListener('bounds_changed', function()
  {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Obtener más detalles del lugar.
  searchBox.addListener('places_changed', function()
  {
    let places = searchBox.getPlaces();

    if (places.length == 0)
    {
      return;
    }

    // Limpia los marcadores anteriores
    markers.forEach(function(marker)
    {
      marker.setMap(null);
    });
    markers = [];

    // Obtener ícono y ubicación de cada lugar.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place)
    {
      if (!place.geometry)
      {
        console.log("Returned place contains no geometry");
        return;
      }
      console.log(places);

      searchResult.innerHTML += `
        <table class="table table-bordered">
          <tbody id="searchResult">
          <td><button>${place.name}</button></td>
          </tbody>
        </table>
      `;

      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Crear un marcador para cada lugar.
      markers.push(new google.maps.Marker(
      {
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      google.maps.event.addListener(markers, 'click', function()
      {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });

      if (place.geometry.viewport)
      {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      }
      else
      {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  //Ubicación actual (geolocalización)
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position)
    {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Ubicación actual');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function()
    {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else
  {
    // El navegador no 
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos)
  {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);

  }

}
  

        