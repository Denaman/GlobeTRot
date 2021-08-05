
      let map;
      let service;
      let infoWindow;

      //Request making function and the create marker
      function makeRequest(keywordText){
        const request = {
            query: keywordText,
            fields: ["geometry"],
        };
    
        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                // The create marker
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
            }
        });
    }
        //The initMap
        function initMap() {
            const sydney = new google.maps.LatLng(-33.867, 151.195);
            infoWindow = new google.maps.InfoWindow();
            map = new google.maps.Map(document.getElementById("map"), {
                center: sydney,
                zoom: 14,
            });
        }

        //The create marker
        function createMarker(place) {
            if (!place.geometry || !place.geometry.location) return;
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
            });
            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(place.name || "");
                infoWindow.open(map);
            });
        }

        //Event lister
        document.getElementById("search").addEventListener("change", function (e){
            makeRequest(e.target.value);
        })