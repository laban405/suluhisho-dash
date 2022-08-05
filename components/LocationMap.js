import GoogleMapReact from "google-map-react";

const LocationMarker = ({ text }) => <div>{text}</div>;

const LocationMap = ({ zoom, defaultCenter }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        zoom={zoom}
        defaultCenter={defaultCenter}
      >
        <LocationMarker
          lat={-1.3062755503323038}
          lng={36.83437569368872}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default LocationMap;
