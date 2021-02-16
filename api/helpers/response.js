const chalk = require('chalk');

const isResponseDataValid = (response) =>
  response.data &&
  typeof response.data.last_updated === 'number' &&
  response.data.data &&
  Array.isArray(response.data.data.stations);

const handleResponseData = (response) =>
  isResponseDataValid(response)
    ? response
    : Promise.reject(
        new Error(
          `Malformed Open Data BCN api response from ${response.config.url}`,
        ),
      );

const handleSuccessfulResponse = (stationTransformer) => (response) => ({
  success: true,
  last_updated: response.data.last_updated,
  stations: response.data.data.stations.map(stationTransformer),
});

const handleErrorResponse = (err) => {
  const resourceUrl = err.config && err.config.url ? err.config.url : '';

  // eslint-disable-next-line no-console
  console.log(
    `\n${new Date().toUTCString()}\n${chalk.black.bgRed(
      'Open Data BCN api error',
    )}\nResource: ${chalk.yellow(resourceUrl)}\n${err.stack}`,
  );

  return {
    success: false,
    errorMessage: `${resourceUrl} -> ${err.message}`,
  };
};

module.exports = {
  handleResponseData,
  handleSuccessfulResponse,
  handleErrorResponse,
};
