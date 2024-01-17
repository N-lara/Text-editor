// GIVEN a text editor web application
// WHEN I run the text editor application from my terminal
// THEN I find that my JavaScript files have been bundled using webpack
// WHEN I run my webpack plugins
// THEN I find that I have a generated HTML file, service worker, and a manifest file
// WHEN I use next-gen JavaScript in my application
// THEN I find that the text editor still functions in the browser without errors
// WHEN I open the text editor
// THEN I find that IndexedDB has immediately created a database storage
// WHEN I enter content and subsequently click off of the DOM window
// THEN I find that the content in the text editor has been saved with IndexedDB
// WHEN I reopen the text editor after closing it
// THEN I find that the content in the text editor has been retrieved from our IndexedDB
// WHEN I click on the Install button
// THEN I download my web application as an icon on my desktop
// WHEN I load my web application
// THEN I should have a registered service worker using workbox
// WHEN I register a service worker
// THEN I should have my static assets pre cached upon loading along with subsequent pages and static assets
// WHEN I deploy to Render
// THEN I should have proper build scripts for a webpack application

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
        swDest: "service-worker.js",
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
