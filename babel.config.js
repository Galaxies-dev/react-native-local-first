module.exports = function (api) {
  api.cache(true);
  const plugins = ['@babel/plugin-transform-async-generator-functions'];

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
