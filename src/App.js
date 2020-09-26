import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import Landing from './Landing'


mapboxgl.accessToken = 'pk.eyJ1Ijoibnljb2R5IiwiYSI6ImNrZmcxZWFuejAzNWEydHIyMmw5eGIxaWwifQ.7p4RHp9R5RXRDe6YyktAnQ';


// Map settings
const maxZoom = 19
const minZoom = 10



class App extends React.Component{
  
  state= {
    lat: 40.70,
    lng: -73.96,
    zoom: 11,
    maxZoom: 18,
    minZoom: 10
  }

 style = () =>{
   return 'mapbox://styles/nycody/ckfk3tjzs1xw719lv2yteuw6t'
 }

  componentDidMount() {
      const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.style(),
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxZoom: this.state.maxZoom,
      minZoom: this.state.minZoom
      });

      // Setting state to match user moving around the map
      map.on('move', () => {
        this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
        });
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());


        
        
  }

  render = () =>{
    return (
      <>
        <div className='sidebarStyle'>
          <div>DistrictBuild NYC</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
        <Landing />

      </>
    )
  }
}

export default App;
