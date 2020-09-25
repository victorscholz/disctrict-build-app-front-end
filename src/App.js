import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import Landing from './Landing'

const id = "nycody"
const buildingTileSetId = "ckfg3dmge01ad19qjdll4l1v6"
const subwayLineTileSetId = "nycody.0lumlaun"
const accessToken = 'pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ'
// const tileUrl = `https://api.mapbox.com/styles/v1/{id}/{style_id}/tiles/256/{z}/{x}/{y}@2x?access_token={access_token}`
// const testUrl = "https://api.mapbox.com/styles/v1/nycody/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ"
const attribution = 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'



// Map settings
const maxZoom = 19

class App extends React.Component{
  
  state= {
    zoom: 11,
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
       >
        <TileLayer
          url= {`https://api.mapbox.com/styles/v1/${id}/${buildingTileSetId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
          attribution={attribution}
          // id={'mapbox.light'}
          // accessToken={accessToken}
        />
      </Map>
        {/* <Landing /> */}

      </>
    )
  }
}

export default App;
