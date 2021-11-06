import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '500px'
};

const center = {
  lat: -1.3029533,
  lng: 36.83783
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAxqV2MiSDAF3rV81ZDYwrtzL7NjvQqQhI"
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
    <div
    style={{
      height: '90vh',
      width: '500px',
      margin: 'auto',
      marginTop: '90px',
    }}
  >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {/* <RoomIcon/> */}
        <Marker position={center}/>
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(MyComponent)
