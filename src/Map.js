import React from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import VisitList from "./VisitList";
// import Login from "./Login";

// const railsUrl = "http://localhost:3000/buildings/";
const railsUrl = "https://frozen-dusk-67940.herokuapp.com/buildings";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ";

const buildingUrl =
  "https://victorscholz.github.io/Data/building_database.geojson";

class Map extends React.Component {
  state = {
    lat: 40.7,
    lng: -73.96,
    zoom: 11,
    pitch: 1.5, // pitch in degrees
    bearing: 28.81, // bearing in degrees
    searchInput: "",
    historyClicked: false,
    visitListArray: [],
    loginClicked: false,
    loginValue: "",
    passwordValue: "",
  };

  changeHandler = (e) => {
    e.persist();
    this.setState(() => ({ searchInput: e.target.value }));
  };

  changeHistoryState = () => {
    this.setState(() => ({ historyClicked: !this.state.historyClicked }));
  };

  changeLoginState = () => {
    this.setState(() => ({ loginClicked: !this.state.loginClicked }));
  };

  style = () => {
    return "mapbox://styles/nycody/ckfmxz8ee088d19ogaf86esjm";
  };

  componentDidMount() {
    fetch(railsUrl)
      .then((resp) => resp.json())
      .then((data) => this.setState(() => ({ visitListArray: data })));

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.style(),
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxZoom: 18,
      minZoom: 10,
      pitch: this.state.pitch,
      bearing: this.state.bearing,
    });

    // Setting state to match user moving around the map
    // map.on("move", () => {
    // 	this.setState({
    // 		lng: map.getCenter().lng.toFixed(4),
    // 		lat: map.getCenter().lat.toFixed(4),
    // 		zoom: map.getZoom().toFixed(2),
    // 		pitch: map.getPitch().toFixed(2),
    // 		bearing: map.getBearing().toFixed(2),
    // 	});
    // });

    // Add polygons over buildings

    map.on("load", () => {
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
          "fill-color": "rgba(31, 146, 239, 0.4)",
          "fill-outline-color": "rgba(145, 145, 145, 1)",
        },
      });

      map.on("click", "nycody.bx1az61y", (e) => {
        // (e.features[0].properties);
        // fetch("http://localhost:3000/buildings", {
          fetch("https://frozen-dusk-67940.herokuapp.com/buildings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            building: e.features[0].properties,
          }),
        })
          .then((response) => response.json())
          .then((data) =>
            this.setState({
              visitListArray: [data, ...this.state.visitListArray],
            })
          );
      });

      // When a click event occurs on a feature in the buildings layer, open a popup at the
      // location of the click, with description HTML from its properties.

      // await fetch requests
      map.on("click", "nycody.bx1az61y", function (e) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            "<strong>Building/Landmark Name: </strong><br>" +
              e.features[0].properties.build_nme +
              "<br><strong>Developer: </strong></br>" +
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
              "<br><strong>Borough: </strong></br>" +
              e.features[0].properties.borough +
              "<br><strong>Historical District: </strong></br>" +
              e.features[0].properties.hist_dist +
              "<br><strong>Address: </strong></br>" +
              e.features[0].properties.des_addres
          )
          .addTo(map);
        // console.log(e.features[0].properties);
        // logs each building that's clicked
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

  deleteBuilding = (buildingObj) => {
    // fetch(`http://localhost:3000/buildings/${buildingObj.id}`, {
      fetch(`https://frozen-dusk-67940.herokuapp.com/${buildingObj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ building: buildingObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedArray = this.state.visitListArray.filter(
          (currentObj) => buildingObj.id !== currentObj.id
        );
        this.setState({
          visitListArray: updatedArray,
        });
      });
  };

  loginHandler = (e) => {
    e.persist();
    this.setState(() => ({ loginValue: e.target.value }));
  };

  passwordHandler = (e) => {
    e.persist();
    this.setState(() => ({ passwordValue: e.target.value }));
  };

  formReset = () => {
    this.setState({ loginValue: "", passwordValue: "" });
  };

  render = () => {
    return (
      <>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
        <VisitList
          changeHistoryState={this.changeHistoryState}
          historyClicked={this.state.historyClicked}
          visitListArray={this.state.visitListArray}
          deleteBuilding={this.deleteBuilding}
        />

        {/* <Login
          changeLoginState={this.changeLoginState}
          loginClicked={this.state.loginClicked}
          loginValue={this.state.loginValue}
          loginHandler={this.loginHandler}
          passwordHandler={this.passwordHandler}
          passwordValue={this.state.passwordValue}
          formReset={this.formReset}
        /> */}
      </>
    );
  };
}

export default Map;
