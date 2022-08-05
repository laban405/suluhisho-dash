import { GoogleApiWrapper, Map } from "google-maps-react";

const MapContainer = ({ google }) => (
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
    zoom={6}
    initialCenter={{
      lat: "1.2921",
      lng: "36.8219",
    }}
  />
);

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(MapContainer);
