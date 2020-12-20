var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sass|css)$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, 
                loader: 'url-loader?limit=100000'
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
              target: "https://localhost:3443",
              secure: false,
              changeOrigin: true
            }
          }
    },
    externals: {
        // global app config object
        config: {
            apiUrl: 'https://localhost:3443'
        }
    }
}