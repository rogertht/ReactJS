import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Application extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 24.7731,
      lat: 59.4389,
      zoom: 12,
      checked: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    
    const lng = this.state.lng;
    const lat = this.state.lat;
    const zoom = this.state.zoom;

    const content = this.state.checked 
      ? <div className="pin2"></div>
      : null;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        <div className="center-screen">
            <div className="marker"></div>
            { content }
        </div>

        <div className="inline-block absolute top right mt12 mr12 bg-darken75 color-white z1 py6 px12">
          <div>
            <p>Settings:</p>
            
            <div className="toggle_pin_button">
            <label>
              <input type="checkbox"
              defaultChecked={true}    
              checked={ this.state.checked } 
              onChange={ this.handleChange }
              />
              Toggle pin
            </label>
            </div>
          </div>

          
        </div>
        
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
