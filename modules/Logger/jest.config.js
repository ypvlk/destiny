const baseConfig = require('../../jest.config.base');

module.exports = {
    ...baseConfig,
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "globals": {
        "ts-jest": {
            "isolatedModules": true
        }
    }
};
