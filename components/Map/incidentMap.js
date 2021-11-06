import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '500px'
};

const center = {
  lat: -1.2145862,
  lng: 36.8874376
};

function MyComponent() {
  const [location, setLocation] = useState(center)
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setCenter()
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const setCenter = () => {
    let {lat, lng} = JSON.parse(localStorage.getItem('alert'));
    setLocation({lat: parseFloat(lat), lng: parseFloat(lng)});
  }
  return isLoaded ? (
    <div
    style={{
      height: '90vh',
      width: '500px',
      margin: 'auto',
      marginTop: '90px',
      marginLeft: '250px',
    }}
  >
    {console.log('location: ', location)}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        // options={options}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={location} label={'Incident'}/>
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(MyComponent)
