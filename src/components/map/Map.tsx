import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

import mapConfig from './config';

import './Map.css';

const Map: React.FunctionComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: window.env?.GOOGLE_MAPS_API_KEY ?? '',
  });

  const { center: mapCenter, zoom: mapZoom, options: mapOptions } = mapConfig;

  const [, setMap] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart: () => void = () => {
    setIsDragging(true);
  };

  const onDragEnd: () => void = () => {
    setIsDragging(false);
  };

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="Map">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={mapCenter}
          zoom={mapZoom}
          options={mapOptions}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onUnmount={onUnmount}
        >
          <Marker key="1" position={mapCenter} opacity={isDragging ? 0.2 : 1} />
        </GoogleMap>
      )}
      {!isLoaded && <>Map</>}
    </div>
  );
};

export default Map;
