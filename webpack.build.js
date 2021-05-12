const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: false },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: false,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new WebpackBar(),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    library: "vue-color-picker.js",
    libraryTarget: "umd",
    filename: "index.js",
  },
};
