import { MapView } from '@aws-amplify/ui-react-geo';
import { type FC, useCallback, useMemo, useState } from 'react';
import styles from './LocationMap.module.scss';
import '@aws-amplify/ui-react-geo/styles.css';
import type { LocationMapProps, PopupInfo } from '@/types/props';
import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, SEARCH_DEFAULT_ZOOM_LEVEL } from '@/utils/globals';
import { Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import type { ViewStateChangeEvent } from 'react-map-gl';

const LocationMap: FC<LocationMapProps> = ({
  markers,
  initialCoordinates,
  initialZoom = SEARCH_DEFAULT_ZOOM_LEVEL,
}) => {
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [viewState, setViewState] = useState({
    longitude: initialCoordinates[0],
    latitude: initialCoordinates[1],
    zoom: initialZoom,
  });

  const onMove = useCallback((event: ViewStateChangeEvent) => setViewState(event.viewState), []);

  const mapMarkers = useMemo(
    () =>
      markers.map(({ coordinates, name, colour }, index) => {
        return (
          <Marker
            key={`${coordinates[1]}-${coordinates[0]}-${index}`}
            latitude={coordinates[1]}
            longitude={coordinates[0]}
            anchor="top"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              setPopupInfo({ latitude: coordinates[1], longitude: coordinates[0], name });
            }}
            color={colour}
            style={{ cursor: 'pointer' }}
          />
        );
      }),
    [markers]
  );

  return (
    <div className={styles.container}>
      <MapView
        reuseMaps
        {...viewState}
        mapStyle={'VectorHereExplore'}
        style={{ borderRadius: '20px', width: 'inherit', height: 'inherit' }}
        onMove={onMove}
        maxZoom={MAX_ZOOM_LEVEL}
        minZoom={MIN_ZOOM_LEVEL}
      >
        {/* fullscreen can be uncommented when the bug is fixed: https://github.com/visgl/react-map-gl/issues/2320 */}
        {/* <FullscreenControl position="top-left" /> */}
        <NavigationControl position="top-left" showCompass={false} />
        <ScaleControl unit="imperial" />
        {/* <GeolocateControl /> */}
        {mapMarkers}

        {popupInfo && (
          <Popup
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>{popupInfo.name}</div>
          </Popup>
        )}
      </MapView>
    </div>
  );
};

export default LocationMap;
