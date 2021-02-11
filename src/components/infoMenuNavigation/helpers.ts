import { IStationData } from '../../interfaces';
import { StationResourceTypeEnum } from '../../enums';

const getDirectionsUrl: (
  stationData: IStationData,
  resourceShown: StationResourceTypeEnum,
) => string = (stationData, resourceShown) => {
  // Creates link to google maps based on station coordinates
  const apiUrl = 'https://www.google.com/maps/dir/';
  const travelMode =
    resourceShown === StationResourceTypeEnum.bikes ? 'walking' : 'bicycling';

  return `${apiUrl}?api=1&destination=${stationData.lat},${stationData.lng}&travelmode=${travelMode}`;
};

const getStreetViewUrl: (stationData: IStationData) => string = (
  stationDataa,
) => {
  // Creates link to google street view based on station coordinates
  const apiUrl = 'https://www.google.com/maps';
  return `${apiUrl}?layer=c&cbll=${stationDataa.lat},${stationDataa.lng}&cbp=,-75,,,10`;
};

export default { getDirectionsUrl, getStreetViewUrl };
