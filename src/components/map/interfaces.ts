import { IStationList } from '../../interfaces';

export interface IMapProps {
  stationList: IStationList | null;
  updateStationList: () => void;
}
