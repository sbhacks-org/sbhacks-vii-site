module.exports = function (config) {
  config.addPassthroughCopy({ "src/_assets": "/" });
  config.addWatchTarget("src/_css");

  return {
    dir: {
      input: "src",
    },
  };
};
