const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// paths
const projectPath = path.resolve(__dirname, '..');
const buildPath = path.join(projectPath, 'build');
const srcPath = path.join(projectPath, 'src');
const modulesPath = path.join(projectPath, 'node_modules');

const config = {
    entry: path.join(srcPath, 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: buildPath
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: srcPath,
                loader: 'ts-loader'
            },
            {
                test: /\.(sass|scss)$/,
                include: projectPath,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,   // make sure sass-loader is used on imported assets
                            localIdentName: '[local]---[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(css)$/,
                include: modulesPath,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader'    // needed to resolve url(...) statements inside material icons css files
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
                include: modulesPath,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']  // order is important. give typescript precedence when js file already exists.
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        })
    ],
    devServer: {
        contentBase: buildPath
    },
    devtool: 'source-map'
};

module.exports = config;
