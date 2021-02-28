import mapHelpers from './helpers';
import { getMapHandlerMock } from '../../mocks/mapHandler';
import { getStoreMock } from '../../mocks/store';
import { getMapMarkerMock } from '../../mocks/mapMarker';
import { StationResourceTypeEnum } from '../../enums';

describe('Map helpers', () => {
  test('split marker list by visibility, city center', async () => {
    const storeMock = getStoreMock();
    const mapHandlerMock = getMapHandlerMock();

    await storeMock.getActions().stationList.fetch();

    const stationListMock = storeMock.getState().stationList.stations;

    const markerList = stationListMock.map(getMapMarkerMock);

    const [
      visibleStations,
      hiddenStations,
    ] = mapHelpers.splitMarkerListByVisibility(markerList, mapHandlerMock);

    expect(visibleStations).toHaveLength(7);
    expect(hiddenStations).toHaveLength(1);
    expect(hiddenStations[0].stationData.id).toEqual(8);

    (mapHandlerMock as any).changeBoundsMock('marinaMeridiana');

    const [
      newVisibleStations,
      newHiddenStations,
    ] = mapHelpers.splitMarkerListByVisibility(visibleStations, mapHandlerMock);

    expect(newVisibleStations).toHaveLength(1);
    expect(newVisibleStations[0].stationData.id).toEqual(7);
    expect(newHiddenStations).toHaveLength(6);
  });

  test('split marker list by visibility, city limits', async () => {
    const storeMock = getStoreMock();
    const mapHandlerMock = getMapHandlerMock();

    await storeMock.getActions().stationList.fetch();

    const stationListMock = storeMock.getState().stationList.stations;

    const markerList = stationListMock.map(getMapMarkerMock);

    (mapHandlerMock as any).changeBoundsMock('ciutatMeridiana');

    const [
      visibleStations,
      hiddenStations,
    ] = mapHelpers.splitMarkerListByVisibility(markerList, mapHandlerMock);

    expect(visibleStations).toHaveLength(1);
    expect(visibleStations[0].stationData.id).toEqual(8);
    expect(hiddenStations).toHaveLength(7);
  });

  test('split marker list by visibility, outside limits', async () => {
    const storeMock = getStoreMock();
    const mapHandlerMock = getMapHandlerMock();

    await storeMock.getActions().stationList.fetch();

    const stationListMock = storeMock.getState().stationList.stations;

    const markerList = stationListMock.map(getMapMarkerMock);

    (mapHandlerMock as any).changeBoundsMock('outside');

    const [
      visibleStations,
      hiddenStations,
    ] = mapHelpers.splitMarkerListByVisibility(markerList, mapHandlerMock);

    expect(visibleStations).toHaveLength(0);
    expect(hiddenStations).toHaveLength(8);
  });

  test('station not in marker list', async () => {
    const storeMock = getStoreMock();
    const mapHandlerMock = getMapHandlerMock();

    await storeMock.getActions().stationList.fetch();

    const stationListMock = storeMock.getState().stationList.stations;

    const markerList = stationListMock.map(getMapMarkerMock);

    const [visibleStations] = mapHelpers.splitMarkerListByVisibility(
      markerList,
      mapHandlerMock,
    );

    const isStation8NotInList = mapHelpers.isNotInList(visibleStations)(
      stationListMock[7],
    );
    expect(isStation8NotInList).toBe(true);
  });

  test('station marker color', async () => {
    const storeMock = getStoreMock();

    await storeMock.getActions().stationList.fetch();

    const stationListMock = storeMock.getState().stationList.stations;

    const marker1 = mapHelpers.getStationMarker(
      stationListMock[0],
      StationResourceTypeEnum.bikes,
      [true, true],
      14,
    );

    expect(marker1).toEqual('bikes-big-green.svg');

    const marker2 = mapHelpers.getStationMarker(
      stationListMock[1],
      StationResourceTypeEnum.docks,
      [true, true],
      13,
    );
    expect(marker2).toEqual('docks-small-black.svg');

    const marker3 = mapHelpers.getStationMarker(
      stationListMock[2],
      StationResourceTypeEnum.bikes,
      [true, true],
      14,
    );
    expect(marker3).toEqual('bikes-big-gray.svg');

    const marker4 = mapHelpers.getStationMarker(
      stationListMock[3],
      StationResourceTypeEnum.bikes,
      [false, true],
      13,
    );
    expect(marker4).toEqual('bikes-small-red.svg');

    const marker5 = mapHelpers.getStationMarker(
      stationListMock[4],
      StationResourceTypeEnum.bikes,
      [true, false],
      14,
    );
    expect(marker5).toEqual('bikes-big-orange.svg');
  });

  test('user location marker', () => {
    const userLocationMarker = mapHelpers.getUserLocationMarker();
    expect(userLocationMarker).toEqual('user-location.svg');
  });
});
