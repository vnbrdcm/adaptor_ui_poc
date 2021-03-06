const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
    },
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /(node_modules|bower_components|webpack.config.js|demo)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                },
                {
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    }
                }
                ]
            }
        ]
    },
    plugins: [new ForkTsCheckerWebpackPlugin()],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        }
    }
};