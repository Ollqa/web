const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const assetsPath = path.resolve(__dirname, './build/public/assets/js/bundles');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/dashboard/src/index.ts'
  },
  module: {
    rules: [{
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]___[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        include: [/node_modules/],
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|gif|eot|svg|ttf|woff(2)?|(jpeg|jpg)(\?[0-9]+)?)$/,
        use: [{
          loader: 'base64-inline-loader?limit32000&name=[name].[ext]'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      ui: path.resolve(__dirname, 'src/ui'),
      users: path.resolve(__dirname, 'src/users'),
      auth: path.resolve(__dirname, 'src/auth'),
      utils: path.resolve(__dirname, 'src/utils'),
      common: path.resolve(__dirname, 'src/common'),
      dashboard: path.resolve(__dirname, 'src/dashboard'),
      profile: path.resolve(__dirname, 'src/profile')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: assetsPath
    }),
    new CopyPlugin([{
      from: 'out',
      to: path.resolve(__dirname, './build/public/')
    }])
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: assetsPath,
    publicPath: 'assets/js/bundles/'
  },
  devServer: {
    contentBase: [path.resolve(__dirname, './out'), assetsPath],
    compress: true,
    port: 9090,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true
  }
};