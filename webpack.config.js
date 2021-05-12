const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");

module.exports = {
  mode: "development",
  entry: {
    app: "./examples/index.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          plugins: [
            "transform-vue-jsx",
            "transform-object-assign",
            "transform-object-rest-spread",
            "transform-class-properties",
          ],
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "vue-style-loader" },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue"],
  },
  devServer: {
    host: "localhost",
    port: 8082,
    disableHostCheck: true,
    hot: true,
    open: true,
  },
  devtool: "#source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "examples/index.html",
      filename: "index.html",
      inject: true,
    }),
    new VueLoaderPlugin(),
    new WebpackBar(),
  ],
};
