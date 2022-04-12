const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./js/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/bundle.js",
    assetModuleFilename: "./assets/images/[name][contenthash][ext]",
    clean: true,
  },

  resolve: {
    extensions: [".js", ".ts", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.woff(2)?$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][contenthash][ext]",
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./styles/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "./index.html",
      template: "../public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
