import { IXHRStationStatus } from '../services/interfaces';
import { StationStatusEnum } from '../enums';

const stationStatusMock: IXHRStationStatus[] = [
  {
    i: 1,
    e: 12,
    m: 3,
    d: 4,
    s: StationStatusEnum.active,
  },
  {
    i: 2,
    e: 15,
    m: 1,
    d: 0,
    s: StationStatusEnum.active,
  },
  {
    i: 3,
    e: 5,
    m: 6,
    d: 7,
    s: StationStatusEnum.inactive,
  },
  {
    i: 4,
    e: 2,
    m: 0,
    d: 20,
    s: StationStatusEnum.active,
  },
  {
    i: 5,
    e: 0,
    m: 2,
    d: 16,
    s: StationStatusEnum.active,
  },
  {
    i: 6,
    e: 2,
    m: 19,
    d: 1,
    s: StationStatusEnum.active,
  },
  {
    i: 7,
    e: 2,
    m: 2,
    d: 12,
    s: StationStatusEnum.active,
  },
  {
    i: 8,
    e: 1,
    m: 0,
    d: 11,
    s: StationStatusEnum.active,
  },
];

export default stationStatusMock;
