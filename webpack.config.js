const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'taxomplete.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'taxomplete.js',
    libraryTarget: 'umd',
    libraryExport: "default",
    library: 'Taxomplete'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "targets": " > 1%, IE 11, chrome 41",
                "spec": true,
                "useBuiltIns": "entry",
                "corejs": 3,
                "forceAllTransforms": true,
                "ignoreBrowserslistConfig": true,
                "modules": "commonjs",
                "debug": false, 
                "include": ["@babel/plugin-transform-arrow-functions"]
              }]
            ],
            "plugins": [
                ["@babel/plugin-transform-arrow-functions", { "spec": false }],
                ["@babel/plugin-transform-runtime",
                  {
                    "regenerator": true
                  }
                ],
                ["@babel/plugin-transform-object-assign"]
            ]
          }
        }
      }
    ]
  },
  externals: {
    'node-fetch': 'fetch',
    'ext-rdflib': '$rdf'
  },
  optimization: {
    minimize: true
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  
  ],
  devServer: {
    compress: true,
    allowedHosts: "all",
    static: "./example",
    host: "0.0.0.0",
  }
};