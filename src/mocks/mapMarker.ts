import { IStationData } from '../interfaces';
import { IMarkerWithData } from '../components/map/interfaces';

const getMapMarkerMock: (stationData: IStationData) => IMarkerWithData = (
  stationData,
) =>
  ({
    stationData,
    getPosition(): google.maps.LatLng | null | undefined {
      return {
        lat: (): number => stationData.lat,
        lng: (): number => stationData.lng,
      } as google.maps.LatLng;
    },
  } as IMarkerWithData);

// eslint-disable-next-line import/prefer-default-export
export { getMapMarkerMock };
