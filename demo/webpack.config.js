const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
    },
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /(node_modules|bower_components|webpack.config.js)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                },
                ]
            }
        ]
    },
    plugins: [new ForkTsCheckerWebpackPlugin()],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
};