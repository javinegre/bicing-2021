import { DataTransformType } from '../types';
import {
  IOfficialApiStationInfo,
  IOfficialApiStationStatus,
} from '../interfaces';
import {
  IXHRStationInfo,
  IXHRStationStatus,
} from '../../src/services/interfaces';

const stationInfoTransform: DataTransformType<
  IOfficialApiStationInfo,
  IXHRStationInfo
> = (station) => ({
  id: station.station_id,
  name: station.name,
  lat: station.lat,
  lng: station.lon,
});

const stationStatusTransform: DataTransformType<
  IOfficialApiStationStatus,
  IXHRStationStatus
> = (station) => ({
  i: station.station_id,
  e: station.num_bikes_available_types.ebike,
  m: station.num_bikes_available_types.mechanical,
  d: station.num_docks_available,
  s: +(station.status === 'IN_SERVICE'),
});

export default {
  info: stationInfoTransform,
  status: stationStatusTransform,
};
