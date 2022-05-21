const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"),
    Widget: path.resolve(__dirname, "src/widget.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
    library: "[name]",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css?$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      excludeChunks: ["widget"],
      template: "./src/index.html",
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

// const { resolve } = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserWebpackPlugin = require("terser-webpack-plugin");

// const isProd = process.env.NODE_ENV === "production";

// const config = {
//   mode: !isProd ? "development" : "production",
//   entry: {
//     app: ["./src/index.tsx"],
//     Widget: ["./src/widget.ts"],
//   },
//   output: {
//     filename: "[name].js",
//     path: resolve(__dirname, "dist"),
//     library: "[name]",
//     libraryTarget: "umd",
//     libraryExport: "default",
//   },
//   resolve: {
//     extensions: [".js", ".jsx", ".ts", ".tsx"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "babel-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css?$/,
//         use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       hash: true,
//       filename: "index.html",
//       inject: "body",
//       excludeChunks: ["widget"],
//     }),
//   ],
// };

// if (isProd) {
//   config.optimization = {
//     minimizer: [new TerserWebpackPlugin()],
//   };
// } else {
//   config.devServer = {
//     port: 9000,
//     open: true,
//     hot: true,
//     compress: true,
//     stats: "errors-only",
//     overlay: true,
//   };
// }

// module.exports = config;
