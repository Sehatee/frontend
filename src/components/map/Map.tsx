/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh", // Changed to full viewport height
  borderRadius: "0px", // Removed border radius
};

//for map

const defaultMapZoom = 15; // Reduced zoom level to show more area

// Add marker position (same as center for this example)

const defaultMapOptions = {
  zoomControl: true,
  tilt: 45, // Added tilt for better perspective
  gestureHandling: "cooperative", // Changed to cooperative for better mobile handling
  mapTypeId: "roadmap", // Changed to hybrid view to show satellite + roads
  fullscreenControl: true, // Added fullscreen control
  streetViewControl: true, // Added street view control
  mapTypeControl: true, // Added map type control
};

const MapComponent = ({ lat, lng }: { lat: number; lng: number }) => {
  const defaultMarkerPosition = {
    lat,
    lng,
  };
  const defaultMapCenter = {
    lat,
    lng,
  };

  // Add marker to the map
  <Marker position={defaultMarkerPosition} />;
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {/* ✅ ضَع الـ Marker هنا */}
        <Marker position={defaultMarkerPosition} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
