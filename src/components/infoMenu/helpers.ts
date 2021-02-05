import { IStationData, IStationDataExtended } from '../../interfaces';

const splitStationListByDistance: (
  stationList: IStationDataExtended[],
  selectedStationData: IStationData | null,
) => [IStationDataExtended[], IStationDataExtended[]] = (
  stationList,
  selectedStationData,
) =>
  stationList.reduce<[IStationDataExtended[], IStationDataExtended[]]>(
    ([closest, farthest], currentStation) => {
      // Filter out selected station (if any) as its data is shown in more detail
      if (selectedStationData?.id === currentStation.id) {
        return [closest, farthest];
      }

      return currentStation.inNearbyArea
        ? [[...closest, currentStation], farthest]
        : [closest, [...farthest, currentStation]];
    },
    [[], []],
  );

export { splitStationListByDistance };
