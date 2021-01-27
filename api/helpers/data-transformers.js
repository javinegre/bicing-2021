const stationInfoTransform = (station) => ({
  id: station.station_id,
  name: station.name,
  lat: station.lat,
  lng: station.lon,
});

const stationStatusTransform = (station) => ({
  i: station.station_id,
  e: station.num_bikes_available_types.ebike,
  m: station.num_bikes_available_types.mechanical,
  d: station.num_docks_available,
  s: +(station.status === 'IN_SERVICE'),
});

module.exports = {
  stationInfoTransform,
  stationStatusTransform,
};
