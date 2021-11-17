const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const PATHS = {
	src: path.join(__dirname, "src"),
	dist: path.join(__dirname, "dist"),
	assets: "assets/"
};

	module.exports = {
		mode: 'development',
		entry: {
			index: {
				import: './src/index.js',
				dependOn: 'shared',
			},
			another: {
				import: './src/another-module.js',
				dependOn: 'shared',
			},
			shared: 'lodash',
		},
		devtool: 'inline-source-map', 
		devServer: {
		static: './dist',
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `${PATHS.src}/index.html`,
				title: 'Development',
				filename: `./index.html`,
			}),
			new postcssPresetEnv({ 
				browsers: 'last 2 versions' 
			}),
		],
		output: {
			filename: '[name].[contenthash].js',
			path: PATHS.dist,
			clean: true,
		},
		optimization: {
			moduleIds: 'deterministic',
			splitChunks: {
				cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					use: 'html-loader'
				},

				{
					test: /\.(scss|css)$/,
					use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		}
	};