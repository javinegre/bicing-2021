const fetch = require('node-fetch');
const cache = require('memory-cache');

const config = require('./config');
const transformers = require('./helpers/data-transformers');

const Api = () => {
  const getApiUrl = (endpoint) => `${config.bicingApiBaseUrl}${endpoint}`;

  const getStationInfo = async () => {
    const infoEndpoint = config.endpoints.info;
    const infoCacheConfig = config.cacheConfig.info;

    let result = cache.get(infoCacheConfig.key);

    if (!result) {
      const info = await fetch(getApiUrl(infoEndpoint))
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          return null;
        });

      if (info !== null) {
        result = {
          last_updated: info.last_updated,
          stations: info.data.stations.map(transformers.stationInfoTransform),
        };

        cache.put(infoCacheConfig.key, result, infoCacheConfig.ttl);
      }
    }

    return result;
  };

  const getStationStatus = async () => {
    const statusEndpoint = config.endpoints.status;
    const statusCacheConfig = config.cacheConfig.status;

    let result = cache.get(statusCacheConfig.key);

    if (!result) {
      const info = await fetch(getApiUrl(statusEndpoint))
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          return null;
        });

      if (info !== null) {
        result = {
          last_updated: info.last_updated,
          stations: info.data.stations.map(transformers.stationStatusTransform),
        };

        cache.put(statusCacheConfig.key, result, statusCacheConfig.ttl);
      }
    }

    return result;
  };

  return {
    getStationInfo,
    getStationStatus,
  };
};

module.exports = Api;
