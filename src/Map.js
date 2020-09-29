import React from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
	"pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ";

const buildingUrl =
    "https://victorscholz.github.io/Data/building_database.geojson";
    

class Map extends React.Component{
  
state = {
    lat: 40.7,
    lng: -73.96,
    zoom: 11,
    maxZoom: 18,
    minZoom: 10,
    buildingsArray: [],
    searchInput: "",
};

changeHandler = (e) => {
    e.persist();
    this.setState(() => ({ searchInput: e.target.value }));
};

clickHandler = (e) => {
    return console.log("been clicked");
};

style = () => {
    return "mapbox://styles/nycody/ckfmxz8ee088d19ogaf86esjm";
};

componentDidMount() {
    fetch(buildingUrl)
        .then((resp) => resp.json())
        .then((data) => this.setState(() => ({ buildingsArray: data })));

    const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: this.style(),
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom,
        maxZoom: this.state.maxZoom,
        minZoom: this.state.minZoom,
    });

    // Setting state to match user moving around the map
    map.on("move", () => {
        this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
        });
    });

    /////////// Trying to add polygons over buildings

    map.on("load", function () {
        // Add a source for the state polygons.
        map.addSource("buildings", {
            type: "geojson",
            data:
                // "https://data.cityofnewyork.us/resource/x3ar-yjn2.geojson", <- Link from NYC OpenData
                buildingUrl, // <- Workaround with Github pages
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            id: "nycody.bx1az61y",
            type: "fill",
            source: "buildings",
            paint: {
                "fill-color": "rgba(159, 129, 64, 0.4)",
                "fill-outline-color": "rgba(159, 129, 64, 1)",
            },
        });

        // When a click event occurs on a feature in the buildings layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on("click", "nycody.bx1az61y", function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                    "<strong>Developer: </strong>" +
                        e.features[0].properties.own_devel +
                        "<br><strong>Build Type: </strong></br>" +
                        e.features[0].properties.build_type +
                        "<br><strong>Architect: </strong></br>" +
                        e.features[0].properties.arch_build +
                        "<br><strong>Style: </strong></br>" +
                        e.features[0].properties.style_prim +
                        "<br><strong>Materials: </strong></br>" +
                        e.features[0].properties.mat_prim +
                        " & " +
                        e.features[0].properties.mat_sec +
                        "<br><strong>Build Date: </strong></br>" +
                        e.features[0].properties.date_combo +
                        "<br><strong>Original Use: </strong></br>" +
                        e.features[0].properties.use_orig +
                        // '<br><strong>Secondary Material: </strong></br>' + e.features[0].properties.mat_sec +
                        "<br><strong>Borough: </strong></br>" +
                        e.features[0].properties.borough +
                        "<br><strong>Historical District: </strong></br>" +
                        e.features[0].properties.hist_dist +
                        "<br><strong>Address: </strong></br>" +
                        e.features[0].properties.des_addres +
                        `<br><button class="visit-button";
                        }}'>Add to visit list</button></br>`
                )
                .addTo(map);
                console.log(e.features[0].properties)
        });

        // Change the cursor to a pointer when the mouse is over the buildings layer.
        map.on("mouseenter", "nycody.bx1az61y", function () {
            map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "nycody.bx1az61y", function () {
            map.getCanvas().style.cursor = "";
        });
    });

    ////// Search Bar vvv
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "poi",
        // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
        render: function (item) {
            // extract the item's maki icon or use a default
            const maki = item.properties.maki || "marker";
            return (
                "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
                maki +
                "-15.svg'><span class='geocoder-dropdown-text'>" +
                item.text +
                "</span></div>"
            );
        },
        mapboxgl: mapboxgl,
    });
    map.addControl(geocoder);

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}

render = () => {
    return (
        <>
            <div className="sidebarStyle">
                <h3>DistrictBuild NYC</h3>
            </div>
            <div
                ref={(el) => (this.mapContainer = el)}
                className="mapContainer"
            />

        </>
    );
};
}

export default Map;