import React, { useEffect, useState, useRef } from 'react';

const Map = () => {
    const [map, setMap] = useState(null);
    const [service, setService] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const searchTextFieldRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlA80a7vg5GZvT1CWIGZ6a8eR2IuQ2QDs&libraries=places`;
        script.onload = initializeMap;
        document.head.appendChild(script);
    }, []);

    const initializeMap = () => {
        const pyrmont = new window.google.maps.LatLng(-33.8665433, 151.1956316);
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        const input = searchTextFieldRef.current;
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bound', map);
        const marker = new window.google.maps.Marker({
            map: map
        });

        window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            const request = {
                location: place.geometry.location,
                radius: '500',
                type: ['atm']
            };
            const service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        });

        setMap(map);
    };

    const callback = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    };

    const createMarker = (place) => {
        const marker = new window.google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        window.google.maps.event.addListener(marker, 'click', () => {
            alert(place.name);
            window.open(place.photos[0].getUrl(), "_blank");
            infowindow.open(map, this);
        });
    };

    return (
        <div>
            <input ref={searchTextFieldRef} type="text" size="50" />
            <div id="map" style={{ height: '500px' }}></div>
        </div>
    );
};

export default Map;
