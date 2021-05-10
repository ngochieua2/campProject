mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campgroundjs.geometry.coordinates, //[-74.5, 40], // starting position [lng, lat]
    zoom: 8 // starting zoom
});
//campgroundjs.geometry.coordinates ,
new mapboxgl.Marker()
    .setLngLat(campgroundjs.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML(
            `<h3>${campgroundjs.title}</h3><p>${campgroundjs.location}</p>`
        )
    )
    .addTo(map)
