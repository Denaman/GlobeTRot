
        //Function search() that will be used in the input element
       /* function search(){
            //An if statement that checks what key we are using (ascii code for enter key 13)
            if(event.keyCode == 13){
                //Query document with the getElementById attribute to target the input element, getting the value from the user
                let location = document.getElementById("test").value;
                console.log(location)
                //Query the document with the getElementById attribute to target the iframe element. Using the setAttribute method to change the src.
                //Added a zoom parameter in the API call for when a user search a location (&zoom=15).
                document.getElementById('map').setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&zoom=15&q=${location}`)
            }
        }*/
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