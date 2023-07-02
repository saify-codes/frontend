import { useEffect, useRef } from 'react';

const GoogleMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    document.head.appendChild(googleMapScript);

    // Initialize the map
    googleMapScript.onload = () => {
      const mapOptions = {
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        zoom: 10,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      const marker = new window.google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map: map,
      });
    };

    // Cleanup
    return () => {
      document.head.removeChild(googleMapScript);
    };
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: '400px' }}></div>;
};

export default GoogleMap;
