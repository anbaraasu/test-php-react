/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

// solve: __dirname is not defined in ES module scope
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const config = {
    entry: resolve(__dirname, 'src', 'index.js'),
    module: {
        rules: [
            {
              test: /\.jsx?$/, // A regexp that catches .js and .jsx files              
              exclude: [/node_modules/, /vscode-jsonrpc/, /vscode-languageclient/, /vscode-languageserver-protocol/],
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'] // Use these presets for transpiling
                }
              }
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.ts?$/,
            use: ['ts-loader']
        }]
    },
    experiments: {
        outputModule: true
    },
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist'),
        module: true
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js', '.json', '.ttf','.tsx','.jsx'],
        fallback: {
            path: resolve(projectRoot, 'node_modules', 'path-browserify')
        }
    },
    mode: 'development',
    devtool: 'source-map'
};

export default config;
