import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import Landing from './Landing'


const buildingTileSetId = "nycody.bx1az61y"
const subwayLineTileSetId = "nycody.0lumlaun"
const accessToken = 'pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ'
const tileUrl = 'https://api.tiles.mapbox.com/v4/nycody/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ'
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

const api = 'https://api.mapbox.com/v4/nycody.bx1az61y/2/1/1.mvt?access_token=pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ'
// Map settings
const maxZoom = 19

class App extends React.Component{
  
  state= {
    zoom: 10.47,
    mapCenter: [-73.86, 40.73]
  }
  
  render = () =>{
    return (
      <>
        <Landing />
        <Map
        ref={m => { this.leafletMap = m }}
        id="mapid"
        center={this.state.mapCenter}
        zoom={this.state.zoom}
        maxZoom={maxZoom}
       >
        <TileLayer
          attribution={attribution}
          url={tileUrl}
          id={'mapbox.light'}
          accessToken={accessToken}
        />
      </Map>

      </>
    )
  }
}

export default App;
