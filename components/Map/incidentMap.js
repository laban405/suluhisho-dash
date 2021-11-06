import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '500px',
  margin: 'auto',
  marginTop: '90px',
  marginLeft: '250px',
};

function MyComponent(props) {
  const {alert} = props;
  console.log('alert', alert);
  const {lat, lng} = alert;
  let location = {lat: parseFloat(lat), lng: parseFloat(lng)};

  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        // options={options}
        zoom={0}
        onLoad = {onLoad}
        onUnmount = {onUnmount}
      >
        <Marker position={location} label={'Incident'}/>
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
