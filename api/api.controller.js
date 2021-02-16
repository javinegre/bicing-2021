const axios = require('axios');
const cache = require('memory-cache');

const config = require('./config');
const dataTransformers = require('./helpers/data-transformers');
const responseHelpers = require('./helpers/response');

axios.interceptors.response.use(responseHelpers.handleResponseData);

const Api = () => {
  const { endpoints, cacheConfig } = config;

  const getApiUrl = (endpoint) => `${config.bicingApiBaseUrl}${endpoint}`;

  const getCachedData = async (type) => {
    const { key, ttl } = cacheConfig[type];

    let result = cache.get(key);

    if (result === null || !result.success) {
      result = await axios
        .get(getApiUrl(endpoints[type]))
        .then(responseHelpers.handleSuccessfulResponse(dataTransformers[type]))
        .catch(responseHelpers.handleErrorResponse);

      cache.put(key, result, ttl);
    }

    return result;
  };

  const getStationInfo = async () => getCachedData('info');

  const getStationStatus = async () => getCachedData('status');

  return {
    getStationInfo,
    getStationStatus,
  };
};

module.exports = Api;
