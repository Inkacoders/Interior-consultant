const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  devtool: "source-map",

  entry: {
    main: "./js/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/bundle[contenthash].js",
    assetModuleFilename: "./assets/images/[name][contenthash][ext]",
  },

  resolve: {
    extensions: [".js", ".ts", ".json"],
  },

  module: {
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
        test: /\.(png|webp|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
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

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
  },
};
