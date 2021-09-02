import React, {useEffect, useState} from 'react';
import Room from '@material-ui/icons/Room'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

export default function GoogleMaps(props) {
  const [defaultCenter, setDefaultCenter] = useState({lat: -1.2146236, lng: 36.8875214});
  const defaultOptions = { scrollwheel: false };
  
  const RegularMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
      defaultZoom={8}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
      >
      <Marker position={defaultCenter} />
      </GoogleMap>
      ))
      );
    
  const loadingElementStyle = { height: '100%' };
  const containerElementStyle = { height: '450px' };
  const mapElementStyle = { height: '100%' };
    
  useEffect(() => {
    let cordinates = JSON.parse(localStorage.getItem('alert'));
    // setDefaultCenter({lat: parseInt(cordinates.lat), lng: parseInt(cordinates.lng)})
    setDefaultCenter({lat: parseInt(-1.2146236), lng: parseInt(36.8875214)})
  }, [])
  
  
  return (
    <div
      style={{
        height: '90vh',
        width: '80%',
        margin: 'auto',
        marginTop: '90px',
      }}
    >
      <RegularMap
        // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`}AIzaSyAxqV2MiSDAF3rV81ZDYwrtzL7NjvQqQhI
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAxqV2MiSDAF3rV81ZDYwrtzL7NjvQqQhI`}
        loadingElement={<div style={loadingElementStyle} />}
        containerElement={<div style={containerElementStyle} />}
        mapElement={<div style={mapElementStyle} />}
        center={defaultCenter}
      />
    </div>
  );
}
