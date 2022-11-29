import { IMarkerColorConfig } from './components/map/interfaces';

const bicingApiUrl: string = 'https://negre.co/bicing/api/v1.3/';

// Ui
const infoMenuIconColor = '#404040';
const stationStatusBarColor = {
  mechanical: 'red',
  electrical: 'gold',
  docks: '#404040',
};

const mapMarkerSizeZoomThreshold = 14;
const markerColor: IMarkerColorConfig = {
  inactive: {
    threshold: 0,
    color: 'gray',
  },
  none: {
    threshold: 0,
    color: 'black',
  },
  danger: {
    threshold: 2,
    color: 'red',
  },
  warning: {
    threshold: 5,
    color: 'orange',
  },
  success: {
    threshold: Infinity,
    color: 'green',
  },
};

const appConfig = {
  bicingApiUrl,
  infoMenuIconColor,
  stationStatusBarColor,
  mapMarkerSizeZoomThreshold,
  markerColor,
};

export default appConfig;
