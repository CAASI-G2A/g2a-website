const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './js/index.js',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new webpack.ProvidePlugin({
			  $: 'jquery',
			  jQuery: 'jquery',
		}),
		new CleanWebpackPlugin(),
		new WebpackManifestPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 100000
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', // translates CSS into CommonJS modules
					},
					{
						loader: 'postcss-loader', // Run post css actions
						options: {
							postcssOptions: {
								pugins: function () { // post css plugins, can be exported to postcss.config.js
									return [
										require('precss'),
										require('autoprefixer')
									];
								}
							}
						}
					},
					{
						loader: 'sass-loader' // compiles Sass to CSS
					}
				]
			},
		],
	},
	output: {
		publicPath: '',
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
};
