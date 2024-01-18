// WHEN I use next-gen JavaScript in my application
// THEN I find that the text editor still functions in the browser without errors
// WHEN I open the text editor
// THEN I find that IndexedDB has immediately created a database storage
// WHEN I enter content and subsequently click off of the DOM window
// THEN I find that the content in the text editor has been saved with IndexedDB
// WHEN I reopen the text editor after closing it
// THEN I find that the content in the text editor has been retrieved from our IndexedDB
// WHEN I load my web application
// THEN I should have a registered service worker using workbox
// WHEN I register a service worker
// THEN I should have my static assets pre cached upon loading along with subsequent pages and static assets

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
