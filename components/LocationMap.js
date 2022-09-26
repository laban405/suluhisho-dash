import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const LocationMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ zoom, defaultCenter, location, onDragEnd }) => (
  <GoogleMap defaultZoom={zoom} defaultCenter={defaultCenter}>
    <Marker position={location} draggable onDragEnd={onDragEnd} />
  </GoogleMap>
));

export default LocationMap;
