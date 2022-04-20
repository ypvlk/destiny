const config = require('./jest.config');

module.exports = {
  ...config,
  testRegex: '.*\\.spec\\.ts$',
};
