import { FC, useState } from 'react';
import styles from './Map.module.scss';
import { MapView } from '@aws-amplify/ui-react-geo';
import '@aws-amplify/ui-react-geo/styles.css';
import { NavigationControl, FullscreenControl, ScaleControl, Marker, Popup } from 'react-map-gl';
import { MapProps, PopupInfo } from '@/types/props';

const Map: FC<MapProps> = ({ markers, initialCoordinates, initialZoom = 10 }) => {
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  return (
    <div className={styles.container}>
      <MapView
        initialViewState={{
          latitude: initialCoordinates[1],
          longitude: initialCoordinates[0],
          zoom: initialZoom,
        }}
        mapStyle={'VectorHereExplore'}
        style={{ borderRadius: '20px', width: 'inherit', height: 'inherit' }}
        onRender={(event) => event.target.resize()}
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" showCompass={false} />
        <ScaleControl unit="imperial" />
        {/* <GeolocateControl /> */}
        {markers.map(({ coordinates, name, colour }, index) => {
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
        })}

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

export default Map;
