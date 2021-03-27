const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = env => {
  const mode = env.mode ? env.mode : "production";

  return {
    mode,
    entry: {
      main: "./src/index.js"
    },
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new webpack.ids.HashedModuleIdsPlugin({
        context: __dirname,
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: { collapseWhitespace: true, removeComments: true },
        inject: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/assets/", to: "assets/" }
        ]
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js"
      })
    ],
    module: {
      rules: [
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'assets/favicons',
       },
      ],
    },
    devtool: "source-map"
  };
};