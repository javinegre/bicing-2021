export interface IStationData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  bikes: number;
  docks: number;
  electrical: number;
  mechanical: number;
  status: 0 | 1;
}

export interface IStationList {
  updateTime: number;
  stations: IStationData[];
}
