const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const compose = require("next-compose");

module.exports = compose([
  [
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[name]__[local]__[hash:base64:5]"
      }
    }
  ],
  [withCss],
  {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      config.node = {
        //console: false,
        fs: "empty",
        net: "empty",
        tls: "empty"
      };
      return config;
    },
    env: {
      GOOGLE_MAPS_API_PLACES_KEY: process.env.GOOGLE_MAPS_API_PLACES_KEY
    }
  }
]);
