// Mock logger before every test suite
jest.mock('@destiny/logger');

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);
