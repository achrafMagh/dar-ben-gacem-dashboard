const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      // Filter noisy third-party/build-tool warnings that do not affect runtime.
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        /Failed to parse source map.*@pathofdev\/react-tag-input\/build\/index\.css\.map/,
        /autoprefixer: Replace color-adjust to print-color-adjust/,
      ];

      // Ensure fallback exists
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        util: require.resolve("util"),
        url: require.resolve("url"),
        path: require.resolve("path-browserify"),
        process: require.resolve("process/browser.js"), // IMPORTANT
      };

      // Alias REQUIRED for ESM packages like xlsx
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "process/browser": require.resolve("process/browser.js"),
      };

      // Global polyfills
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser.js",
          Buffer: ["buffer", "Buffer"],
        })
      );

      return config;
    },
  },
};
