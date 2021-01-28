import React, { useEffect, useRef, useState } from 'react';

import './Map.css';
import useGoogleMaps from '../../hooks/useGoogleMaps';
import mapConfig from './config';

const Map: React.FunctionComponent = () => {
  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<google.maps.Marker[]>([]);

  const { mapHandler } = useGoogleMaps({
    googleMapsApiKey: window.env?.GOOGLE_MAPS_API_KEY ?? '',
    mapDiv: $mapWrapper.current,
    mapOptions: mapConfig,
  });

  useEffect(() => {
    if (mapHandler) {
      const marker = new google.maps.Marker({
        position: mapConfig.center,
        map: mapHandler,
        title: 'Hello World!',
      });

      setMarkerList([...markerList, marker]);
    }
  }, [mapHandler]);

  return (
    <div className="Map">
      <div ref={$mapWrapper} className="Map-wrapper">
        Map
      </div>
    </div>
  );
};

export default Map;
