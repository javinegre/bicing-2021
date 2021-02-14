import { AriaAttributes } from 'react';

// Aria related properties to extend function components
export interface IAccessibleFunctionComponentProps extends AriaAttributes {
  // Based on HTMLAttributes interface

  // WAI-ARIA
  role?: string;
  tabIndex?: number;
}

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

export interface IStationDataExtended extends IStationData {
  distance: number;
  inNearbyArea: boolean;
}

export interface IStationList {
  updateTime: number | null;
  stations: IStationData[];
}
