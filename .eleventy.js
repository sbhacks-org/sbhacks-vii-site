const yaml = require("js-yaml");

module.exports = function (config) {
  config.addPassthroughCopy({ "src/_assets": "/" });
  config.addWatchTarget("src/_css");
  config.addDataExtension("yml", (contents) => yaml.safeLoad(contents));

  return {
    dir: {
      input: "src",
    },
  };
};
