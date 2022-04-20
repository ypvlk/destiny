const { name } = require(`${process.cwd()}/package.json`);

module.exports = {
    testEnvironment: "node",
    coverageDirectory: `${__dirname}/coverage/${name}`,
    collectCoverageFrom: ["**/*.{js,ts}", "!**/*.spec.{js,ts}", "!**/index.{js,ts}"],
    coverageReporters: ["json", "text-summary"],
};
