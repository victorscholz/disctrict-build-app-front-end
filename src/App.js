import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import Landing from './Landing'

const id = "nycody"
const styleId = "ckfg3dmge01ad19qjdll4l1v6"
const buildingTileId = "mapbox://styles/nycody/ckfg3dmge01ad19qjdll4l1v6"
const accessToken = 'pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ'
// const tileUrl = `https://api.mapbox.com/styles/v1/{id}/{style_id}/tiles/256/{z}/{x}/{y}@2x?access_token={access_token}`
// const testUrl = "https://api.mapbox.com/styles/v1/nycody/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ"
const attribution = 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
const wholeMap = `https://api.mapbox.com/styles/v1/${id}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`


// Map settings
const maxZoom = 19
const minZoom = 10

class App extends React.Component{
  
  state= {
    zoom: 10,
    mapCenter: [40.736330, -73.868422]
  }


  
  
  render = () =>{
    return (
      <>
        <Map
        ref={m => { this.leafletMap = m }}
        id="mapid"
        center={this.state.mapCenter}
        zoom={this.state.zoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        
       >
        <TileLayer

          url= "https://api.mapbox.com/styles/v1/nycody/ckfinrrjx16pj19l9v2sco4wk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ"
          attribution={attribution}

        />


      </Map>
        <Landing />

      </>
    )
  }
}

export default App;
