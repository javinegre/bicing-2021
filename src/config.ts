import { IMarkerColorConfig } from './interfaces';

const bicingApiUrl: string = 'https://negre.co/bicing/api/v1.0/';

// Ui
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

export default {
  bicingApiUrl,
  mapMarkerSizeZoomThreshold,
  markerColor,
};
