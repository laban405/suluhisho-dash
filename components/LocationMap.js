import { GoogleApiWrapper, Map } from "google-maps-react";

const MapContainer = ({ google, zoom, initialCenter }) => (
  <Map
    containerStyle={{
      position: "relative",
      width: "100%",
      height: "400px",
    }}
    style={{
      width: "100%",
      height: "100%",
    }}
    google={google}
    zoom={zoom}
    initialCenter={initialCenter}
  />
);

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  ...props,
}))(MapContainer);
