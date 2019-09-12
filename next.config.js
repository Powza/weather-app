//const { parsed: localEnv } = require("dotenv").config();
require("dotenv").config();
const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    //config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.node = {
      fs: "empty",
      net: "empty",
      tls: "empty"
    };
    return config;
  },
  env: {
    GOOGLE_MAPS_API_PLACES_KEY: process.env.GOOGLE_MAPS_API_PLACES_KEY,
    DARK_SKY_API_KEY: process.env.DARK_SKY_API_KEY,
    FONT_AWESOME_KIT_ID: process.env.FONT_AWESOME_KIT_ID
  }
};

module.exports = withPlugins(
  [
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
    [
      withCss,
      {
        cssModules: false
      }
    ]
  ],
  nextConfig
);
