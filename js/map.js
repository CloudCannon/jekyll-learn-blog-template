function initializeMap() {
    let bounds = new google.maps.LatLngBounds(),
        mapOptions = {
            mapTypeId: 'roadmap',
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}]
        };

    // Display a map on the page
    let map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(45);
    
    // Keep track of open marker
    const infowindow = new google.maps.InfoWindow;

    for (let i = 0; i < markers.length; i++ ) {

        let position = new google.maps.LatLng(markers[i].latitude, markers[i].longitude);
        bounds.extend(position);

        const marker = new google.maps.Marker({
            id: i,
            position: position,
            map: map,
            title: markers[i].name,
            icon: "/images/marker.svg"
        });

        marker.addListener("click", () => {
            infowindow.setContent(`
            <div class="marker-info">
                <img class="marker-info__image" src="${markers[marker.id].image}">
                <div class="marker-info__text">
                    <p class="marker-info__title">${marker.title}</p>
                    <p>Status: ${markers[marker.id].status}</p>
                </div>
            </div>`);
            infowindow.open(map, marker);
        });

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    let boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(5);
        google.maps.event.removeListener(boundsListener);
    });
}