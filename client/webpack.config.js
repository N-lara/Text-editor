const HtmlWebpackPlugin = require('html-webpack-plugin');//use
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'my created text editor',
        background_color: '#ffffff',
        display: 'standalone',
        crossorigin: 'anonymous',
        fingerprints: false,
        inject: true,
        id: '/',
        start_url: "./",
        publicPath: "./",
        ios: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [72, 96, 120, 128, 144, 152, 180, 192, 256, 384, 512,],
            destination: path.join("icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader:'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
