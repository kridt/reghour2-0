/* import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends Component {
  render() {
    const mapStyles = {
      width: "400px",
      height: "200px",
    };
    const { latitude, longitude } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Marker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.AIzaSyCPoQVDvDnX2ntvzk1nWQfXJualQvcqoy0,
})(GoogleMap);
 */
